import { authed } from '@/orpc';
import { ORPCError } from '@orpc/client';

import { userService } from '../user.service';

export const userRouter = authed.user.router({
  getMyProfile: authed.user.getMyProfile.handler(
    async ({ context: { user } }) => {
      return userService.getProfile(user.id);
    }
  ),

  getUserProfile: authed.user.getUserProfile.handler(async ({ input }) => {
    return userService.getProfile(input.userId);
  }),

  adminResetPassword: authed.user.adminResetPassword.handler(
    async ({ input, context: { user } }) => {
      if (user.role !== 'ADMIN')
        throw new ORPCError('FORBIDDEN', {
          message: 'You are not allowed to change the password for this user',
        });

      const { message } = await userService.setUserPassword(
        input.userId,
        input.newPassword
      );

      return {
        message,
      };
    }
  ),

  changePassword: authed.user.changePassword.handler(
    async ({ input, context: { user } }) => {
      const { message } = await userService.changePassword(user.id, input);

      return { message };
    }
  ),

  deleteMyAccount: authed.user.deleteMyAccount.handler(
    async ({ context: { user } }) => {
      const { message } = await userService.deleteAccount(user.id);

      return { message };
    }
  ),

  updateEmail: authed.user.updateEmail.handler(
    async ({ input, context: { user } }) => {
      const { message } = await userService.updateEmail(
        user.id,
        input.newEmail
      );

      return { message };
    }
  ),
});
