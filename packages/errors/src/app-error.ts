import pick from 'lodash/pick';
import merge from 'lodash/merge';
import { PartialDeep } from 'type-fest';
import { type ScopeContext, type SeverityLevel } from '@sentry/types';
import { captureException } from '@sentry/nextjs';
import { removeStackFromMetamask } from './metamask';

type Payload = Partial<ScopeContext> &
	Partial<{
		level: SeverityLevel;
		tags: {
			team?: 'CORE' | 'NFT' | 'TREASURY';
			section?:
				| 'Auth'
				| 'Dao'
				| 'User'
				| 'Voting'
				| 'Feed'
				| 'DaoPass'
				| 'ClaimLink'
				| 'ReferralClaim'
				| 'Transactions'
				| 'Burn'
				| 'Members'
				| 'Broker'
				| 'Airdrop'
				| 'Whitelist'
				| 'Ipfs'
				| 'Cache'
				| 'NftAdmin'
				| 'BuyNft'
				| 'Fee';
		};
	}>;

type Params = Pick<AppError, 'display' | 'payload' | 'options'>;
type PartialParams = PartialDeep<Params>;

export class AppError extends Error {
	/**
	 * Helper for throwing assert-style AppError errors.
	 *
	 * AppError.assert(smthIsTrue, 'Oops!')
	 */
	static assert(condition: any, msg: string, params?: PartialParams): asserts condition {
		if (!condition) {
			const appError = new AppError(msg, params);

			// Remove the current method from the stacktrace so that mapping to Sentry sorts works better
			if (appError.stack) {
				const lines = appError.stack.split('\n');
				appError.stack = [lines[0], ...lines.slice(2)].join('\n');
			}

			throw appError;
		}
	}

	/**
	 * Error reporting in Sentry and notification display.
	 */
	static capture(subj: unknown, params: PartialParams = {}): AppError | null {
		const errCtx = removeStackFromMetamask(typeof subj === 'string' ? JSON.parse(subj) : subj);

		if (errCtx === null) return null;

		const appError = new AppError(errCtx);

		appError.setOptions(params);
		appError.eventId = captureException(appError, appError.payload);

		if (!appError.options.silent) {
			if (appError.display) appError.display(appError);
			else this.display?.(appError);
		}

		return appError;
	}

	/**
	 * Default logic for displaying notifications for all errors.
	 */
	static display(appError: AppError): void {
		if (process.env.NODE_ENV === 'development') {
			console.log('🌋 AppError...');
			console.dir(appError);
		}
	}

	/**
	 * Notification display logic for a specific error.
	 */
	display?: typeof AppError.display;

	/**
	 * The moment the error was created
	 */
	date: Date;

	/**
	 * The original error object (when AppError is used as a wrapper)
	 */
	originalError: Error | undefined;

	/** Sentry event params */
	payload: Payload;

	options: {
		/** Do not show notification */
		silent?: boolean;

		/** Description of the error for the user */
		description?: string;
	};

	/** Sentry event id */
	eventId?: string;

	constructor(subj: string | Error, params: PartialParams = {}) {
		const isErrorSubj = subj instanceof Error;

		super(isErrorSubj ? subj.message : subj);

		if (isErrorSubj) {
			this.originalError = subj;
			this.stack = subj.stack;
		}

		this.date = new Date();

		const { payload, display, options } = merge<Params, PartialParams>(
			{
				payload: {
					level: 'error',
					tags: {
						handled_by: 'APP_ERROR'
					}
				},
				options: {
					silent: false,
					description: this.message
				}
			},
			params
		);

		this.payload = payload;
		this.display = display;
		this.options = options;
	}

	setOptions(params: PartialParams = {}): void {
		merge(this, pick(params, ['display', 'payload', 'options']));
	}
}
