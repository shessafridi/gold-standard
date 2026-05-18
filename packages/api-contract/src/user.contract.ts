import { oc } from '@orpc/contract';
import { messageOutputSchema } from '@workspace/api-schemas/common';
import {
  adminResetPasswordSchema,
  changePasswordSchema,
  updateEmailSchema,
  userProfileSchema,
  userPublicProfileSchema,
} from '@workspace/api-schemas/user';
import z from 'zod';

export const userContract = {
  getMyProfile: oc
    .route({
      method: 'GET',
      path: '/users/me',
      tags: ['User Management'],
    })
    .output(userProfileSchema),

  getUserProfile: oc
    .route({
      method: 'GET',
      path: '/users/{userId}',
      tags: ['User Management'],
    })
    .input(z.object({ userId: z.string() }))
    .output(userPublicProfileSchema),

  changePassword: oc
    .route({
      method: 'PATCH',
      path: '/users/me/password',
      tags: ['User Management'],
    })
    .input(changePasswordSchema)
    .output(messageOutputSchema),

  deleteMyAccount: oc
    .route({
      method: 'DELETE',
      path: '/users/me',
      tags: ['User Management'],
    })
    .output(messageOutputSchema),

  updateEmail: oc
    .route({
      method: 'PATCH',
      path: '/users/me/email/{newEmail}',
      tags: ['User Management'],
    })
    .input(updateEmailSchema)
    .output(messageOutputSchema),

  adminResetPassword: oc
    .route({
      method: 'PATCH',
      path: '/users/{userId}/password',
      tags: ['User Management', 'Admin'],
      description: 'Allows admins to change the password for any user',
    })
    .input(adminResetPasswordSchema)
    .output(messageOutputSchema),
};
