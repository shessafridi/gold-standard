import type { Server, Socket } from 'socket.io';
import env from '@/env';
import { jwtVerify } from 'jose';

type TokenPayload = {
  email: string;
};

export type AuthenticatedSocket = Socket & {
  user?: { email: string };
};

export const socketAuthMiddleware = (io: Server) => {
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth['token'] as string | undefined;

    if (!token) {
      next(new Error('Token required'));
      return;
    }

    parseToken(token)
      .then(userInfo => {
        socket.user = userInfo;
        next();
      })
      .catch((error: unknown) => {
        console.error('Token verification failed:', error);
        next(new Error('Invalid token'));
      });
  });
};

async function parseToken(token: string) {
  const secret = new TextEncoder().encode(env.AUTH_SECRET);
  const { payload } = await jwtVerify(token, secret);
  const decoded = payload as TokenPayload;

  return {
    email: decoded.email,
  };
}
