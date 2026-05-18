/* eslint-disable @typescript-eslint/consistent-type-imports */
import { implement } from '@orpc/server';
import { contract } from '@workspace/api-contract';
import type { User } from '@workspace/db';

export type Context = {
  headers: Headers;
  db: typeof import('@workspace/db').prisma;
  user?: User;
};

export const os = implement(contract).$context<Context>();
