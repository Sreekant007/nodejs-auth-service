import type { Request, Response, NextFunction } from 'express';

import { PermissionService } from '@/services/permission.service.js';
import { successResponse } from '@/utils/apiResponse.js';
import { logger } from '@/utils/logger.js';

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

  async assignRolePermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roleId, permissions } = req.body;
      const permissionData = await this.service.prismaClient.permission.findMany({
        where: {
          name: { in: permissions },
        },
      });

      const permissionUUID: string[] = permissionData.map((p) => p.id);

      const assignPermissionResult = await this.service.assignRolePermission(
        roleId,
        permissionUUID,
      );

      successResponse(res, assignPermissionResult, 'Sucessfully');
    } catch (error) {
      next(error);
    }
  }

  async revokeRolePermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { roleId } = req.body;

      const revokePermissionResult = await this.service.revokeRolePermission(roleId);

      successResponse(res, revokePermissionResult, 'Sucessfully');
    } catch (error) {
      next(error);
    }
  }
}
