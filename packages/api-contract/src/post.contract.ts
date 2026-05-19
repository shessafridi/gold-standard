import { oc } from '@orpc/contract';
import { z } from 'zod';

import { createPostSchema, postSchema } from '@workspace/api-schemas/post';

import { withAuth } from './utils/with-auth';

export const postContract = {
  create: oc
    .route({
      method: 'POST',
      path: '/posts',
      tags: ['Posts'],
      spec: withAuth,
    })
    .input(createPostSchema)
    .output(postSchema),

  getById: oc
    .route({ method: 'GET', path: '/posts/{id}', tags: ['Posts'] })
    .input(z.object({ id: z.string() }))
    .output(postSchema),
};
