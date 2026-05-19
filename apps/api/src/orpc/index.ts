import { authMiddleware } from '@/modules/auth/auth.middleware';

import { errorMiddleware } from './middlewares/errors.middleware';
import { os } from './root';

export const pub = os.use(errorMiddleware);
export const authed = os.use(authMiddleware);
