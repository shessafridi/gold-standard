import { ORPCError } from '@orpc/server';

import {
  AppError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '@/shared/errors';
import { os } from '../root';

export const errorMiddleware = os.middleware(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ORPCError('BAD_REQUEST', {
        message: error.message,
      });
    }

    if (error instanceof UnauthorizedError) {
      throw new ORPCError('UNAUTHORIZED', {
        message: error.message,
      });
    }

    if (error instanceof ForbiddenError) {
      throw new ORPCError('FORBIDDEN', {
        message: error.message,
      });
    }

    if (error instanceof NotFoundError) {
      throw new ORPCError('NOT_FOUND', {
        message: error.message,
      });
    }

    if (error instanceof ConflictError) {
      throw new ORPCError('CONFLICT', {
        message: error.message,
      });
    }

    if (error instanceof AppError) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: error.message,
      });
    }

    throw error;
  }
});
