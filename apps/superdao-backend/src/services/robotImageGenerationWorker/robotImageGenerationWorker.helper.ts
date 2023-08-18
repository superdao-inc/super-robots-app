import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { CustomLogger } from '@dev/nestjs-common';
import axios from 'axios';
import sharp from 'sharp';
import sha256 from 'sha256';
import { RobotImageGenerationEntry } from './robotImageGenerationWorker.types';
import { ACTIVE_TX_KEY, SORTED_SET_KEY } from './robotImageGenerationWorker.constants';
import { BabyRobotService } from 'src/entities/babyRobot/babyRobot.service';
import {
	BabyRobotsPreviewGenerator,
	BABY_ROBOTS_BUCKET_BASE_URL,
	BABY_ROBOTS_V2_FOLDER
} from '../babyRobotsPreview/babyRobotsPreview.generator';
import { ForbiddenError } from 'src/exceptions';
import { RewardMintService } from '../rewardMint/rewardMint.service';
import { getCurrentPartsVersion } from '@sd/superdao-shared';
import { featureToggles } from '../featureToggles';

@Injectable()
export class RobotImageGenerationWorkerHelper {
	constructor(
		private readonly babyRobotService: BabyRobotService,
		private readonly babyRobotsPreviewGenerator: BabyRobotsPreviewGenerator,
		private readonly rewardMintService: RewardMintService,
		@InjectRedis() private readonly redis: Redis,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(RobotImageGenerationWorkerHelper.name);
	}

	robotParts: Record<string, Buffer> = {};

	async processBatchGeneration(entries: RobotImageGenerationEntry[]) {
		try {
			await Promise.all(
				entries.map(async (entry) => {
					const currentImageName = await this.babyRobotsPreviewGenerator.getV2RobotImageName(
						entry.walletAddress,
						entry.scoringAudienceItem,
						entry.feedbackLayer,
						entry.tokenId
					);

					const currentImageNameSha = sha256(currentImageName);

					const isImageInStorage = await this.babyRobotService.isImageInStorage(currentImageNameSha);

					if (!isImageInStorage) {
						// TODO: can parse currentImageName here for getting layers
						const randomLayers = await this.babyRobotsPreviewGenerator.getV2RandomLayersWithMemory(
							entry.walletAddress,
							entry.tokenId
						);

						const propertiesLayer = this.babyRobotsPreviewGenerator.getV2PropertyLayer(
							entry.scoringAudienceItem,
							entry.feedbackLayer
						);

						const layers = { ...randomLayers, ...propertiesLayer };

						const targetImage = await this.createTargetImage(layers);

						const saved = await this.babyRobotService.saveImageInStorage(
							currentImageNameSha,
							await targetImage.toBuffer()
						);

						if (!saved) {
							throw new ForbiddenError(`Cannot save asset to gcs: ${entry.walletAddress} - ${currentImageNameSha}`);
						}

						this.logger.log('image generation and saving finished', { currentImageNameSha, ...entry });
					}

					if (entry.withTokenUpdate && entry.tokenId && entry.userId) {
						this.logger.log('entry must be updated', entry);

						await this.babyRobotService.registerTokenUpdate({
							tokenId: entry.tokenId,
							userId: entry.userId
						});

						this.logger.log('entry mint updated', entry);
					}

					if (entry.withMint && entry.mintId && entry.userId) {
						this.logger.log('entry must be minted', entry);

						await this.babyRobotService.mintRobotAfterGenerating(entry.mintId, entry.userId, currentImageNameSha);

						await this.rewardMintService.registerErc721RobotMint({
							mintId: entry.mintId,
							imageNameSha: currentImageNameSha,
							userId: entry.userId,
							walletAddress: entry.walletAddress,
							email: entry.email ?? ''
						});

						this.logger.log('entry mint registered', entry);
					}
				})
			);

			this.logger.log('robot image generation for batch entries finished successfully');
		} catch (e) {
			this.logger.error(new Error(`Error while processing batch robot images generation: ${(e as any).message}`), {
				e
			});

			await this.returnParticipantsToPool(entries);

			await this.redis.del(ACTIVE_TX_KEY);

			return false;
		}

		return true;
	}

	async createTargetImage(layersAccumulator: Record<string, string>) {
		const images = await Promise.all(
			Object.entries(layersAccumulator).map(async ([layerName, layerValue]) => {
				const partName = `${layerName}_${layerValue}`;

				let image;

				if (!this.robotParts[partName]) {
					image = (
						await axios({
							url: `${BABY_ROBOTS_BUCKET_BASE_URL}/${BABY_ROBOTS_V2_FOLDER}/${getCurrentPartsVersion(
								featureToggles.isEnabled('robot_versioning_use_odd_version')
							)}/${partName}.png`,
							responseType: 'arraybuffer'
						})
					).data;

					this.robotParts[partName] = image;
				} else {
					image = this.robotParts[partName];
				}

				return { image, layerName };
			})
		);

		const layersSortValue = { BG: 1, LEGS: 2, BODY: 3, HEAD: 4, EYES: 5, TUBES: 6, OTHER: 7 };

		const sortedImages = images.sort((prevImageData, nextImageData) => {
			const prevValue = layersSortValue[prevImageData.layerName as keyof typeof layersSortValue]
				? layersSortValue[prevImageData.layerName as keyof typeof layersSortValue]
				: layersSortValue.OTHER;

			const nextValue = layersSortValue[nextImageData.layerName as keyof typeof layersSortValue]
				? layersSortValue[nextImageData.layerName as keyof typeof layersSortValue]
				: layersSortValue.OTHER;

			return prevValue - nextValue;
		});

		let resultImage = sharp(sortedImages[0].image).composite(
			sortedImages.slice(1).map((entry) => ({ input: entry.image, top: 0, left: 0 }))
		);

		return resultImage;
	}

	async returnParticipantsToPool(participants: RobotImageGenerationEntry[]) {
		const scoreValuePairs = participants.reduce((acc, participant) => {
			acc.push(0);
			acc.push(JSON.stringify(participant));

			return acc;
		}, [] as any[]);

		await this.redis.zadd(SORTED_SET_KEY, ...scoreValuePairs);
	}
}
