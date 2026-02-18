import { AllPermissions } from '@/constants/permission.js';
import { prisma } from '@/db/prisma.js';
import { NotFoundError } from '@/errors/http-errors.js';

export class PermissionService {
  prismaClient = prisma;
  async insertAllPermissions() {
    const inserted: string[] = [];
    const failed: { name: string; error: string }[] = [];
    const upsertPermissionPromises = AllPermissions.map((name) =>
      this.prismaClient.permission.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    );

    const allPermissionInsert = await Promise.allSettled(upsertPermissionPromises);
    allPermissionInsert.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        inserted.push(AllPermissions[index]);
      } else {
        failed.push({ name: AllPermissions[index], error: String(result.reason) });
      }
    });
  }

  async getAllPermissions() {
    return await this.prismaClient.permission.findMany();
  }

  async deletePermission(permissionId: string) {
    return await this.prismaClient.permission.delete({ where: { id: permissionId } });
  }

  async insertPermission(name: string) {
    return await this.prismaClient.permission.create({ data: { name } });
  }

  async assignRolePermission(roleId: string, permissionIds: string[]) {
    return await this.prismaClient.$transaction(async (tx) => {
      const isRoleExist = await tx.role.findUnique({ where: { id: roleId } });

      if (!isRoleExist) throw new NotFoundError('Role does not exist.');

      await tx.rolePermission.deleteMany({
        where: {
          roleId: roleId,
        },
      });

      const assignRolePermissionResult = await tx.rolePermission.createMany({
        data: permissionIds.map((id) => ({
          roleId: roleId,
          permissionId: id,
        })),
        skipDuplicates: true,
      });
      return assignRolePermissionResult;
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
