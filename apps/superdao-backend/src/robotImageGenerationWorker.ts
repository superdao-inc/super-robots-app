import { CustomLogger } from '@dev/nestjs-common';
import { NestFactory } from '@nestjs/core';
import { initUnleash } from 'src/services/featureToggles';
import { RobotImageGenerationWorkerModule } from './services/robotImageGenerationWorker/robotImageGenerationWorker.module';

(async () => {
	await initUnleash();

	const app = await NestFactory.createApplicationContext(RobotImageGenerationWorkerModule, { bufferLogs: true });
	app.enableShutdownHooks(['SIGINT', 'SIGTERM']);

	const logger = app.get(CustomLogger);

	app.useLogger(logger);

	logger.log('Robot image generation cron worker is ready');
})();
