/* eslint-disable @typescript-eslint/consistent-type-imports */
import { implement } from '@orpc/server';

import type { User } from '@workspace/db';
import { contract } from '@workspace/api-contract';

export type Context = {
  headers: Headers;
  db: typeof import('@workspace/db').prisma;
  user?: User;
};

export const os = implement(contract).$context<Context>();
