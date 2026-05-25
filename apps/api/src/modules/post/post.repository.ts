import type { Post, Prisma } from '@workspace/db';
import { prisma } from '@workspace/db';

type CreatePostInput = Prisma.PostCreateInput;

export class PostRepository {
  async findById(id: string): Promise<Post | null> {
    return prisma.post.findUnique({ where: { id } });
  }

  async create(data: CreatePostInput): Promise<Post> {
    return prisma.post.create({ data });
  }
}

export const postRepository = new PostRepository();
