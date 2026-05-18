import { os } from '@/orpc/os';
import { ORPCError } from '@orpc/client';
import { randomUUID } from 'node:crypto';

export const postRouter = os.post.router({
  create: os.post.create.handler(({ input }) => ({
    ...input,
    id: randomUUID(),
  })),
  getById: os.post.getById.handler(({ input }) => {
    const id = input.id;

    if (id === '1') {
      return {
        id: '1',
        title: 'Hello World',
        content:
          'Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, ',
      };
    }

    throw new ORPCError('NOT_FOUND');
  }),
});
