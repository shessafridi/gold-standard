import { postRouter } from '@/modules/post/api/post.router';
import { os } from './os';

export const router = os.router({ post: postRouter });

export type AppRouter = typeof router;
