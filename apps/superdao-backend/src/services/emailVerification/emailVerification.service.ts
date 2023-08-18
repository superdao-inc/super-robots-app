import assert from 'node:assert';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CustomLogger } from '@dev/nestjs-common';
import { NotFoundError } from '../../exceptions';
import { User } from '../../entities/user/user.model';
import { EmailService } from '../email/email.service';
import { VerificationService } from '../verification/verification.service';
import { EmailVerificationError, EmailVerificationErrorCode } from './emailVerification.error';
import { UserService } from 'src/entities/user/user.service';

type EmailTokenPayload = { userId: string; email: string };
type SendConfirmationEmailOptions = {
	ua?: string;
	linkUrl?: string;
	userPageAnchor?: string;
	otp: string;
} & EmailTokenPayload;

@Injectable()
export class EmailVerificationService {
	constructor(
		private readonly verificationService: VerificationService,
		private readonly emailService: EmailService,
		private readonly userService: UserService,
		@InjectDataSource() private dataSource: DataSource,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(EmailVerificationService.name);
	}

	async sendConfirmationEmail({
		userId,
		email,
		ua,
		linkUrl,
		userPageAnchor,
		otp
	}: SendConfirmationEmailOptions): Promise<void> {
		await this.emailService.sendEmailConfirmationMessage({
			userId,
			email,
			ua,
			otp,
			linkUrl,
			userPageAnchor
		});
	}

	async verify(token: string): Promise<string> {
		const data = await this.verificationService.verifyTokenAsync<EmailTokenPayload>(token);

		this.logger.log('Verification token data', data);

		const user = await this.dataSource.transaction(async (manager) => {
			const { userId: id, email } = data;

			const user = await manager.findOneBy(User, { id });

			assert(user, new NotFoundError('User not found'));
			assert(
				user.email === email,
				new EmailVerificationError(
					'User email and verification email do not match',
					EmailVerificationErrorCode.NOT_MATCH
				)
			);
			assert(
				!user.emailVerified,
				new EmailVerificationError('Email already verified', EmailVerificationErrorCode.ALREADY_VERIFIED)
			);

			await manager.update(User, { id }, { email, emailVerified: true });

			return user;
		});

		await this.userService.invalidateUserByWallet(user.walletAddress);
		await this.userService.invalidateUserByIdCache(user.id);

		return data.email;
	}
}
