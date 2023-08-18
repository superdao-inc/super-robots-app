import { Module } from '@nestjs/common';
import { PreviewService } from 'src/services/preview/preview.service';
import { PreviewApi } from './preview.api';
import { ExternalApiConnector } from '../externalConnector/externalApiConnector.helper';

@Module({
	providers: [
		PreviewService,
		PreviewApi,
		{
			provide: 'PreviewConnector',
			useValue: new ExternalApiConnector({ connectorName: 'PreviewConnector' })
		}
	],
	exports: [PreviewService]
})
export class PreviewModule {}
