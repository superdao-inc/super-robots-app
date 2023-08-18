import { CustomLogger } from '@dev/nestjs-common';
import { NestFactory } from '@nestjs/core';
import { initUnleash } from 'src/services/featureToggles';
import { Erc721MintWorkerModule } from './services/erc721MintWorker/erc721MintWorker.module';

(async () => {
	await initUnleash();

	const app = await NestFactory.createApplicationContext(Erc721MintWorkerModule, { bufferLogs: true });
	app.enableShutdownHooks(['SIGINT', 'SIGTERM']);

	const logger = app.get(CustomLogger);

	app.useLogger(logger);

	logger.log('Erc721 mint cron worker is ready');
})();
