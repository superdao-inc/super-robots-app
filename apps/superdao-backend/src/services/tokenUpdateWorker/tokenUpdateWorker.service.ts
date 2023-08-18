import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Redis from 'ioredis';

import { CustomLogger } from '@dev/nestjs-common';

import { getBatchSize, SORTED_SET_KEY } from './tokenUpdateWorker.constants';
import { TokenUpdateWorkerHelper } from './tokenUpdateWorker.helper';
import { TokenUpdateEntry } from './tokenUpdateWorker.types';
import { featureToggles } from '../featureToggles';

@Injectable()
export class TokenUpdateWorkerService {
	private lock = false; // to block starting batch minting in session vision

	constructor(
		private readonly tokenUpdateWorkerHelper: TokenUpdateWorkerHelper,
		@InjectRedis() private readonly redis: Redis,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(TokenUpdateWorkerService.name);
	}

	async tryUpdateTokens() {
		try {
			if (this.lock) {
				this.logger.log('token update iteration cannot be started: thread is locked');
				return;
			}

			this.lock = true;

			const participantsCount = await this.redis.zcard(SORTED_SET_KEY);

			if (!participantsCount) {
				this.logger.log('token update iteration cannot be started: no participants in pool');

				this.lock = false;

				return;
			}

			this.logger.log('token update iteration must be started');

			this.batchUpdateTokens() // fire and forget
				.catch((e) => {
					this.logger.error(new Error('token update attempt error'), { e });
				})
				.finally(() => (this.lock = false));

			return;
		} catch (e) {
			this.lock = false;

			this.logger.error(new Error('token update attempt error'), { e });

			return;
		}
	}

	async batchUpdateTokens() {
		const batchTimestamp = Date.now();

		let parsedParticipants: TokenUpdateEntry[] = [];

		const batchSize = getBatchSize();

		try {
			const participants = await this.redis.zrange(SORTED_SET_KEY, 0, batchSize);

			parsedParticipants = participants
				.map((participant) => JSON.parse(participant))
				.filter((participant) => !!participant.tokenId);

			await this.tokenUpdateWorkerHelper.processBatchTokenUpdate(parsedParticipants, batchSize);
		} catch (e) {
			this.logger.error(new Error('Error while batch robot image generating'), {
				parsedParticipants,
				batchTimestamp,
				e
			});
		}
	}

	@Cron(CronExpression.EVERY_5_SECONDS)
	async cronTryUpdateTokens() {
		if (!featureToggles.isEnabled('robot_token_update_worker')) return;

		await this.tryUpdateTokens();
	}
}
