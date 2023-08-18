import { Injectable } from '@nestjs/common';

import { CustomLogger } from '@dev/nestjs-common';

import sharp from 'sharp';
import sha256 from 'sha256';
import axios from 'axios';
import { RobotImageGenerationEntry } from './robotImageGenerationBrokerWorker.types';
import { featureToggles } from '../featureToggles';
import { BabyRobotService } from 'src/entities/babyRobot/babyRobot.service';
import {
	BABY_ROBOTS_BUCKET_BASE_URL,
	BABY_ROBOTS_V2_FOLDER,
	BabyRobotsPreviewGenerator
} from '../babyRobotsPreview/babyRobotsPreview.generator';
import { ForbiddenError } from 'src/exceptions';
import { getCurrentPartsVersion } from '@sd/superdao-shared';

@Injectable()
export class RobotImageGenerationBrokerWorkerService {
	constructor(
		private readonly babyRobotService: BabyRobotService,
		private readonly babyRobotsPreviewGenerator: BabyRobotsPreviewGenerator,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(RobotImageGenerationBrokerWorkerService.name);
	}

	robotParts: Record<string, Buffer> = {};

	// TODO: clear entry type from unneccessary fields
	async generateImage(entry: RobotImageGenerationEntry) {
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

			const saved = await this.babyRobotService.saveImageInStorage(currentImageNameSha, await targetImage.toBuffer());

			if (!saved) {
				throw new ForbiddenError(`Cannot save asset to gcs: ${entry.walletAddress} - ${currentImageNameSha}`);
			}

			this.logger.log('image generation and saving finished', { currentImageNameSha, ...entry });
		}

		this.logger.log('robot image generation for broker entry finished successfully');
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
}
