import env from '@/env';
import { SignJWT } from 'jose';

import type { User } from '@workspace/db';

export const generateAuthToken = async (user: User): Promise<string> => {
  const secret = new TextEncoder().encode(env.AUTH_SECRET);

  const token = await new SignJWT({
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
};
