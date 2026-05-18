import { oc } from '@orpc/contract';
import {
  forgotPasswordSchema,
  loginOutputSchema,
  loginSchema,
  registerUserSchema,
  resetPasswordSchema,
  verifyEmailOutputSchema,
  verifyEmailSchema,
  verifyResetOtpOutputSchema,
  verifyResetOtpSchema,
} from '@workspace/api-schemas/auth';
import { messageOutputSchema } from '@workspace/api-schemas/common';

export const authContract = {
  registerUser: oc
    .route({
      method: 'POST',
      path: '/auth/register',
      tags: ['Authentication'],
    })
    .input(registerUserSchema)
    .output(messageOutputSchema),

  login: oc
    .route({
      method: 'POST',
      path: '/auth/login',
      tags: ['Authentication'],
    })
    .input(loginSchema)
    .output(loginOutputSchema),

  forgotPassword: oc
    .route({
      method: 'POST',
      path: '/auth/forgot-password',
      tags: ['Authentication'],
    })
    .input(forgotPasswordSchema)
    .output(messageOutputSchema),

  verifyResetOtp: oc
    .route({
      method: 'POST',
      path: '/auth/verify-reset-otp',
      tags: ['Authentication'],
    })
    .input(verifyResetOtpSchema)
    .output(verifyResetOtpOutputSchema),

  resetPassword: oc
    .route({
      method: 'POST',
      path: '/auth/reset-password',
      tags: ['Authentication'],
    })
    .input(resetPasswordSchema)
    .output(messageOutputSchema),

  verifyEmail: oc
    .route({
      method: 'POST',
      path: '/auth/verify-email',
      tags: ['Authentication'],
    })
    .input(verifyEmailSchema)
    .output(verifyEmailOutputSchema),
};
