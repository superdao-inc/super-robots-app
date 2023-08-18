import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { assert } from 'node:console';
import express from 'express';

import { CustomLogger } from '@dev/nestjs-common';
import { AuthGuard } from 'src/auth.guard';
import { SendEmailVerificationMessageInput, UpdateUserEmailInput } from './dto/updateUserEmailInput.dto';
import {
	CheckUserOTPEmailResponse,
	UpdateUserEmailResponse,
	ValidateUserOTPEmailInput,
	ValidateUserOTPEmailResponse
} from './dto/updateUserEmailResponse.dto';
import { EmailSettingsService } from './emailSettings.service';
import { ERROR_EMAIL_ALREADY_REGISTERED } from '@sd/superdao-shared';

const ATTEMPT_TIMEOUT_MS = 60 * 1000;

@Resolver(Boolean)
export class EmailSettingsResolver {
	constructor(private readonly emailSettingsService: EmailSettingsService, private logger: CustomLogger) {
		this.logger = logger.createScope(EmailSettingsResolver.name);
	}

	@Mutation(() => UpdateUserEmailResponse)
	@UseGuards(AuthGuard)
	async sendEmailVerificationMessage(
		@Args('sendEmailVerificationMessageInput') { userPageAnchor }: SendEmailVerificationMessageInput,
		@Context('req') req: express.Request
	): Promise<UpdateUserEmailResponse> {
		const { session } = req;
		const { userId } = session ?? {};
		assert(userId, Error('Not found "userId" for send verification message'));

		const protocol = req.protocol;
		const host = req.get('Host');

		const fullUrl = `${protocol}://${host}`;

		const checkUserOTPEmailResponse = await this.emailSettingsService.checkUserOTPEmailResponse(userId);
		if (checkUserOTPEmailResponse.resendTimestamp > 0) {
			this.logger.log('SendEmailVerificationMessage warning: next attempt timeout is not expired', {
				userId,
				checkUserOTPEmailResponse
			});

			return { nextAttemptToSendEmail: null, error: 'Next attempt timeout is not expired' };
		}

		try {
			await this.emailSettingsService.sendEmailVerificationMessage(
				userId,
				req.headers['user-agent'] ?? '',
				fullUrl,
				userPageAnchor
			);
		} catch (e) {
			this.logger.error(new Error('SendEmailVerificationMessage: error while sending email verification message'), {
				e,
				userId
			});

			await this.emailSettingsService.dropUserOTPEmailResponse(userId);

			return { nextAttemptToSendEmail: null, error: 'Error while sending email verification message' };
		}

		return { nextAttemptToSendEmail: Date.now() + ATTEMPT_TIMEOUT_MS, error: null };
	}

	@Mutation(() => UpdateUserEmailResponse)
	@UseGuards(AuthGuard)
	async updateUserEmail(
		@Args('updateUserEmailInput') { email, userPageAnchor }: UpdateUserEmailInput,
		@Context('req') req: express.Request
	): Promise<UpdateUserEmailResponse> {
		const { session } = req;
		const { userId } = session ?? {};
		assert(userId, Error('Not found "userId" for update email'));

		const checkUserOTPEmailResponse = await this.emailSettingsService.checkUserOTPEmailResponse(userId);
		if (checkUserOTPEmailResponse.resendTimestamp > 0) {
			this.logger.log('Update warning: next attempt timeout is not expired', {
				userId,
				email,
				checkUserOTPEmailResponse
			});

			return { nextAttemptToSendEmail: null, error: 'Next attempt timeout is not expired' };
		}

		try {
			await this.emailSettingsService.updateUserEmail(userId, req.headers['user-agent'] ?? '', email, userPageAnchor);
		} catch (e: any) {
			this.logger.error(new Error('Update: error while sending email verification message'), {
				e,
				userId
			});

			if (e.message === ERROR_EMAIL_ALREADY_REGISTERED) {
				return { nextAttemptToSendEmail: null, error: ERROR_EMAIL_ALREADY_REGISTERED };
			}

			return { nextAttemptToSendEmail: null, error: 'Error while sending email verification message' };
		}

		this.logger.log('email update: email sent with back param', { userPageAnchor });

		return { nextAttemptToSendEmail: Date.now() + ATTEMPT_TIMEOUT_MS, error: null };
	}

	@Mutation(() => Boolean)
	@UseGuards(AuthGuard)
	async removeUserEmail(@Context('req') req: express.Request): Promise<boolean> {
		const { session } = req;
		const { userId } = session ?? {};
		assert(userId, Error('Not found "userId" for remove email'));

		await this.emailSettingsService.removeUserEmail(userId);

		// Mutate session
		if (session?.nextAttemptToSendEmail) delete session.nextAttemptToSendEmail;

		return true;
	}

	@Query(() => CheckUserOTPEmailResponse)
	@UseGuards(AuthGuard)
	async checkUserOTPEmailResponse(@Context('req') req: express.Request) {
		const { session } = req;
		const { userId } = session ?? {};
		assert(userId, Error('Not found "userId" while checking user otp'));

		return this.emailSettingsService.checkUserOTPEmailResponse(userId);
	}

	@Mutation(() => Boolean)
	@UseGuards(AuthGuard)
	async resetUserOTPAndEmail(@Context('req') req: express.Request) {
		const { session } = req;
		const { userId } = session ?? {};
		assert(userId, Error('Not found "userId" while resetting user otp'));

		await this.emailSettingsService.resetUserOTP(userId);

		return true;
	}

	@Mutation(() => ValidateUserOTPEmailResponse)
	@UseGuards(AuthGuard)
	async validateUserOTPEmailResponse(
		@Args('validateUserOTPEmailInput') input: ValidateUserOTPEmailInput,
		@Context('req') req: express.Request
	) {
		const { session } = req;
		const { userId } = session ?? {};
		assert(userId, Error('Not found "userId" while validating user otp'));

		return this.emailSettingsService.validateUserOTPEmailResponse(input, userId);
	}
}
