import { z } from 'zod';
import {
  dobOver18Validator,
  genderValidator,
  messageOutputSchema,
  passwordValidator,
} from '../common';
import { userProfileSchema } from '../user';

// Input

const createUserSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.email(),
  dateOfBirth: dobOver18Validator,
  gender: genderValidator,
  password: passwordValidator,
  phone: z.string().optional(),
});

export const registerUserSchema = createUserSchema;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z.object({
  email: z.email(),
  resetToken: z.string(),
  newPassword: z.string().min(8),
});

export const verifyResetOtpSchema = z.object({
  email: z.email(),
  code: z.string().length(6),
});

export const verifyEmailSchema = z.object({
  email: z.email(),
  code: z.string().length(6),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyResetOtpInput = z.infer<typeof verifyResetOtpSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

// Output

const baseAuthOutputSchema = z.object({
  token: z.jwt(),
  user: userProfileSchema,
});
export const loginOutputSchema = baseAuthOutputSchema;
export const verifyEmailOutputSchema = baseAuthOutputSchema;
export const verifyResetOtpOutputSchema = messageOutputSchema.extend({
  resetToken: z.string(),
});

export type LoginOutput = z.infer<typeof baseAuthOutputSchema>;
export type RegisterUserOutput = z.infer<typeof messageOutputSchema>;
export type ForgotPasswordOutput = z.infer<typeof messageOutputSchema>;
export type ResetPasswordOutput = z.infer<typeof messageOutputSchema>;
export type VerifyEmailOutput = z.infer<typeof baseAuthOutputSchema>;
export type VerifyResetOtpOutput = z.infer<typeof verifyResetOtpOutputSchema>;
