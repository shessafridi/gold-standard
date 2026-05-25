import type { Post as PostOutput } from '@workspace/api-schemas/post';
import type { Post } from '@workspace/db';

export const buildPostDto = (post: Post): PostOutput => ({
  id: post.id,
  title: post.title,
  content: post.content,
});
