import env from '@/env';
import type { User } from '@workspace/db';
import { SignJWT } from 'jose';
import { createSecretKey } from 'crypto';

export const generateAuthToken = async (user: User): Promise<string> => {
  const secret = createSecretKey(Buffer.from(env.AUTH_SECRET));

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
