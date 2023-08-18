import { CustomLogger } from '@dev/nestjs-common';
import { NestFactory } from '@nestjs/core';
import { initUnleash } from 'src/services/featureToggles';
import { TokenUpdateWorkerModule } from './services/tokenUpdateWorker/tokenUpdateWorker.module';

(async () => {
	await initUnleash();

	const app = await NestFactory.createApplicationContext(TokenUpdateWorkerModule, { bufferLogs: true });
	app.enableShutdownHooks(['SIGINT', 'SIGTERM']);

	const logger = app.get(CustomLogger);

	app.useLogger(logger);

	logger.log('Token update worker is ready');
})();
