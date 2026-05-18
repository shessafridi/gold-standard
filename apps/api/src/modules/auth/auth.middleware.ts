import { os } from '@/orpc/root';
import { ORPCError } from '@orpc/client';
import { extractTokenFromHeaders, resolveUserFromToken } from './auth';

export const authMiddleware = os.middleware(async ({ context, next }) => {
  const token = extractTokenFromHeaders(context.headers);

  if (!token) {
    throw new ORPCError('UNAUTHORIZED', {
      message: 'Missing or malformed Authorization header',
    });
  }

  const user = await resolveUserFromToken(token);

  if (!user) {
    throw new ORPCError('UNAUTHORIZED', { message: 'User not found' });
  }

  return next({
    context: {
      ...context,
      user,
    },
  });
});
