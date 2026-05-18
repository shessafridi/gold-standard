import { authMiddleware } from '@/modules/auth/auth.middleware';
import { os } from './root';

export const pub = os;
export const authed = os.use(authMiddleware);
