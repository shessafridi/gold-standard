import { os } from '@/orpc/os';
import { ORPCError } from '@orpc/client';

export const postRouter = os.post.router({
  create: os.post.create.handler(async ({ input, context: { db } }) => {
    const saved = await db.post.create({
      data: { title: input.title, content: input.content },
    });

    return {
      id: saved.id,
      title: saved.title,
      content: saved.content ?? '',
    };
  }),
  getById: os.post.getById.handler(async ({ input, context: { db } }) => {
    const id = input.id;

    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      throw new ORPCError('NOT_FOUND');
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content ?? '',
    };
  }),
});
