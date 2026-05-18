import { authRouter } from '@/modules/auth/api/auth.router';
import { postRouter } from '@/modules/post/api/post.router';
import { userRouter } from '@/modules/user/api/user.router';
import { os } from './root';

export const router = os.router({
  post: postRouter,
  auth: authRouter,
  user: userRouter,
});

export type AppRouter = typeof router;
