import { Controller, Get, Param } from '@nestjs/common';
import { EmailVerificationOptions, EmailVerificationStatus } from '@sd/superdao-shared';

import { EmailVerificationService } from './emailVerification.service';
import { EmailVerificationError, EmailVerificationErrorCode } from './emailVerification.error';
import { VerificationError } from '../verification/verification.error';

const STATUS_BY_CODE: Record<EmailVerificationErrorCode, EmailVerificationStatus> = {
	[EmailVerificationErrorCode.ALREADY_VERIFIED]: EmailVerificationStatus.ALREADY_VERIFIED,
	[EmailVerificationErrorCode.NOT_MATCH]: EmailVerificationStatus.NOT_MATCH
};

@Controller('/api/email')
export class EmailVerificationController {
	constructor(private readonly emailVerificationService: EmailVerificationService) {}

	@Get('/verify/:token')
	async verify(@Param('token') token: string): Promise<EmailVerificationOptions> {
		try {
			const email = await this.emailVerificationService.verify(token);
			return { status: EmailVerificationStatus.SUCCESS, email };
		} catch (error) {
			if (error instanceof VerificationError) {
				return { status: EmailVerificationStatus.VERIFICATION_ERROR };
			}

			if (error instanceof EmailVerificationError) {
				return { status: STATUS_BY_CODE[error.code] };
			}

			return { status: EmailVerificationStatus.UNKNOWN_ERROR };
		}
	}
}
