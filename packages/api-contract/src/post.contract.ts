import { oc } from '@orpc/contract';
import { createPostSchema, postSchema } from '@workspace/api-schemas/post';

export const postContract = {
  create: oc.input(createPostSchema).output(postSchema),
};
