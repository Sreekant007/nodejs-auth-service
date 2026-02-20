import { prisma } from '@/db/prisma.js';

export class RoleService {
  private readonly prismaClient = prisma;

  async createRole(roleName: string) {
    return await this.prismaClient.role.create({ data: { name: roleName } });
  }

  async getAllRoles() {
    return await this.prismaClient.role.findMany({
      include: {
        rolePermissions: {
          select: {
            permission: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteRole(roleId: string) {
    return await this.prismaClient.role.delete({ where: { id: roleId } });
  }
}
