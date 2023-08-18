import 'reflect-metadata'; // required by typegraphql
import { ConfigService } from '@nestjs/config';
import session from 'cookie-session';
import { NestFactory } from '@nestjs/core';
import http from 'http';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { CustomLogger } from '@dev/nestjs-common';
import { initUnleash } from 'src/services/featureToggles';
import { config } from 'src/config';
import { RedisIoAdapter } from 'src/services/socket/redis-io.adapter';
import { AppModule } from 'src/app.module';
import { getKafkaOptions } from 'src/services/kafka/getKafkaOptions';

async function bootstrap() {
	await initUnleash();

	const server = express();
	const adapter = new ExpressAdapter(server);

	const logger = new CustomLogger('App', config.env.nodeEnv !== 'production');
	logger.level = config.log.level;

	const app = await NestFactory.create(AppModule, adapter, { bufferLogs: true, logger });

	app.use(
		session({
			keys: [config.keys.session],
			maxAge: config.session.maxAge
		})
	);
	app.enableCors({
		credentials: true,
		origin: [
			'http://localhost:8000',
			'http://localhost:3000',
			'https://superdemo.vercel.app',
			'https://creator.optic.xyz',
			'https://www.joinfire.xyz',
			'https://joinfire.xyz'
		]
	});
	app.enableShutdownHooks(['SIGINT', 'SIGTERM']);

	const redisIoAdapter = new RedisIoAdapter(app);
	await redisIoAdapter.connectToRedis();
	app.useWebSocketAdapter(redisIoAdapter);

	const configService = app.get(ConfigService);

	const kafkaOptions = getKafkaOptions(configService);
	app.connectMicroservice(kafkaOptions);

	await app.startAllMicroservices();

	await app.listen(configService.get<number>('app.port')!);

	logger.log(`Server on http://localhost:${configService.get<number>('app.port')}`);

	if (config.env.isProd) {
		http.createServer(server).listen(configService.get<number>('metrics.port')!);
		logger.log(`Metrics on http://localhost:${configService.get<number>('metrics.port')}`);
	}
}

bootstrap();
