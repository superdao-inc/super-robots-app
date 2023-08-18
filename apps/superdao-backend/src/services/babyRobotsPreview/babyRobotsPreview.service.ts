import { Injectable } from '@nestjs/common';

import { BabyRobotsPreviewGenerator } from './babyRobotsPreview.generator';

@Injectable()
export class BabyRobotsPreviewService {
	constructor(
		private readonly babyRobotsPreviewGenerator: BabyRobotsPreviewGenerator // private readonly scoringService: ScoringApiDataProviderService, // private logger: CustomLogger
	) {
		// this.logger = logger.createScope(BabyRobotsPreviewService.name);
	}

	async getBabyRobotRandomPreviewBatch() {
		const randomRobotsBatchSize = 16;

		return this.babyRobotsPreviewGenerator.getBabyRobotRandomPreviewBatch(randomRobotsBatchSize);
	}

	// TODO: if need /meetyourrobot refactor to using robotImageGenerationWorker.helper
	// async getBabyRobotPreviewV2(params: BabyRobotsPreviewDto) {
	// 	const { walletOrEns, interests } = params;

	// 	const getTimestampData = measure();

	// 	this.logger.log('Got super robot preview entry with params', { walletOrEns, interests });

	// 	const resolvedAddress = await EnsResolver.resolve(walletOrEns);

	// 	this.logger.log('Super robot logging', { type: 'resolveEns', time: getTimestampData() });

	// 	if (!resolvedAddress) return null;

	// 	const walletAddress = resolvedAddress.toLowerCase();

	// 	this.logger.log('Got super robot preview entry parsed params', { walletAddress, interests });

	// 	this.logger.log('Super robot logging', { type: 'getWalletScoringData', time: getTimestampData() });

	// 	const scoringAudienceItem = await this.scoringService.getWalletScoringData(walletAddress);

	// 	this.logger.log('Super robot logging', { type: 'getV2RobotImage', time: getTimestampData() });

	// 	// const robotImage = await this.babyRobotsPreviewGenerator.getV2RobotImage(walletAddress, scoringAudienceItem);

	// 	this.logger.log('Got super robot preview entry scoring audience item', {
	// 		scoringAudienceItem,
	// 		time: getTimestampData()
	// 	});

	// 	const base64TargetImage = `data:image/png;base64,${(await robotImage.targetImage.toBuffer()).toString('base64')}`;

	// 	return { ...robotImage, targetImage: base64TargetImage, scoringAudienceItem };
	// }
}
