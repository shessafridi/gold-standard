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
import { withAuth } from './utils/with-auth';

export const userContract = {
  getMyProfile: oc
    .route({
      method: 'GET',
      path: '/users/me',
      tags: ['User Management'],
      description: 'Retrieve the authenticated user profile information.',
      spec: withAuth,
    })
    .output(userProfileSchema),

  getUserProfile: oc
    .route({
      method: 'GET',
      path: '/users/{userId}',
      tags: ['User Management'],
      description:
        'Retrieve public profile details for a specified user by ID.',
      spec: withAuth,
    })
    .input(z.object({ userId: z.string() }))
    .output(userPublicProfileSchema),

  changePassword: oc
    .route({
      method: 'PATCH',
      path: '/users/me/password',
      tags: ['User Management'],
      description: 'Change the authenticated user account password.',
      spec: withAuth,
    })
    .input(changePasswordSchema)
    .output(messageOutputSchema),

  deleteMyAccount: oc
    .route({
      method: 'DELETE',
      path: '/users/me',
      tags: ['User Management'],
      description: 'Delete the authenticated user account and associated data.',
      spec: withAuth,
    })
    .output(messageOutputSchema),

  updateEmail: oc
    .route({
      method: 'PATCH',
      path: '/users/me/email/{newEmail}',
      tags: ['User Management'],
      description:
        'Update the authenticated user email address in their profile.',
      spec: withAuth,
    })
    .input(updateEmailSchema)
    .output(messageOutputSchema),

  adminResetPassword: oc
    .route({
      method: 'PATCH',
      path: '/users/{userId}/password',
      tags: ['User Management', 'Admin'],
      description: 'Allows admins to change the password for any user',
      spec: withAuth,
    })
    .input(adminResetPasswordSchema)
    .output(messageOutputSchema),
};
