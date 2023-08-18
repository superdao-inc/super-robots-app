import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { VerificationService } from './verification.service';

@Module({
	providers: [VerificationService],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const secret = configService.get<string>('VERIFICATION_JWT_SECRET');

				return { secret };
			}
		})
	],
	exports: [VerificationService]
})
export class VerificationModule {}
