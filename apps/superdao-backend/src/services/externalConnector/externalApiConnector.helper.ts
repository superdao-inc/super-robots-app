import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { ConsecutiveBreaker, ExponentialBackoff, handleWhen } from 'cockatiel';
import defaults from 'lodash/defaults';

import type { IRequestAmbassadorOptions } from './externalConnector.helper';

import { ExternalConnector } from './externalConnector.helper';

const defaultOptions: Required<IRequestAmbassadorOptions> = {
	connectorName: 'defaultApiConnector',

	//handleWhenResult(res => res.statusCode === 503).orWhenResult(res => res.statusCode === 429);
	handler: handleWhen((err) => err instanceof AxiosError),

	maxRetryAttempts: 3,
	retryBackoff: new ExponentialBackoff(),

	circuitHalfOpenAfter: 30 * 1000,
	circuitBreaker: new ConsecutiveBreaker(20) // 1 request + 3 retries = 4 attempts per cycle
};

@Injectable()
export class ExternalApiConnector extends ExternalConnector {
	constructor(options: IRequestAmbassadorOptions) {
		super(defaults(options, defaultOptions));
	}
}
