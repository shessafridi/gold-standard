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
      description:
        'Register a new user account with email, password, and profile details.',
    })
    .input(registerUserSchema)
    .output(messageOutputSchema),

  login: oc
    .route({
      method: 'POST',
      path: '/auth/login',
      tags: ['Authentication'],
      description:
        'Authenticate a user and return an access token on successful login.',
    })
    .input(loginSchema)
    .output(loginOutputSchema),

  forgotPassword: oc
    .route({
      method: 'POST',
      path: '/auth/forgot-password',
      tags: ['Authentication'],
      description:
        'Initiate the password reset process by sending a reset otp to the user email.',
    })
    .input(forgotPasswordSchema)
    .output(messageOutputSchema),

  verifyResetOtp: oc
    .route({
      method: 'POST',
      path: '/auth/verify-reset-otp',
      tags: ['Authentication'],
      description:
        'Verify the password reset one-time password (OTP) sent to the user email and exchange it for a password reset token.',
    })
    .input(verifyResetOtpSchema)
    .output(verifyResetOtpOutputSchema),

  resetPassword: oc
    .route({
      method: 'POST',
      path: '/auth/reset-password',
      tags: ['Authentication'],
      description:
        "Reset the user's password using a reset token obtained from the /auth/verify-reset-otp.",
    })
    .input(resetPasswordSchema)
    .output(messageOutputSchema),

  verifyEmail: oc
    .route({
      method: 'POST',
      path: '/auth/verify-email',
      tags: ['Authentication'],
      description:
        'Verify a user email address using the provided verification token.',
    })
    .input(verifyEmailSchema)
    .output(verifyEmailOutputSchema),
};
