import { createServer } from 'node:http';
import type { Server as HTTPServer } from "node:http";
import type { Server } from 'socket.io';
import { socketAuthMiddleware } from './socket.auth';
import { registerSocketEvents } from './socket.events';
import { createSocketServer } from './socket.server';
import type { ServerType } from '@hono/node-server';

let io: Server;

export const setupSocketIo = (app: ServerType) => {
  if (io) throw new Error('Server is already initialized');

  const httpServer = createServer(app as HTTPServer);
  const server = createSocketServer(httpServer);
  socketAuthMiddleware(server);
  registerSocketEvents(server);

  io = server;

  return httpServer;
};

export const getSocketIo = () => {
  if (!io) throw new Error('Socket.io is not initialized');
  return io;
};
