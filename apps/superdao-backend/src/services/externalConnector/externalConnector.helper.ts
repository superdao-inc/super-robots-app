import { Injectable } from '@nestjs/common';
import {
	ConsecutiveBreaker,
	ExponentialBackoff,
	RetryPolicy,
	IMergedPolicy,
	IBreaker,
	IBackoffFactory,
	IRetryBackoffContext,
	handleAll,
	wrap,
	retry,
	circuitBreaker,
	CircuitBreakerPolicy,
	Policy,
	NoopPolicy
} from 'cockatiel';
import defaults from 'lodash/defaults';
import { log } from 'src/utils/logger';

export interface IRequestAmbassadorOptions {
	connectorName?: string;

	handler?: Policy;

	maxRetryAttempts?: number;
	retryBackoff?: IBackoffFactory<IRetryBackoffContext<unknown>>;

	circuitHalfOpenAfter?: number;
	circuitBreaker?: IBreaker;
}

const defaultOptions: Required<IRequestAmbassadorOptions> = {
	connectorName: 'defaultConnector',

	handler: handleAll,

	maxRetryAttempts: 3,
	retryBackoff: new ExponentialBackoff(),

	circuitHalfOpenAfter: 30 * 1000,
	circuitBreaker: new ConsecutiveBreaker(20) // 1 request + 3 retries = 4 attempts per cycle
};

@Injectable()
export class ExternalConnector {
	private logger;

	private connectorName: string;

	private retry: RetryPolicy;
	private circuitBreaker: CircuitBreakerPolicy;
	private retryWithBreaker: IMergedPolicy<any, any, any>;

	constructor(options: IRequestAmbassadorOptions) {
		const providedOptions = defaults(options, defaultOptions);

		this.connectorName = providedOptions.connectorName;

		this.logger = log.createScope(ExternalConnector.name);

		this.retry = retry(providedOptions.handler, {
			maxAttempts: providedOptions.maxRetryAttempts,
			backoff: providedOptions.retryBackoff
		});

		this.circuitBreaker = circuitBreaker(providedOptions.handler, {
			halfOpenAfter: providedOptions.circuitHalfOpenAfter,
			breaker: providedOptions.circuitBreaker
		});

		this.initListeners();

		this.retryWithBreaker = wrap(this.retry, this.circuitBreaker);
	}

	private initListeners() {
		this.initRetryListeners();
		this.initCircuitBreakerListeners();
	}

	private initRetryListeners() {
		this.retry.onFailure((error) =>
			this.logger.error(new Error('[External Connector retry] failed with options'), {
				handled: error.handled,
				duration: error.duration,
				reason: error.reason,
				connectorName: this.connectorName
			})
		);

		this.retry.onRetry((reason) =>
			this.logger.error(new Error('[External Connector retry] retry with options'), {
				reason,
				connectorName: this.connectorName
			})
		);

		this.retry.onGiveUp((reason) =>
			this.logger.error(new Error('[External Connector retry] give up with options'), {
				reason,
				connectorName: this.connectorName
			})
		);

		this.retry.onSuccess(({ duration }) =>
			this.logger.log(`[External Connector retry] success with options`, {
				duration,
				connectorName: this.connectorName
			})
		);
	}

	private initCircuitBreakerListeners() {
		this.circuitBreaker.onFailure((error) =>
			this.logger.error(new Error('[External Connector circuit breaker] failed with options'), {
				handled: error.handled,
				duration: error.duration,
				reason: error.reason,
				connectorName: this.connectorName
			})
		);

		this.circuitBreaker.onBreak((error) =>
			this.logger.error(new Error('[External Connector circuit breaker] break (open) with options'), {
				error,
				connectorName: this.connectorName
			})
		);

		this.circuitBreaker.onReset(() =>
			this.logger.log('[External Connector circuit breaker] reset (close)', { connectorName: this.connectorName })
		);

		this.circuitBreaker.onHalfOpen(() =>
			this.logger.log('[External Connector circuit breaker] half open', { connectorName: this.connectorName })
		);

		this.circuitBreaker.onSuccess(({ duration }) =>
			this.logger.log(`[External Connector circuit breaker] success with options`, {
				duration,
				connectorName: this.connectorName
			})
		);
	}

	//use .withRetryPolicy(noop) for POST requests that should not be retried
	withRetryPolicy(retry: RetryPolicy | NoopPolicy) {
		return wrap(retry, this.circuitBreaker);
	}

	execute(fn: (context: any) => unknown, signal?: AbortSignal | undefined) {
		return this.retryWithBreaker.execute(fn, signal);
	}
}
