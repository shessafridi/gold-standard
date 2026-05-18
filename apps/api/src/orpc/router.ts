import { authRouter } from '@/modules/auth/api/auth.router';
import { postRouter } from '@/modules/post/api/post.router';
import { os } from './os';

export const router = os.router({ post: postRouter, auth: authRouter });

export type AppRouter = typeof router;
