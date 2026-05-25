import type { TokenVerificationService } from '@/modules/token-verification';
import type { UserRepository } from '@/modules/user/user.repository';
import {
  tokenVerificationService as tokenVerificationServiceSingleton,
  VerificationTokenType,
} from '@/modules/token-verification';
import { userRepository as userRepositorySingleton } from '@/modules/user/user.repository';
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '@/shared/errors';
import { fullName } from '@/shared/utils/names';

import type { ChangePasswordInput } from '@workspace/api-schemas/user';

import { hashPassword, verifyPassword } from '../auth/password.util';
import { buildUserProfileDto, buildUserPublicProfileDto } from './user.dto';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly tokenVerificationService: TokenVerificationService;

  constructor(
    userRepository: UserRepository,
    tokenVerificationService: TokenVerificationService
  ) {
    this.userRepository = userRepository;
    this.tokenVerificationService = tokenVerificationService;
  }

  public async changePassword(userId: string, data: ChangePasswordInput) {
    const user = await this.userRepository.findById(userId);
    if (!user?.password) {
      throw new NotFoundError('User not found');
    }

    const isPasswordValid = await verifyPassword(
      user.password,
      data.oldPassword
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid old password');
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await this.userRepository.updateById(userId, { password: hashedPassword });

    return { message: 'Password changed successfully' };
  }

  public async setUserPassword(userId: string, newPassword: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const hashedPassword = await hashPassword(newPassword);
    await this.userRepository.updateById(userId, { password: hashedPassword });

    return { message: 'Password updated successfully' };
  }

  public async updateEmail(userId: string, newEmail: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const normalizedEmail = newEmail.trim().toLowerCase();
    if (!normalizedEmail) {
      throw new ValidationError('Email is required');
    }

    if (user.email === normalizedEmail) {
      return { message: 'Email is already set to the specified value' };
    }

    const existingUser = await this.userRepository.findOne({
      email: normalizedEmail,
    });
    if (existingUser) {
      throw new ValidationError('Email is already in use');
    }

    await this.userRepository.updateById(userId, {
      email: normalizedEmail,
      emailVerified: undefined,
    });

    await this.tokenVerificationService.generateAndSendOtp({
      email: normalizedEmail,
      type: VerificationTokenType.VERIFY_EMAIL,
      name: fullName(user.firstName, user.lastName),
    });

    return {
      message: 'Email updated successfully. Please verify your new email.',
    };
  }

  public async deleteAccount(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    await this.userRepository.deleteById(userId);
    return { message: 'Account deleted successfully' };
  }

  public async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return buildUserProfileDto(user);
  }

  public async getPublicProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return buildUserPublicProfileDto(user);
  }
}

export const userService = new UserService(
  userRepositorySingleton,
  tokenVerificationServiceSingleton
);
