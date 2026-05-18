import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { onError } from '@orpc/server';
import { CORSPlugin } from '@orpc/server/plugins';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { router } from './router';

export const orpcHandler = new OpenAPIHandler(router, {
  plugins: [
    new CORSPlugin(),
    new OpenAPIReferencePlugin({
      docsProvider: 'scalar',
      docsPath: '/docs',
      specPath: '/spec',
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        tags: [
          { name: 'Authentication', description: 'Endpoints related to auth' },
          { name: 'Posts', description: 'Endpoints related to post' },
        ],
        info: {
          title: 'Demo API',
          description: 'Open API definitions for our API',
          version: '1.0.0',
        },
        servers: [{ url: '/api', description: 'API Path' }],
      },
    }),
  ],
  interceptors: [onError(error => console.error(error))],
});
