import type { ServerType } from '@hono/node-server';

export const handleServerShutdown = (server: ServerType) => {
  process.on('SIGINT', () => {
    server.close();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    server.close(err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.exit(0);
    });
  });
};
