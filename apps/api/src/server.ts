import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { orpcHandler } from './orpc/handle';

const app = new Hono();

function bootstrap() {
  app.get('/', c => c.text('Server is running'));

  app.use('/rpc/*', async (c, next) => {
    const { matched, response } = await orpcHandler.handle(c.req.raw, {
      prefix: '/rpc',
    });

    if (matched) {
      return c.newResponse(response.body, response);
    }

    return await next();
  });

  app.get('/health', c => c.json({ ok: true }));

  const server = serve({
    fetch: app.fetch,
    port: 3000,
  });
  console.log('Server is running on port 3000');

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
}

bootstrap();
