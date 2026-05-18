import { os } from '@/orpc/os';
import { randomUUID } from 'node:crypto';

export const postRouter = os.post.router({
  create: os.post.create.handler(({ input }) => ({
    ...input,
    id: randomUUID(),
  })),
});
