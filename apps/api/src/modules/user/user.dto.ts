import { format } from 'date-fns';

import type {
  UserProfileOutput,
  UserPublicProfileOutput,
} from '@workspace/api-schemas/user';
import type { User } from '@workspace/db';

export const buildUserProfileDto = (user: User): UserProfileOutput => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  image: user.image ?? undefined,
  dateOfBirth: user.dateOfBirth
    ? format(user.dateOfBirth, 'dd/MM/yyyy')
    : undefined,
  gender: user.gender,
});

export const buildUserPublicProfileDto = (
  user: User
): UserPublicProfileOutput => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  image: user.image ?? undefined,
});
