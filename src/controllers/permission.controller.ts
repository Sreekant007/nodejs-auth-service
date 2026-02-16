import type { Request, Response, NextFunction } from 'express';

import { PermissionService } from '@/services/permission.service.js';
import { successResponse } from '@/utils/apiResponse.js';

export class PermissionController {
  private readonly service = new PermissionService();
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allPermissionInserted = await this.service.insertPermission(req.body.name);
      successResponse(res, allPermissionInserted, 'All Permission added successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async getAllPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allPermissions = await this.service.getAllPermissions();
      successResponse(res, allPermissions, 'Permissions fetched successfully');
    } catch (error) {
      next(error);
    }
  }
  async deletePermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const permissionId = String(req.params.id);
      const deletedPermission = await this.service.deletePermission(permissionId);
      successResponse(res, deletedPermission, 'Permission deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
