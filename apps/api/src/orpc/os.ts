/* eslint-disable @typescript-eslint/consistent-type-imports */
import { implement } from '@orpc/server';
import { contract } from '@workspace/api-contract';

export const os = implement(contract).$context<{
  db: typeof import('@workspace/db').prisma;
}>();
