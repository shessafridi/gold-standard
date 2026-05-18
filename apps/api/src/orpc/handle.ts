import { router } from './router';
import { CORSPlugin } from '@orpc/server/plugins';
import { onError } from '@orpc/server';
import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';

export const orpcHandler = new OpenAPIHandler(router, {
  plugins: [
    new CORSPlugin(),
    new OpenAPIReferencePlugin({
      docsProvider: 'scalar', // or 'swagger'
      docsPath: '/docs', // UI at /api/docs
      specPath: '/spec', // spec at /api/spec
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: 'Demo API',
          description: 'Open API definitions for our API',
          version: '1.0.0',
        },
        servers: [{ url: '/api' }],
      },
    }),
  ],
  interceptors: [onError(error => console.error(error))],
});
