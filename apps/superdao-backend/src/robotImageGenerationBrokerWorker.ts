import { CustomLogger } from '@dev/nestjs-common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { initUnleash } from 'src/services/featureToggles';
import { RobotImageGenerationBrokerWorkerModule } from './services/robotImageGenerationBrokerWorker/robotImageGenerationBrokerWorker.module';

(async () => {
	await initUnleash();

	const app = await NestFactory.create(RobotImageGenerationBrokerWorkerModule, { bufferLogs: true });
	app.enableShutdownHooks(['SIGINT', 'SIGTERM']);

	const logger = app.get(CustomLogger);

	app.useLogger(logger);

	const configService = app.get(ConfigService);

	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [
				`amqp://${configService.get('rabbitMq.username')}:${configService.get('rabbitMq.password')}@${configService.get(
					'rabbitMq.hostname'
				)}:${configService.get('rabbitMq.port')}/${configService.get('rabbitMq.vhost')}`
			],
			queue: 'robot-image-generation',
			queueOptions: {
				durable: true,
				'x-consumer-timeout': 60000,
				'consumer-timeout': 60000,
				consumer_timeout: 60000,
				consumerTimeout: 60000
			},
			headers: { ['x-consumer-timeout']: '60000' },
			noAck: false,
			prefetchCount: 1
		}
	});

	await app.startAllMicroservices();

	logger.log('Robot image generation broker worker is ready');
})();
