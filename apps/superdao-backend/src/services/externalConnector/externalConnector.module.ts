import { Module } from '@nestjs/common';
import { ExternalConnector } from './externalConnector.helper';
import { ExternalApiConnector } from './externalApiConnector.helper';

@Module({
	imports: [],
	providers: [ExternalConnector, ExternalApiConnector],
	exports: [ExternalConnector, ExternalApiConnector]
})
export class ExternalConnectorModule {}
