import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TracerModule, LoggerModule, CustomLogger } from '@dev/nestjs-common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from 'src/config';

import { UserModule } from 'src/entities/user/user.module';
import { EmailModule } from '../email/email.module';
import { CacheModule } from '../cache/cache.module';
import { BabyRobotModule } from 'src/entities/babyRobot/babyRobot.module';
import { RewardMintModule } from '../rewardMint/rewardMint.module';
import { BabyRobotsPreviewModule } from '../babyRobotsPreview/babyRobotsPreview.module';
import { TokenUpdateWorkerService } from './tokenUpdateWorker.service';
import { TokenUpdateWorkerHelper } from './tokenUpdateWorker.helper';
import { HealthCheckModule } from '../healthCheck/healthCheck.module';

const DOMAIN_MODULES = [
	TracerModule,
	UserModule,
	EmailModule,
	BabyRobotModule,
	RewardMintModule,
	BabyRobotsPreviewModule,
	CacheModule
];

@Module({
	providers: [TokenUpdateWorkerService, TokenUpdateWorkerHelper],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [() => config]
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('db.host'),
				port: configService.get('db.port'),
				username: configService.get('db.user'),
				password: configService.get('db.password'),
				database: configService.get('db.name'),
				synchronize: false,
				autoLoadEntities: true
			})
		}),
		RedisModule.forRootAsync({
			inject: [ConfigService, CustomLogger],
			useFactory: async (configService: ConfigService, logger: CustomLogger) => ({
				config: {
					host: configService.get('redis.host'),
					port: configService.get('redis.port'),
					username: configService.get('redis.user'),
					password: configService.get('redis.password'),
					onClientCreated: async (client) => {
						client.on('error', (err) => logger.error(new Error('RedisContext: Redis Client Error'), { err }));
					}
				},
				readyLog: true
			})
		}),
		ScheduleModule.forRoot(),
		...DOMAIN_MODULES,
		TracerModule,
		HealthCheckModule,
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const mode = configService.get<string>('env.nodeEnv');
				const level = configService.get<string>('log.level');

				return { pretty: mode !== 'production', level };
			},
			inject: [ConfigService]
		})
	]
})
export class TokenUpdateWorkerModule {}
