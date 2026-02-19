import { prisma } from '@/db/prisma.js';

export class UserService {
  private readonly prismaClient = prisma;

  async getAllUsers() {
    return this.prismaClient.user.findMany();
  }
}
