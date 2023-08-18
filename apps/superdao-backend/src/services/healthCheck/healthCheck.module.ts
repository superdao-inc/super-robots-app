import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthCheck.controller';

@Module({
	providers: [],
	controllers: [HealthCheckController]
})
export class HealthCheckModule {}
