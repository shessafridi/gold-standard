import env from '@/env';
import { orpcHandler } from '@/orpc/handle';
import { handleServerShutdown } from '@/shared/utils/handle-server-shutdown';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { prisma } from '@workspace/db';

const app = new Hono();

function bootstrap() {
  app.get('/', c => c.text('Server is running'));

  app.use('/api/*', async (c, next) => {
    const { matched, response } = await orpcHandler.handle(c.req.raw, {
      prefix: '/api',
      context: { db: prisma, headers: c.req.raw.headers },
    });

    if (matched) return c.newResponse(response.body, response);
    return await next();
  });

  app.get('/health', c => c.json({ ok: true }));

  const server = serve({
    fetch: app.fetch,
    port: env.PORT,
  });
  console.log('Server is running on port 3000');

  // graceful shutdown on SIGINT
  handleServerShutdown(server);
}

bootstrap();
