import type { Request, Response, NextFunction } from 'express';

import { UserService } from '@/services/user.service.js';
import { successResponse } from '@/utils/apiResponse.js';

export class UserController {
  private readonly userService = new UserService();
  async getAllUser(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allUserResult = await this.userService.getAllUsers();
      successResponse(res, allUserResult, 'All users fetch successfully');
    } catch (error: unknown) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUser = await this.userService.createUser(req.body);
      successResponse(res, createUser, 'User created successfully');
    } catch (error) {
      next(error);
    }
  }
}
