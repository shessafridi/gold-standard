import { pub } from '@/orpc';
import { authService } from '../auth.service';

export const authRouter = pub.auth.router({
  registerUser: pub.auth.registerUser.handler(async ({ input }) => {
    await authService.registerUser(input);

    return { message: `We have sent an email to ${input.email}` };
  }),

  login: pub.auth.login.handler(async ({ input }) => {
    const result = await authService.loginUser(input);

    return {
      token: result.token,
      user: result.user,
    };
  }),

  verifyEmail: pub.auth.verifyEmail.handler(async ({ input }) => {
    const result = await authService.verifyEmail(input);

    return {
      token: result.token,
      user: result.user,
    };
  }),

  forgotPassword: pub.auth.forgotPassword.handler(async ({ input }) => {
    const result = await authService.forgotPassword(input);

    return {
      message: result.message,
    };
  }),

  verifyResetOtp: pub.auth.verifyResetOtp.handler(async ({ input }) => {
    const result = await authService.verifyResetOtp(input);

    return {
      message: result.message,
      resetToken: result.resetToken,
    };
  }),

  resetPassword: pub.auth.resetPassword.handler(async ({ input }) => {
    const result = await authService.resetPassword(input);

    return {
      message: result.message,
    };
  }),
});
