import { Injectable } from '@nestjs/common';
import sha256 from 'sha256';
import { ScoringAudienceItem } from 'src/entities/babyRobot/babyRobot.dto';
import { BabyRobotRepository } from 'src/entities/babyRobot/babyRobot.repo';
import { BabyRobotUserChoice } from 'src/entities/babyRobot/babyRobotUserChoice.model';
import {
	getCurrentPartsConfig,
	getCurrentPartsVersion,
	getRandomIntFromInterval,
	PROPERTY_LAYERS,
	RANDOM_LAYERS,
	RobotLayer
} from '@sd/superdao-shared';
import { featureToggles } from '../featureToggles';
import { CacheService, getRobotLayersKey } from '../cache';
import { CustomItemService } from 'src/entities/robotCustomItem/customItem.service';

export const BABY_ROBOTS_BUCKET_BASE_URL = 'https://storage.googleapis.com/superdao-robots-assets';
export const BABY_ROBOTS_V2_FOLDER = 'robot-parts';

const MIN_INFLUENCER_FOLLOWERS_COUNT = 1000;

const LENS_ADDRESS = '0xdb46d1dc155634fbc732f92e853b10b288ad5a1d';
// TODO: mirror address from scoring_activity_contracts
const MIRROR_ADDRESS = '0x84162fe2e695fedbf4d3bca1c3458fb616e44735';

@Injectable()
export class BabyRobotsPreviewGenerator {
	constructor(
		private readonly babyRobotsRepository: BabyRobotRepository,
		private readonly customItemService: CustomItemService,
		private readonly cacheService: CacheService
	) {}

	async getBabyRobotRandomPreviewBatch(randomRobotsBatchSize: number) {
		const randomRobotsPreviewCount = 100;
		const randomRobotsMinimalPreviewIndex = 1;

		const accumulator: Record<number, boolean> = {};

		while (Object.keys(accumulator).length < randomRobotsBatchSize) {
			accumulator[getRandomIntFromInterval(randomRobotsMinimalPreviewIndex, randomRobotsPreviewCount)] = true;
		}

		return Object.keys(accumulator);
	}

	// v2
	getV2RandomLayers(wallet: string): Record<RobotLayer, string> {
		const currentVersion = getCurrentPartsVersion(featureToggles.isEnabled('robot_versioning_use_odd_version'));
		const layers: Record<keyof typeof RANDOM_LAYERS, number> = getCurrentPartsConfig(currentVersion);

		const layersNames = Object.keys(layers) as RobotLayer[];

		return layersNames.reduce((acc, layer) => {
			const walletHash =
				(sha256(`${layer}_${wallet}`)
					.split('')
					.map((ch) => ch.charCodeAt(0))
					.reduce((acc, i) => acc + i, 0) %
					layers[layer as keyof typeof layers]) +
				1;

			acc[layer] = String(walletHash);

			return acc;
		}, {} as Record<RobotLayer, string>);
	}

	getV2PropertyLayer(
		scoringAudienceItem: ScoringAudienceItem | null,
		robotFeedbackFormEntry: boolean
	): Partial<Record<keyof typeof PROPERTY_LAYERS, string>> {
		const acc: Partial<Record<keyof typeof PROPERTY_LAYERS, string>> = {};

		if (robotFeedbackFormEntry) {
			acc['FEEDBACK'] = '1';
		}

		if (!scoringAudienceItem) return acc;

		const { twitterFollowersCount, ens, activity, score } = scoringAudienceItem;

		const activityContracts = activity.map((address) => address.toLowerCase());

		if (twitterFollowersCount ?? 0 >= MIN_INFLUENCER_FOLLOWERS_COUNT) acc['TWITTER'] = '1';

		if (ens) acc['ENS'] = '1';

		if (activityContracts.map((address) => address.toLowerCase()).includes(LENS_ADDRESS)) acc['LENS'] = '1';

		if (activityContracts.map((address) => address.toLowerCase()).includes(MIRROR_ADDRESS)) acc['MIRROR'] = '1';

		if (!score) return acc;

		// in math:
		// if (score <= 25) {
		// 	acc['RANK'] = '0';
		// } else if (score > 25 && score <= 50) {
		// 	acc['RANK'] = '1';
		// } else if (score > 50 && score <= 75) {
		// 	acc['RANK'] = '2';
		// } else if (score > 75 && score <= 100) {
		// 	acc['RANK'] = '3';
		// }
		acc['RANK'] = String(Math.floor((score - 1) / 25));

		return acc;
	}

	async getSavedRobotRandomLayersFromDatabase(wallet: string) {
		const cacheKey = getRobotLayersKey(wallet);

		const cachedEntry = await this.cacheService.get(cacheKey);

		if (cachedEntry !== null) {
			return JSON.parse(cachedEntry);
		}

		const savedRandomLayers = await this.babyRobotsRepository.getRobotLayers(wallet);

		if (savedRandomLayers) await this.cacheService.set(cacheKey, JSON.stringify(savedRandomLayers));

		return savedRandomLayers;
	}

	async getSavedUserChoiceLayersFromDatabase(tokenId: string) {
		// TODO: cache and invalidation on save
		const savedRandomLayers = await this.babyRobotsRepository.getUserChoice(tokenId);

		return savedRandomLayers;
	}

	async getV2RandomLayersWithMemory(wallet: string, tokenId?: string | null) {
		const activeCustomTokenItems = tokenId ? await this.customItemService.getActiveCustomTokenItems(tokenId) : [];

		let activeCustomItemsMap = {};

		const enrichCustomItemsMap = (layer: string) => {
			const customElem = activeCustomTokenItems.find((item) => item.customItem.layerType === layer);
			if (customElem) {
				activeCustomItemsMap = { ...activeCustomItemsMap, [layer]: customElem.customItem.layerName.split('_')[1] };
			}
		};

		enrichCustomItemsMap('BG');
		enrichCustomItemsMap('BODY');
		enrichCustomItemsMap('EYES');
		enrichCustomItemsMap('TUBES');
		enrichCustomItemsMap('LEGS');

		const savedUserChoiceLayers: BabyRobotUserChoice | null = tokenId
			? await this.getSavedUserChoiceLayersFromDatabase(tokenId)
			: null;

		const savedRandomLayers = await this.getSavedRobotRandomLayersFromDatabase(wallet);

		const mustHaveRandomLayers = Object.values(RANDOM_LAYERS);

		let accLayers = {
			...savedUserChoiceLayers?.layers,
			...activeCustomItemsMap
		};

		accLayers = Object.values(accLayers).length ? accLayers : savedRandomLayers?.layers ?? {};

		if (
			!savedRandomLayers?.layers ||
			mustHaveRandomLayers.some((mustHaveRandomLayer) => !savedRandomLayers.layers[mustHaveRandomLayer])
		) {
			const cacheKey = getRobotLayersKey(wallet);

			await this.cacheService.del(cacheKey);

			const randomLayersMap = this.getV2RandomLayers(wallet);

			// TODO: if key deleted, accLayers can generate artefact (wrong deprecated key, but this scenario is invalid right now)
			const savingLayers = { ...randomLayersMap, ...accLayers }; // known layers have higher priority

			accLayers = savingLayers;

			await this.babyRobotsRepository.saveRobotLayers(wallet, savingLayers);
		}

		return accLayers;
	}

	async getV2RobotImageName(
		wallet: string,
		scoringAudienceItem: ScoringAudienceItem | null,
		robotFeedbackFormEntry: boolean,
		tokenId?: string | null
	) {
		const randomLayers = await this.getV2RandomLayersWithMemory(wallet, tokenId);

		const propertiesLayer = this.getV2PropertyLayer(scoringAudienceItem, robotFeedbackFormEntry);

		const layers = { ...randomLayers, ...propertiesLayer };

		const sortedLayers = Object.entries(layers).sort(([prevKey], [nextKey]) => {
			return prevKey > nextKey ? 1 : -1;
		});

		const layersNames = [];

		for (let i = 0; i < sortedLayers.length; i++) {
			layersNames.push(sortedLayers[i].join('_'));
		}

		const name = layersNames.join('-');

		return `${getCurrentPartsVersion(featureToggles.isEnabled('robot_versioning_use_odd_version'))}-${name}`;
	}
}
