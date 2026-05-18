import {
  notificationsService as notificationsServiceSingleton,
  type NotificationsService,
} from '@/infrastructure/notifications';
import { createHash, randomUUID } from 'node:crypto';
import type { VerificationTokenType } from '@workspace/db';
import type { VerificationTokenRepository } from './verification-token.repository';
import { verificationTokenRepository as verificationTokenRepositorySingleton } from './verification-token.repository';

export class TokenVerificationService {
  private readonly OTP_EXPIRATION_MS = 10 * 60 * 1000; // 10 minutes
  private readonly verificationTokenRepository: VerificationTokenRepository;
  private readonly notificationsService: NotificationsService;

  constructor(
    verificationTokenRepository: VerificationTokenRepository,
    notificationsService: NotificationsService
  ) {
    this.verificationTokenRepository = verificationTokenRepository;
    this.notificationsService = notificationsService;
  }

  public async generateOtp({
    email,
    type,
  }: {
    email: string;
    type: VerificationTokenType;
  }): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return this.save(email, code, type);
  }

  public async generateResetToken({
    email,
    type,
  }: {
    email: string;
    type: VerificationTokenType;
  }): Promise<string> {
    const code = randomUUID();
    await this.verificationTokenRepository.deleteMany({ email, type });
    return this.save(email, code, type);
  }

  public async generateAndSendOtp({
    email,
    type,
    name,
  }: {
    email: string;
    type: VerificationTokenType;
    name?: string;
  }): Promise<string> {
    const code = await this.generateOtp({ email, type });

    await this.notificationsService.send({
      notification: 'auth.otp',
      data: { code, name: name ?? email },
      channels: [{ type: 'email', toEmail: email }],
    });

    return code;
  }

  public async consumeVerificationToken({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: VerificationTokenType;
  }) {
    const otpRec = await this.verificationTokenRepository.findOne({
      email,
      tokenHash: this.hash(code),
      type,
    });

    if (!otpRec) {
      return null;
    }

    await this.verificationTokenRepository.deleteMany({ email, type });
    return otpRec;
  }

  private hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  private async save(
    email: string,
    code: string,
    type: VerificationTokenType
  ): Promise<string> {
    await this.verificationTokenRepository.create({
      email,
      tokenHash: this.hash(code),
      type,
      expiresAt: new Date(Date.now() + this.OTP_EXPIRATION_MS),
    });

    return code;
  }
}

export const tokenVerificationService = new TokenVerificationService(
  verificationTokenRepositorySingleton,
  notificationsServiceSingleton
);
