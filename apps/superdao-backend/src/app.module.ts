import { MiddlewareConsumer, Module } from '@nestjs/common';
import {
	makeCounterProvider,
	makeHistogramProvider,
	makeSummaryProvider,
	PrometheusModule
} from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { exponentialBuckets } from 'prom-client';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import depthLimit from 'graphql-depth-limit';
import { createPrometheusExporterPlugin } from '@bmatei/apollo-prometheus-exporter';

import { CustomLogger, LoggerModule, TracerModule } from '@dev/nestjs-common';

import { UserModule } from 'src/entities/user/user.module';
import { CacheModule } from 'src/services/cache/cache.module';
import { PrometheusController } from 'src/prom.controller';
import { PreviewModule } from 'src/services/preview/preview.module';
import { AuthModule } from 'src/entities/auth/auth.module';
import { EventsModule } from 'src/services/socket/events.module';
import { ApolloKeyValueCacheAdapter } from 'src/services/cache/kv.adapter';
import { config } from 'src/config';
import { graphqlHttpPlugin } from 'src/utils/graphqlConfig';
import { PromInterceptor } from 'src/prom.interceptor';
import { EthersModule } from 'src/services/ethers/ethers.module';
import { ScoringModule } from 'src/entities/scoring/scoring.module';
import { AppController } from './app.controller';
import { RequestLoggerInterceptor } from './interceptors/requestLogger.interceptor';
import { AsyncContextMiddleware } from './middleware/asyncContext.middleware';
import { EmailVerificationModule } from './services/emailVerification/emailVerification.module';
import { EmailSettingsModule } from './entities/emailSettings/emailSettings.module';
import { TransactionMetricsModule } from './services/transacton-metrics/transaction-metrics.module';
import { BabyRobotModule } from './entities/babyRobot/babyRobot.module';
import { BabyRobotsPreviewModule } from './services/babyRobotsPreview/babyRobotsPreview.module';
import { BabyRobotGraphModule } from './services/babyRobotGraph/BabyRobotGraph.module';
import { UserCodesModule } from './entities/userCodes/userCodes.module';
import { ActiveInvitationsModule } from './entities/activeInvitations/activeInvitations.module';
import { UserClicksStatisticsModule } from './entities/userClicksStatistic/userClicksStatistic.module';
import { CustomItemModule } from './entities/robotCustomItem/customItem.module';

const labelNames = ['method', 'uri', 'code', 'class', 'handler'];

const valuesToInitialize: Record<string, string | number> = {};

const DOMAIN_MODULES = [
	AuthModule,
	CacheModule,
	EmailSettingsModule,
	EmailVerificationModule,
	PreviewModule,
	UserModule,
	BabyRobotModule,
	BabyRobotsPreviewModule,
	ScoringModule,
	BabyRobotGraphModule,
	UserCodesModule,
	ActiveInvitationsModule,
	UserClicksStatisticsModule,
	CustomItemModule
];

@Module({
	controllers: [AppController],
	providers: [
		makeCounterProvider({
			labelNames,
			name: 'http_requests_total',
			help: 'Total number of HTTP requests'
		}),
		makeHistogramProvider({
			labelNames,
			name: 'http_server_requests_seconds',
			help: 'Duration of HTTP requests in seconds',
			buckets: exponentialBuckets(0.05, 1.3, 20)
		}),
		makeSummaryProvider({
			labelNames,
			name: 'http_request_size_bytes',
			help: 'Duration of HTTP requests size in bytes'
		}),
		makeSummaryProvider({
			labelNames,
			name: 'http_response_size_bytes',
			help: 'Duration of HTTP response size in bytes'
		}),
		{
			provide: APP_INTERCEPTOR,
			useClass: RequestLoggerInterceptor
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: PromInterceptor
		}
	],
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [() => config]
		}),
		PrometheusModule.register({
			controller: PrometheusController,
			defaultMetrics: { enabled: false, config: {} }
		}),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			inject: [ApolloKeyValueCacheAdapter, ConfigService],
			useFactory: async (cacheAdapter: ApolloKeyValueCacheAdapter, configService: ConfigService) => ({
				// TODO: workaround: prod server env doesn't have permissions to read files from server
				autoSchemaFile: configService.get<boolean>('env.isDev') ? 'schema.gql' : true,
				// schema: await buildSchema(graphqlConfig),
				buildSchemaOptions: {
					dateScalarMode: 'isoDate'
				},
				path: '/graphql',
				playground: false,
				cors: false,
				introspection: true, // Same as previous config, but it's recommended to turn off introspection
				validationRules: [depthLimit(10)], // https://www.apollographql.com/blog/securing-your-graphql-api-from-malicious-queries-16130a324a6b/
				dataSources: () => ({}),
				context: (ctx) => {
					ctx.covalentApiKey = config.covalent.apiKey;
					return ctx;
				},
				cache: cacheAdapter,
				plugins: [
					graphqlHttpPlugin,
					createPrometheusExporterPlugin({ metricsEndpoint: false }),
					configService.get<string>('appEnv') !== 'prod'
						? ApolloServerPluginLandingPageGraphQLPlayground()
						: ApolloServerPluginLandingPageDisabled()
				]
			})
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
						client.on('error', (err) => logger.error(new Error('RedisContext: Redis Client Error' + err)));

						const keys = Object.keys(valuesToInitialize);
						await Promise.all(
							keys.map(async (key) => {
								const value = await client.get(key);
								if (value === null) {
									const valueToInitialize = String(valuesToInitialize[key]);
									await client.set(key, valueToInitialize);
								}
							})
						);
					}
				},
				readyLog: true
			})
		}),
		TracerModule,
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const mode = configService.get<string>('env.nodeEnv');
				const level = configService.get<string>('log.level');

				return { pretty: mode !== 'production', level };
			},
			inject: [ConfigService]
		}),
		...DOMAIN_MODULES,
		EthersModule,
		EventsModule,
		TransactionMetricsModule
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AsyncContextMiddleware).forRoutes('*');
	}
}
