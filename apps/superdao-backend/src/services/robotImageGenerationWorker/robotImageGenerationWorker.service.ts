import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Redis from 'ioredis';

import { CustomLogger } from '@dev/nestjs-common';

import { ACTIVE_TX_KEY, getBatchSize, SORTED_SET_KEY } from './robotImageGenerationWorker.constants';
import { RobotImageGenerationEntry } from './robotImageGenerationWorker.types';
import { RobotImageGenerationWorkerHelper } from './robotImageGenerationWorker.helper';
import { featureToggles } from '../featureToggles';

@Injectable()
export class RobotImageGenerationWorkerService {
	private lock = false; // to block starting batch minting in session vision

	constructor(
		private readonly robotImageGenerationWorkerHelper: RobotImageGenerationWorkerHelper,
		@InjectRedis() private readonly redis: Redis,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(RobotImageGenerationWorkerService.name);
	}

	async tryGenerateImages() {
		try {
			if (this.lock) {
				this.logger.log('robot image generation iteration cannot be started: thread is locked');
				return;
			}

			this.lock = true;

			const activeTxData = await this.redis.get(ACTIVE_TX_KEY);

			if (!activeTxData) {
				const participantsCount = await this.redis.zcard(SORTED_SET_KEY);

				if (!participantsCount) {
					this.logger.log('robot image generation iteration cannot be started: no participants in pool');

					this.lock = false;

					return;
				}

				this.logger.log('robot image generation iteration must be started');

				this.batchGenerate() // fire and forget
					.catch((e) => {
						this.logger.error(new Error('robot image generation attempt error'), { e });
					})
					.finally(() => (this.lock = false));

				return;
			}

			const participants: RobotImageGenerationEntry[] = JSON.parse(activeTxData);

			const result = await this.robotImageGenerationWorkerHelper.processBatchGeneration(participants);
			if (!result) {
				this.lock = false;

				return;
			}

			this.lock = false;

			await this.redis.del(ACTIVE_TX_KEY);
		} catch (e) {
			this.lock = false;

			this.logger.error(new Error('robot image generation attempt error'), { e });

			return;
		}
	}

	async batchGenerate() {
		const batchTimestamp = Date.now();

		let parsedParticipants: RobotImageGenerationEntry[] = [];

		try {
			const participants = await this.redis.zpopmin(SORTED_SET_KEY, getBatchSize()); // here will be [RobotImageGenerationEntry, number][] ([{}, 1679647335799, {}, 1679647335799]) because zpopmin return sort values

			parsedParticipants = participants
				.map((participant) => JSON.parse(participant))
				.filter((participant) => !!participant.imageNameSha); // so we need to filter only RobotImageGenerationEntry

			await this.redis.set(ACTIVE_TX_KEY, JSON.stringify(parsedParticipants));

			await this.robotImageGenerationWorkerHelper.processBatchGeneration(parsedParticipants);
		} catch (e) {
			this.logger.error(new Error('Error while batch robot image generating'), {
				parsedParticipants,
				batchTimestamp,
				e
			});

			await this.robotImageGenerationWorkerHelper.returnParticipantsToPool(parsedParticipants);
		} finally {
			await this.redis.del(ACTIVE_TX_KEY);
		}
	}

	@Cron(CronExpression.EVERY_5_SECONDS)
	async cronTryBatchMint() {
		if (!featureToggles.isEnabled('robot_image_generation_mint_worker')) return;

		await this.tryGenerateImages();
	}
}
