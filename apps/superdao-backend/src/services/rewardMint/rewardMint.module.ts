import { Module } from '@nestjs/common';

import { RewardMintService } from './rewardMint.service';

@Module({
	providers: [RewardMintService],
	exports: [RewardMintService]
})
export class RewardMintModule {}
