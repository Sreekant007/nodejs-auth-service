import type { Request, Response, NextFunction } from 'express';

import { RoleService } from '@/services/role.service.js';
import { successResponse } from '@/utils/apiResponse.js';

export class RoleController {
  private readonly roleService = new RoleService();

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roleName = req.body.roleName;
      const roleInserted = await this.roleService.createRole(roleName);
      successResponse(res, roleInserted, 'Role created Successfully');
    } catch (error) {
      next(error);
    }
  }

  async getAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roles = await this.roleService.getAllRoles();
      const formatedRole = roles.map((role) => ({
        ...role,
        permissions: role.permissions.map((p) => p.permission.name),
      }));
      successResponse(res, formatedRole, 'Roles fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roleId = String(req.params.id);
      const roleDeleted = await this.roleService.deleteRole(roleId);
      successResponse(res, `Role with name ${roleDeleted.name} deleted successfully`);
    } catch (error) {
      next(error);
    }
  }
}
