import z from 'zod';
import { genderValidator, passwordValidator } from '../common';

export const userRoleSchema = z.enum(['ADMIN', 'USER']);
export type UserRole = z.infer<typeof userRoleSchema>;

// Input

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: passwordValidator,
});

export const adminResetPasswordSchema = z.object({
  newPassword: passwordValidator,
  userId: z.string(),
});

export const updateEmailSchema = z.object({
  newEmail: z.email(),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type AdminResetPasswordInput = z.infer<typeof adminResetPasswordSchema>;
export type UpdateEmailInput = z.infer<typeof updateEmailSchema>;

// Output

export const userProfileSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email().optional(),
  gender: genderValidator.optional(),
  dateOfBirth: z.string().optional(),
  role: userRoleSchema,
  image: z.string().optional(),
});

export const userPublicProfileSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  image: z.string().optional(),
});

export type UserProfileOutput = z.infer<typeof userProfileSchema>;
export type UserPublicProfileOutput = z.infer<typeof userPublicProfileSchema>;
