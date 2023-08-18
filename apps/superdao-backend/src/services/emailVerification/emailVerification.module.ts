import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { VerificationModule } from '../verification/verification.module';

import { EmailVerificationController } from './emailVerification.controller';
import { EmailVerificationService } from './emailVerification.service';

@Module({
	imports: [EmailModule, VerificationModule],
	controllers: [EmailVerificationController],
	providers: [EmailVerificationService],
	exports: [EmailVerificationService]
})
export class EmailVerificationModule {}
