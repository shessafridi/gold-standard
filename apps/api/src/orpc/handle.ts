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
          {
            name: 'Authentication',
            description:
              'Authentication endpoints: register, login, password reset, and email verification.',
          },
          {
            name: 'Posts',
            description:
              'Post endpoints: create, read, update, and delete posts.',
          },
          {
            name: 'User Management',
            description:
              'User account and profile management: view and update profiles, change email and password.',
          },
          {
            name: 'Admin',
            description:
              'Administrative endpoints requiring elevated privileges for user and system management.',
          },
        ],
        info: {
          title: 'Demo API',
          description: 'Open API definitions for our API',
          version: '1.0.0',
        },
        servers: [{ url: '/api', description: 'API Path' }],

        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
    }),
  ],
  interceptors: [onError(error => console.error(error))],
});
