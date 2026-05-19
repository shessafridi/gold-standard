import type { UserRepository } from '@/modules/user/user.repository';
import {
  tokenVerificationService as tokenVerificationServiceSingleton,
  VerificationTokenType,
} from '@/modules/token-verification';
import { userRepository as userRepositorySingleton } from '@/modules/user/user.repository';
import { UnauthorizedError, ValidationError } from '@/shared/errors';
import { fullName } from '@/shared/utils/names';

import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterUserInput,
  ResetPasswordInput,
  VerifyEmailInput,
  VerifyResetOtpInput,
} from '@workspace/api-schemas/auth';

import type { TokenVerificationService } from '../token-verification/token-verification.service';
import { buildUserProfileDto } from '../user/user.dto';
import { hashPassword, verifyPassword } from './password.util';
import { generateAuthToken } from './token.util';

export class AuthService {
  private readonly userRepository: UserRepository;
  private tokenVerificationService: TokenVerificationService;

  constructor(
    userRepository: UserRepository,
    tokenVerificationService: TokenVerificationService
  ) {
    this.userRepository = userRepository;
    this.tokenVerificationService = tokenVerificationService;
  }

  async registerUser(data: RegisterUserInput) {
    const existingUser = await this.userRepository.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new ValidationError('User with this email already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      ...(data.phone && { phone: data.phone }),
      role: 'USER',
      // TODO: remove in real app - for testing purposes only
      emailVerified: new Date(),
    });

    // await tokenVerificationService.generateAndSendOtp({
    //   email: data.email,
    //   type: VerificationTokenType.VERIFY_EMAIL,
    //   name: fullName(newUser.firstName, newUser.lastName),
    // });
    const userDto = buildUserProfileDto(user);

    return {
      user: userDto,
    };
  }

  async loginUser(data: LoginInput) {
    const user = await this.userRepository.findOne({ email: data.email });

    if (!user || !user.password) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await verifyPassword(user.password, data.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.emailVerified) {
      throw new UnauthorizedError('Please verify your email before logging in');
    }

    const token = await generateAuthToken(user);
    const userDto = buildUserProfileDto(user);

    return { token, user: userDto };
  }

  async verifyEmail(data: VerifyEmailInput) {
    const otpRec = await this.tokenVerificationService.consumeVerificationToken(
      {
        email: data.email,
        code: data.code,
        type: VerificationTokenType.VERIFY_EMAIL,
      }
    );

    if (!otpRec) {
      throw new ValidationError('Invalid or expired verification code');
    }

    const user = await this.userRepository.updateOne(
      { email: data.email },
      { emailVerified: new Date() }
    );

    if (!user) {
      throw new ValidationError('User not found');
    }

    const token = await generateAuthToken(user);
    const userDto = buildUserProfileDto(user);

    return { token, user: userDto };
  }

  async forgotPassword(data: ForgotPasswordInput) {
    const user = await this.userRepository.findOne({ email: data.email });
    const genericMessage =
      'If an account with that email exists, we sent a password reset OTP.';

    if (!user || !user?.email) {
      return { message: genericMessage };
    }

    await this.tokenVerificationService.generateAndSendOtp({
      email: user.email,
      type: VerificationTokenType.FORGOT_PASSWORD,
      name: fullName(user.firstName, user.lastName),
    });

    return { message: genericMessage };
  }

  async verifyResetOtp(data: VerifyResetOtpInput) {
    const otpRec = await this.tokenVerificationService.consumeVerificationToken(
      {
        email: data.email,
        code: data.code,
        type: VerificationTokenType.FORGOT_PASSWORD,
      }
    );

    if (!otpRec) {
      throw new ValidationError('Invalid or expired verification code');
    }

    const resetToken = await this.tokenVerificationService.generateResetToken({
      email: data.email,
      type: VerificationTokenType.RESET_PASSWORD,
    });

    return {
      message: 'Verification code is valid',
      resetToken,
    };
  }

  async resetPassword(data: ResetPasswordInput) {
    const resetTokenRec =
      await this.tokenVerificationService.consumeVerificationToken({
        email: data.email,
        code: data.resetToken,
        type: VerificationTokenType.RESET_PASSWORD,
      });

    if (!resetTokenRec) {
      throw new ValidationError('Invalid or expired reset code');
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await this.userRepository.updateOne(
      { email: data.email },
      { password: hashedPassword }
    );

    return { message: 'Password has been reset successfully' };
  }
}

export const authService = new AuthService(
  userRepositorySingleton,
  tokenVerificationServiceSingleton
);
