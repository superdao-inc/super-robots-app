import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user/user.model';
import { EmailVerificationModule } from 'src/services/emailVerification/emailVerification.module';
import { EmailSettingsResolver } from './emailSettings.resolver';
import { EmailSettingsService } from './emailSettings.service';

@Module({
	imports: [TypeOrmModule.forFeature([User]), EmailVerificationModule],
	providers: [EmailSettingsResolver, EmailSettingsService],
	exports: [EmailSettingsService]
})
export class EmailSettingsModule {}
