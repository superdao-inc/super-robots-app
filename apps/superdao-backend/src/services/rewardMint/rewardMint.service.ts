import { CustomLogger } from '@dev/nestjs-common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { config } from 'src/config';

const SORTED_SET_KEY = config.rewardMint.REWARD_MINT_SORTED_SET_KEY;

@Injectable()
export class RewardMintService {
	constructor(@InjectRedis() private readonly redis: Redis, private logger: CustomLogger) {
		this.logger = logger.createScope(RewardMintService.name);
	}

	async registerRewardMint(queueItem: any) {
		await this.redis.zadd(SORTED_SET_KEY, Date.now(), JSON.stringify(queueItem)); //this will queue reward mint in worker

		this.logger.log('[REWARD MINT] registered new reward entry', { queueItem });
	}

	async registerRobotMint(queueItem: any) {
		await this.redis.zadd(SORTED_SET_KEY, Date.now(), JSON.stringify(queueItem)); //this will queue robot mint in worker

		this.logger.log('[REWARD MINT] registered new robot entry', { queueItem });
	}

	async registerErc721RobotMint(queueItem: {
		imageNameSha: string;
		email: string;
		mintId: string;
		userId: string;
		walletAddress: string;
	}) {
		await this.redis.zadd(
			config.erc721Mint.ERC_721_MINT_SORTED_SET_KEY,
			Date.now(),
			JSON.stringify({ ...queueItem, erc721Address: config.robots.erc721BabyRobotContractAddress })
		); //this will queue erc721 mint in worker

		this.logger.log('[ERC721 MINT] registered new robot entry', { queueItem });
	}
}
