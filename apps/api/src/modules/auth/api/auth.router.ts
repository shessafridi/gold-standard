import { os } from '@/orpc/os';
import { authService } from '../auth.service';

export const authRouter = os.auth.router({
  registerUser: os.auth.registerUser.handler(async ({ input }) => {
    await authService.registerUser(input);

    return { message: `We have sent an email to ${input.email}` };
  }),

  login: os.auth.login.handler(async ({ input }) => {
    const result = await authService.loginUser(input);

    return {
      token: result.token,
      user: result.user,
    };
  }),

  verifyEmail: os.auth.verifyEmail.handler(async ({ input }) => {
    const result = await authService.verifyEmail(input);

    return {
      token: result.token,
      user: result.user,
    };
  }),

  forgotPassword: os.auth.forgotPassword.handler(async ({ input }) => {
    const result = await authService.forgotPassword(input);

    return {
      message: result.message,
    };
  }),

  verifyResetOtp: os.auth.verifyResetOtp.handler(async ({ input }) => {
    const result = await authService.verifyResetOtp(input);

    return {
      message: result.message,
      resetToken: result.resetToken,
    };
  }),

  resetPassword: os.auth.resetPassword.handler(async ({ input }) => {
    const result = await authService.resetPassword(input);

    return {
      message: result.message,
    };
  }),
});
