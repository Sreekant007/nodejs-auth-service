import { AllPermissions } from '@/constants/permission.js';
import { prisma } from '@/db/prisma.js';
import { BadRequestError, ForbiddenError, NotFoundError } from '@/errors/http-errors.js';
import { logger } from '@/utils/logger.js';

export class PermissionService {
  prismaClient = prisma;
  async insertAllPermissions() {
    const upsertPermissionPromises = this.prismaClient.permission.createMany({
      data: AllPermissions.map((code) => ({
        name: code.replace(/\./g, '_').toUpperCase(),
        code,
      })),
    });

    return upsertPermissionPromises;
  }

  async assignAdminPermission(roleId: string) {
    return this.prismaClient.role.update({
      where: { id: roleId },
      data: {
        isSystemRole: true,
      },
    });
  }

  async getAllPermissions() {
    return await this.prismaClient.permission.findMany();
  }

  async deletePermission(permissionId: string) {
    return await this.prismaClient.permission.delete({ where: { id: permissionId } });
  }

  async insertPermission(name: string) {
    return await this.prismaClient.permission.create({
      data: { name: name.replace(/\./g, ' ').toUpperCase(), code: name },
    });
  }

  async assignRolePermission(roleName: string, permissionIds: string[]) {
    return await this.prismaClient.$transaction(async (tx) => {
      const role = await tx.role.findUnique({ where: { name: roleName } });

      // if (isRoleExist?.isSystemRole) {
      //   throw new ForbiddenError('Admin role permission cannot be changed');
      // }

      const permissionData = await tx.permission.findMany({
        where: {
          code: { in: permissionIds },
        },
      });

      const permissionUUID: string[] = permissionData.map((p) => p.id);

      if (!role) throw new NotFoundError('Role does not exist.');

      if (permissionUUID?.length) {
        const validatePermission = await tx.permission.findMany({
          where: {
            id: { in: permissionUUID },
          },
        });

        if (validatePermission?.length !== permissionUUID.length) {
          throw new BadRequestError('One or more permission are invalid');
        }
      }

      await tx.rolePermission.deleteMany({
        where: {
          roleId: role.id,
        },
      });

      if (!permissionUUID?.length) {
        return { count: 0 };
      }

      return await tx.rolePermission.createMany({
        data: permissionUUID.map((id) => ({
          roleId: role.id,
          permissionId: id,
        })),
      });
    });
  }

  async revokeRolePermission(roleId: string) {
    return await this.prismaClient.$transaction(async (tx) => {
      const isRoleExist = await tx.role.findUnique({ where: { id: roleId } });

      if (!isRoleExist) throw new NotFoundError('Role does not exist.');

      const revokeRolePermissionResult = await tx.rolePermission.deleteMany({
        where: {
          roleId: roleId,
        },
      });

      return revokeRolePermissionResult;
    });
  }
}
