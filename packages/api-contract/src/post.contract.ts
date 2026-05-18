import { oc } from '@orpc/contract';
import { createPostSchema, postSchema } from '@workspace/api-schemas/post';
import { z } from 'zod';

export const postContract = {
  create: oc
    .route({
      method: 'POST',
      path: '/posts',
    })
    .input(createPostSchema)
    .output(postSchema),

  getById: oc
    .route({ method: 'GET', path: '/posts/{id}' })
    .input(z.object({ id: z.string() }))
    .output(postSchema),
};
