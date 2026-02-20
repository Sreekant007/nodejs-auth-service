import { hashPassword } from '@utils';

import { prisma } from '@/db/prisma.js';
import { CreateUserInput } from '@/validators/user.validator.js';

export class UserService {
  private readonly prismaClient = prisma;

  async getAllUsers() {
    return this.prismaClient.user.findMany();
  }

  async createUser(data: CreateUserInput) {
    const encryptedPassword = await hashPassword(data.password);

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: encryptedPassword,
      roleId: data.roleId,
    };

    const user = await this.prismaClient.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
    return user;
  }
}
