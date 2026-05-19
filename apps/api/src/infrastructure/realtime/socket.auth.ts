import type { Server, Socket } from 'socket.io';
import env from '@/env';
import { jwtVerify } from 'jose';

type TokenPayload = {
  email: string;
};

export interface AuthenticatedSocket extends Socket {
  user?: { email: string };
}

export const socketAuthMiddleware = (io: Server) => {
  io.use(async (socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.['token'];

    if (!token) return next(new Error('Token required'));

    let userInfo: {
      email: string;
    };
    try {
      const secret = new TextEncoder().encode(env.AUTH_SECRET);
      const { payload } = await jwtVerify(token, secret);
      const decoded = payload as TokenPayload;
      // const decoded = jwt.verify(token, env.AUTH_SECRET) as {
      //   email: string;
      // };
      userInfo = {
        email: decoded.email,
      };
    } catch {
      return next(new Error('Failed to parse token'));
    }

    socket.user = userInfo;
    next();
  });
};
