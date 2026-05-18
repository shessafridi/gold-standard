import env from '@/env';
import { ValidationError } from '@/shared/errors';
import { jwtVerify } from 'jose';
import { userRepository } from '../user/user.repository';

const JWT_SECRET = new TextEncoder().encode(env.AUTH_SECRET);

export const extractTokenFromHeaders = (headers: Headers) => {
  const authHeader = headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);

  return token;
};

export const resolveUserFromToken = async (token: string) => {
  let userId: string;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.sub) {
      throw new ValidationError('No subject in token');
    }
    userId = payload.sub;
  } catch {
    throw new ValidationError('Invalid or expired token');
  }

  const user = await userRepository.findById(userId);

  return user;
};
