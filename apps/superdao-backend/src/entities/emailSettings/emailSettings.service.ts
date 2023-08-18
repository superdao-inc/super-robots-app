import assert from 'node:assert';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { EmailVerificationService } from 'src/services/emailVerification/emailVerification.service';
import { NotFoundError, ValidationError } from 'src/exceptions';
import { CacheService, getEmailOTPDataByUserIdKey } from 'src/services/cache';
import { User } from '../user/user.model';
import { ERROR_EMAIL_ALREADY_REGISTERED } from '@sd/superdao-shared';
import { UserService } from '../user/user.service';
import { OTPValidationStatus, ValidateUserOTPEmailInput } from './dto/updateUserEmailResponse.dto';

const ATTEMT_TIMEOUT_MS = 60 * 1000;
const OTP_TIMEOUT_S = 60 * 30;

@Injectable()
export class EmailSettingsService {
	constructor(
		private readonly emailVerificationService: EmailVerificationService,
		@InjectDataSource() private dataSource: DataSource,
		@InjectRepository(User) private userRepository: Repository<User>,
		private readonly userService: UserService,
		private readonly cacheService: CacheService
	) {}

	generateNextAttemptTimestamp(): number {
		return Date.now() + ATTEMT_TIMEOUT_MS;
	}

	checkNextAttemptTimestamp(timestamp?: number): void {
		if (timestamp && timestamp > Date.now()) {
			throw Error('Next attempt timeout is not expired');
		}
	}

	async sendEmailVerificationMessage(
		userId: string,
		ua: string,
		linkUrl: string,
		userPageAnchor: string
	): Promise<void> {
		const user = await this.userRepository.findOneBy({ id: userId });
		assert(user, new NotFoundError('User not found'));
		assert(user.email, new NotFoundError('Email not found'));
		assert(!user.emailVerified, new ValidationError('Email already verified'));

		const otp = await this.generateUserOTPEmailResponse(userId);

		await this.emailVerificationService.sendConfirmationEmail({
			userId,
			email: user.email,
			ua,
			linkUrl,
			userPageAnchor,
			otp
		});
	}

	async updateUserEmail(userId: string, ua: string, email: string, userPageAnchor: string = '/'): Promise<User> {
		const user = await this.dataSource.transaction(async (manager) => {
			const user = await manager.findOneBy(User, { id: userId });
			const userByEmail = await manager.findOneBy(User, { email });
			assert(user, new NotFoundError('User not found'));
			assert(userByEmail ? userByEmail.id === user.id : true, new ValidationError(ERROR_EMAIL_ALREADY_REGISTERED));
			assert(email !== user.email, new ValidationError('Email addresses are the same'));

			await manager.update(User, { id: userId }, { email, emailVerified: false });

			return user;
		});

		await this.userService.invalidateUserByWallet(user.walletAddress);
		await this.userService.invalidateUserByIdCache(user.id);

		const otp = await this.generateUserOTPEmailResponse(userId);

		try {
			await this.emailVerificationService.sendConfirmationEmail({ userId, email, ua, userPageAnchor, otp });
		} catch (e) {
			await this.dropUserOTPEmailResponse(userId);

			throw e;
		}

		return user;
	}

	async removeUserEmail(userId: string) {
		await this.userRepository.update({ id: userId }, { email: null, emailVerified: false });
	}

	async dropUserOTPEmailResponse(userId: string) {
		const otpCacheKey = getEmailOTPDataByUserIdKey(userId);

		await this.cacheService.del(otpCacheKey);
	}

	async generateUserOTPEmailResponse(userId: string) {
		const otpCacheKey = getEmailOTPDataByUserIdKey(userId);

		const randomSixDigitOtp = String(Math.floor(Math.random() * 899999 + 100000));

		await this.cacheService.set(otpCacheKey, randomSixDigitOtp, OTP_TIMEOUT_S); // 30 minutes

		return randomSixDigitOtp;
	}

	async checkUserOTPEmailResponse(userId: string) {
		const otpCacheKey = getEmailOTPDataByUserIdKey(userId);

		const otpTimestamp = await this.cacheService.ttl(otpCacheKey);

		const resendTimestamp = otpTimestamp - OTP_TIMEOUT_S + 60; // 1 minute since creating otp

		return { resendTimestamp, otpTimestamp };
	}

	async resetUserOTP(userId: string) {
		const otpCacheKey = getEmailOTPDataByUserIdKey(userId);

		await this.cacheService.del(otpCacheKey);
	}

	async validateUserOTPEmailResponse(input: ValidateUserOTPEmailInput, userId: string) {
		const { otp } = input;
		const otpCacheKey = getEmailOTPDataByUserIdKey(userId);

		const otpData = await this.cacheService.get(otpCacheKey);

		if (!otpData) return { status: OTPValidationStatus.EXPIRED };

		if (otpData !== otp) return { status: OTPValidationStatus.FAIL };

		const user = await this.userRepository.findOneBy({ id: userId });
		assert(user, new NotFoundError('User not found'));

		user.emailVerified = true;

		await Promise.all([
			user.save(),
			this.userService.invalidateUserByWallet(user.walletAddress),
			this.userService.invalidateUserByIdCache(user.id)
		]);

		return { status: OTPValidationStatus.SUCCESS };
	}
}
