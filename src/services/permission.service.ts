import { AllPermissions } from '@/constants/permission.js';
import { prisma } from '@/db/prisma.js';
import { ConflictError, NotFoundError } from '@/errors/http-errors.js';

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
}
