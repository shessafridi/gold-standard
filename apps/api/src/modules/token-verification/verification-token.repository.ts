import type { StripGenerated } from '@/shared/types/prisma-utils';

import type { Prisma, VerificationToken } from '@workspace/db';
import { prisma } from '@workspace/db';

type CreateInput = StripGenerated<Prisma.VerificationTokenCreateInput>;

export class VerificationTokenRepository {
  public async create(data: CreateInput): Promise<void> {
    await prisma.verificationToken.create({
      data,
    });
  }

  public async findOne(
    filter: Prisma.VerificationTokenWhereInput
  ): Promise<VerificationToken | null> {
    return prisma.verificationToken.findFirst({
      where: filter,
    });
  }

  public async deleteOne(
    filter: Prisma.VerificationTokenWhereUniqueInput
  ): Promise<void> {
    await prisma.verificationToken.delete({ where: filter });
  }

  public async deleteMany(
    filter: Prisma.VerificationTokenWhereInput
  ): Promise<void> {
    await prisma.verificationToken.deleteMany({ where: filter });
  }
}

export const verificationTokenRepository = new VerificationTokenRepository();
