/* eslint-disable @typescript-eslint/consistent-type-imports */
import type {
  RequestHeadersPluginContext,
  ResponseHeadersPluginContext,
} from '@orpc/server/plugins';
import { implement } from '@orpc/server';

import type { User } from '@workspace/db';
import { contract } from '@workspace/api-contract';

export type Context = {
  db: typeof import('@workspace/db').prisma;
  user?: User;
} & RequestHeadersPluginContext &
  ResponseHeadersPluginContext;

export const os = implement(contract).$context<Context>();
