import type { StripGenerated } from '@/shared/types/prisma-utils';
import { prisma, type User } from '@workspace/db';
import type { Prisma } from '@workspace/db';

type UpdateInput = StripGenerated<Prisma.UserUpdateInput>;
type CreateInput = StripGenerated<Prisma.UserCreateInput>;

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findOne(filter: Prisma.UserWhereInput): Promise<User | null> {
    return prisma.user.findFirst({ where: filter });
  }

  async findMany(filter: Prisma.UserWhereInput = {}): Promise<User[]> {
    return prisma.user.findMany({ where: filter });
  }

  async create(data: CreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  async updateById(id: string, update: UpdateInput): Promise<User> {
    return prisma.user.update({ data: update, where: { id } });
  }

  async updateOne(
    filter: Prisma.UserWhereUniqueInput,
    update: UpdateInput
  ): Promise<User | null> {
    return prisma.user.update({
      data: update,
      where: filter,
    });
  }

  async deleteById(id: string): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }

  async deleteOne(filter: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return prisma.user.delete({ where: filter });
  }

  async exists(filter: Prisma.UserWhereInput): Promise<boolean> {
    return this.findOne(filter).then(result => !!result);
  }

  async count(filter: Prisma.UserWhereInput = {}): Promise<number> {
    return prisma.user.count({ where: filter });
  }
}

export const userRepository = new UserRepository();
