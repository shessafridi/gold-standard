import { z } from 'zod';

const postSchemaBase = z.object({
  title: z.string().trim().min(5).max(100),
  content: z.string().trim().min(20).max(2000),
});

export const createPostSchema = postSchemaBase;

export const postSchema = postSchemaBase.extend({
  id: z.string(),
});

export type Post = z.infer<typeof postSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
