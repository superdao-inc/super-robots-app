import { Injectable } from '@nestjs/common';
import { BrokenCircuitError } from 'cockatiel';

import { CustomLogger } from '@dev/nestjs-common';

import { GENERATING_ERROR } from './constants';
import { PreviewApi } from './preview.api';

@Injectable()
export class PreviewService {
	constructor(private readonly previewApi: PreviewApi, private logger: CustomLogger) {
		this.logger = logger.createScope(PreviewService.name);
	}

	async generateRobotPreview(imageNameSha: string | undefined) {
		const params: any = {
			imageNameSha
		};

		let jobResponse;
		try {
			jobResponse = await this.previewApi.registerRobotPreview(params);
		} catch (e) {
			this.logger.error(new Error('[preview generation] error while getting image buffer response'), { e, params });

			// circuit and retry errors can be handled like this
			if (e instanceof BrokenCircuitError) {
				throw new Error('service unavailable');
			} else {
				throw new Error(GENERATING_ERROR);
			}
		}

		if (!jobResponse.data) {
			this.logger.error(new Error(`[preview generation] error while getting job response`), { params });
			throw new Error(GENERATING_ERROR);
		}

		this.logger.log(`Registered preview job with params`, { params, jobResponse: jobResponse.data });

		try {
			const imageResponse = await this.previewApi.getImage(jobResponse.data.imageHashSum);

			return imageResponse.data;
		} catch (e) {
			this.logger.error(new Error(`[preview generation] error while getting image buffer response`), {
				params,
				jobResponse: jobResponse.data,
				retryError: false,
				e
			});
		}

		throw new Error(GENERATING_ERROR);
	}
}
