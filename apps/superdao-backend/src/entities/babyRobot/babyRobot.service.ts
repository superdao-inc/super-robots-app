import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

import { CustomLogger } from '@dev/nestjs-common';
import sha256 from 'sha256';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { ForbiddenError, NotFoundError } from 'src/exceptions';
import { config } from 'src/config';
import { BabyRobotsPreviewGenerator } from 'src/services/babyRobotsPreview/babyRobotsPreview.generator';
import { getBase64EncodedJSON } from 'src/utils/base64';
import { RewardMintService } from 'src/services/rewardMint/rewardMint.service';
import {
	CacheService,
	getBabyRobotMintByTokenIdKey,
	getRobotMintIpDataKey,
	getUpdateRobotLayersKey
} from 'src/services/cache';
import {
	BabyRobotMintResponseStatus,
	MintBabyRobotResponse,
	RobotMintAndWaitlistStatus,
	UpdateRobotLayersResponseStatus
} from 'src/entities/babyRobot/babyRobot.types';
import { ScoringApiDataProviderService } from 'src/entities/scoring/scoring.service';
import { Erc721MintFinilizeData, Erc721MintStartData } from 'src/services/erc721MintWorker/erc721MintWorker.types';
import {
	bgNames,
	eyesNames,
	getBodyLayerTraits,
	getLegsLayerTraits,
	getPropertiesTraits,
	tubesNames
} from 'src/entities/babyRobot/robotAttributes';
import { RobotImageGenerationEntry } from 'src/services/robotImageGenerationWorker/robotImageGenerationWorker.types';
import { BabyRobotGraphService } from 'src/services/babyRobotGraph/BabyRobotGraph.service';
import { TokenUpdateEntry } from 'src/services/tokenUpdateWorker/tokenUpdateWorker.types';
import { featureToggles } from 'src/services/featureToggles';
import { BabyRobotRepository } from './babyRobot.repo';
import { MintBabyRobotRequest, MintedBabyRobotInfoWithImageMetaAndOwner, ScoringAudienceItem } from './babyRobot.dto';
import { UserService } from '../user/user.service';
import {
	ANIMATION_ROBOT_IMAGE,
	getCurrentPartsConfig,
	getCurrentPartsVersion,
	PROPERTY_LAYERS,
	RANDOM_LAYERS,
	RobotLayer,
	RobotLayerMap,
	sleep
} from '@sd/superdao-shared';
import { UserCodesService } from '../userCodes/userCodes.service';
import { ActiveInvitationsService } from '../activeInvitations/activeInvitations.service';
import { RabbitMqService } from 'src/services/rabbit/RabbitMq.service';
import { CustomItemService } from '../robotCustomItem/customItem.service';

type StatTrait = {
	display_type: 'number';
	trait_type: string;
	value: number;
	max_value?: number;
};

export type PropertyTrait = {
	trait_type: string;
	value: string;
};

type RobotTrait = StatTrait | PropertyTrait;

const CUSTOM_TTL = 15 * 60; // in seconds

const VERSION_REGEX = /v(?<version>\d+)/;

const CUSTOMIZE_FOR_INVITES_ACTIVATION_COUNT = 5;

const DEFAULT_ROBOT_IMAGE = `https://storage.googleapis.com/superdao-robots-assets/generated-robots/f12c953790da243c6580b3abb65343767c144ffecfe0297cae074a1743c2988e.png`;

const DEFAULT_TRAIT: PropertyTrait = {
	trait_type: 'DEFAULT',
	value: 'Yes'
};

const UPDATING_TRAIT: PropertyTrait = {
	trait_type: 'UPDATING',
	value: 'Yes'
};

const DEFAULT_RESPONSE = {
	name: `Super Robot #default`,
	description: 'Own your Superdao Robot',
	image: DEFAULT_ROBOT_IMAGE,
	animation_url: undefined,
	attributes: [DEFAULT_TRAIT]
};

@Injectable()
export class BabyRobotService {
	storage: Storage;

	constructor(
		private readonly userService: UserService,
		private readonly rewardMintService: RewardMintService,
		private readonly babyRobotsRepository: BabyRobotRepository,
		private readonly cacheService: CacheService,
		private readonly scoringService: ScoringApiDataProviderService,
		@Inject(forwardRef(() => BabyRobotsPreviewGenerator))
		private readonly babyRobotPreviewGenerator: BabyRobotsPreviewGenerator,
		private readonly babyRobotGraphService: BabyRobotGraphService,
		private readonly userCodesService: UserCodesService,
		private readonly activeInvitationsService: ActiveInvitationsService,
		private readonly customItemService: CustomItemService,
		private readonly rabbitMqService: RabbitMqService,
		@InjectRedis() private readonly redis: Redis,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(BabyRobotService.name);

		const GOOGLE_STORAGE_CREDENTIALS = getBase64EncodedJSON(config.robots.robotsGoogleStorageCredentialsJSON);

		this.storage = new Storage({
			credentials: GOOGLE_STORAGE_CREDENTIALS,
			projectId: config.robots.robotsGoogleStorageProjectId
		});
	}

	async isImageInStorage(hashSum: string) {
		try {
			await this.getImageMetadataFromStorage(hashSum);

			return true;
		} catch (e) {
			return false;
		}
	}

	async getImageMetadataFromStorage(hashSum: string) {
		const bucketName = config.robots.robotsBucketName;

		return this.storage.bucket(bucketName).file(`${config.robots.robotsGeneratedFolder}/${hashSum}.png`).getMetadata();
	}

	async saveImageInStorage(hashSum: string, buffer: any) {
		const bucketName = config.robots.robotsBucketName;

		const file = this.storage.bucket(bucketName).file(`generated-robots/${hashSum}.png`);

		return new Promise((resolve) => {
			file.save(buffer, function (err: any) {
				if (err) {
					resolve(false);
				}

				resolve(true);
			});
		});
	}

	async getRobotMintByUserId(userId: string) {
		return this.babyRobotsRepository.getRobotMintByUserId(userId);
	}

	async getRobotMintsByUserIds(userIds: string[]) {
		return this.babyRobotsRepository.getRobotMintsByUserIds(userIds);
	}

	async getMintedRobotInfo(walletAddress: string, tokenId?: string | null) {
		const scoringAudienceItem = await this.scoringService.getWalletScoringData(walletAddress);

		const activeCustomTokenItems = tokenId ? await this.getActiveCustomTokenItems(tokenId) : null;

		const feedbackLayer = activeCustomTokenItems?.find((item) => item.customItem.layerType === 'FEEDBACK');

		const [imageName, traitsResponse] = await Promise.all([
			this.babyRobotPreviewGenerator.getV2RobotImageName(walletAddress, scoringAudienceItem, !!feedbackLayer, tokenId),
			this.getRobotTraits(walletAddress, scoringAudienceItem, tokenId)
		]);

		return {
			imageName,
			propertyTraits: traitsResponse.filter((trait) => !(trait as any).display_type) as any[],
			statTraits: traitsResponse.filter((trait) => (trait as any).display_type) as any[],

			scoringAudienceItem,
			feedbackLayer
		};
	}

	async getRobotMetadataByTokenId(tokenId: string) {
		let minterWalletAddress;
		let imageNameSha;

		try {
			let entry = await this.getRobotMintByTokenIdWithoutCache(tokenId);
			if (!entry) {
				this.logger.log('Warning during returning metadata of generated super robot image: no db entry by this token', {
					tokenId
				});

				let attempts = 30;

				while (attempts) {
					await sleep(2000);

					const ts = Date.now();

					this.logger.log('Returning metadata of generated super robot image: before db query', { ts });

					entry = await this.getRobotMintByTokenIdWithoutCache(tokenId);

					this.logger.log('Returning metadata of generated super robot image: after db query', {
						delay: Date.now() - ts
					});

					attempts--;

					if (!!entry) break;
				}

				if (!entry) {
					this.logger.log('Error during returning metadata of generated super robot image: no db entry', { tokenId });

					return DEFAULT_RESPONSE;
				} else {
					// TODO: it can break notification logic on frontend
					await this.registerTokenUpdate({ tokenId, userId: entry.user.id });
				}
			}

			this.logger.log('Returning metadata of generated super robot image: must be valid Robot', { tokenId, entry });

			minterWalletAddress = entry.user.walletAddress;

			const { scoringAudienceItem, feedbackLayer, propertyTraits, statTraits, imageName } =
				await this.getMintedRobotInfo(minterWalletAddress, tokenId);

			const attributes = [...propertyTraits, ...statTraits];

			const { imageUrl, isImageInStorage } = await this.registerBrokerImageUpdate(
				imageName,
				scoringAudienceItem,
				!!feedbackLayer,
				minterWalletAddress,
				tokenId
			);

			if (!isImageInStorage) {
				return {
					name: `Updating Super Robot #${tokenId} in progress`,
					description: 'Own your Superdao Robot',
					image: ANIMATION_ROBOT_IMAGE,
					animation_url: undefined,
					attributes: [...attributes, UPDATING_TRAIT]
				};
			}

			return {
				name: `Super Robot #${tokenId}`,
				description: 'Own your Superdao Robot',
				image: imageUrl,
				animation_url: undefined,
				attributes
			};
		} catch (e) {
			this.logger.error(new Error('Error during returning metadata of generated super robot image'), {
				minterWalletAddress,
				imageNameSha,
				tokenId,
				e
			});
		}

		this.logger.log(
			'Error during returning metadata of generated super robot image: execution came to wrong processing',
			{ tokenId, minterWalletAddress, imageNameSha }
		);

		return DEFAULT_RESPONSE;
	}

	async registerBrokerImageUpdate(
		imageName: string,
		scoringAudienceItem: ScoringAudienceItem,
		feedbackLayer: boolean,
		walletAddress: string,
		tokenId: string | null
	) {
		const imageNameSha = sha256(imageName);

		const imageUrl = this.getRobotImageUrl(imageNameSha);

		const isImageInStorage = await this.isImageInStorage(imageNameSha);

		if (!isImageInStorage) {
			// fire and forget
			this.rabbitMqService
				.send('robot-image-generation-event', {
					withMint: false,
					scoringAudienceItem,
					feedbackLayer,
					walletAddress,
					imageNameSha,
					tokenId
				})
				.catch((e) => {
					this.logger.error(new Error('robot-image-generation-event attempt error'), { e });
				});
		}

		return { imageUrl, isImageInStorage };
	}

	async registerOptionalImageUpdate(
		imageName: string,
		scoringAudienceItem: ScoringAudienceItem,
		feedbackLayer: boolean,
		walletAddress: string,
		tokenId: string | null,
		withHighPriority?: boolean
	) {
		const imageNameSha = sha256(imageName);

		const imageUrl = this.getRobotImageUrl(imageNameSha);

		const isImageInStorage = await this.isImageInStorage(imageNameSha);

		if (!isImageInStorage) {
			await this.registerRobotImageGeneration(
				{
					withMint: false,
					scoringAudienceItem,
					feedbackLayer,
					walletAddress,
					imageNameSha,
					tokenId
				},
				withHighPriority
			);
		}

		return { imageUrl, isImageInStorage };
	}

	async getMintedBabyRobotInfoByUserId(userId: string) {
		try {
			const user = await this.userService.getUserByIdWithCache(userId);
			if (!user) throw new NotFoundError('User not found');

			const robotMintByUserId = await this.getRobotMintByUserId(user.id);

			if (!robotMintByUserId) {
				this.logger.log('Error during getting wallet robot image: wallet has no robot nft minted', {
					userId
				});

				throw new NotFoundError('User robot mint data not found');
			}

			const { imageName, propertyTraits, statTraits } = await this.getMintedRobotInfo(
				user.walletAddress,
				robotMintByUserId.tokenId
			);

			return { imageName, propertyTraits, statTraits };
		} catch (e) {
			this.logger.error(new Error('Error during getiing minted robot info by user id'), {
				userId,
				e
			});

			return null;
		}
	}

	async robotTokenOwner(tokenId: string) {
		const owner = await this.babyRobotGraphService.getOwnerByTokenId(tokenId).then((res) => res.nfts?.[0]?.owner);
		if (!owner) return null;

		return { owner };
	}

	async getMintedBabyRobotInfoWithImageMetaByWallet(walletAddress: string) {
		try {
			const user = await this.userService.findByWalletAddressCitextAndCache(walletAddress);
			if (!user) return null;

			const robotMintByUserId = await this.getRobotMintByUserId(user.id);

			if (!robotMintByUserId) {
				this.logger.log('Error during getting wallet robot image: wallet has no robot nft minted', {
					walletAddress
				});

				return null;
			}

			const { scoringAudienceItem, feedbackLayer, ...response } = await this.getMintedRobotInfo(
				walletAddress,
				robotMintByUserId.tokenId
			);

			const { imageUrl, isImageInStorage } = await this.registerOptionalImageUpdate(
				response.imageName,
				scoringAudienceItem,
				!!feedbackLayer,
				walletAddress,
				robotMintByUserId.tokenId,
				true
			);

			return {
				...response,
				imageUrl,
				isImageInStorage
			};
		} catch (e) {
			this.logger.error(new Error('Error during validating generated super robot image'), {
				walletAddress,
				e
			});

			return null;
		}
	}

	async usersInvitedByCurrentUserCode(userId: string, offset: number, limit: number) {
		const [activeInvitations, count] = await this.activeInvitationsService.getaActiveInvitationsByOwnerIdWithPagination(
			userId,
			offset,
			limit
		);

		const tokensData = await this.getRobotMintsByUserIds(activeInvitations.map((entry) => entry.invitedUser.id));

		const response = tokensData
			.map((data) => {
				const userData = activeInvitations.find((activeInvitation) => activeInvitation.invitedUser.id === data.user.id);
				if (!userData) return null;

				return {
					id: userData.invitedUser.id,
					walletAddress: userData.invitedUser.walletAddress,
					tokenId: data.tokenId
				};
			})
			.filter((entry) => !!entry);

		const configuredResponse = { items: response, count };

		return configuredResponse;
	}

	async getMintedBabyRobotInfoWithImageMetaAndOwnerByTokenId(
		tokenId: string
	): Promise<MintedBabyRobotInfoWithImageMetaAndOwner | null> {
		try {
			const entry = await this.getRobotMintByTokenId(tokenId);
			if (!entry) {
				throw new NotFoundError('Mint with such token id not found');
			}

			const { scoringAudienceItem, feedbackLayer, ...response } = await this.getMintedRobotInfo(
				entry.user.walletAddress,
				tokenId
			);

			const { imageUrl, isImageInStorage } = await this.registerOptionalImageUpdate(
				response.imageName,
				scoringAudienceItem,
				!!feedbackLayer,
				entry.user.walletAddress,
				tokenId,
				true
			);

			const owner = await this.babyRobotGraphService.getOwnerByTokenId(tokenId).then((res) => res.nfts?.[0]?.owner);
			if (!owner) throw new Error('Owner of such token id is not defined yet');

			return {
				...response,
				imageNameSha: sha256(response.imageName),
				imageUrl,
				isImageInStorage,
				owner
			};
		} catch (e) {
			this.logger.error(new Error('Error during validating generated super robot image in robotByTokenImageInfo'), {
				tokenId,
				e
			});

			return null;
		}
	}

	async getMintedBabyRobotInfoByTokenId(tokenId: string) {
		try {
			const entry = await this.getRobotMintByTokenId(tokenId);
			if (!entry) {
				throw new NotFoundError('Mint with such token id not found');
			}

			const { imageName, propertyTraits, statTraits } = await this.getMintedRobotInfo(
				entry.user.walletAddress,
				tokenId
			);

			return { imageName, propertyTraits, statTraits };
		} catch (e) {
			this.logger.error(new Error('Error during getiing minted robot info by token id'), {
				tokenId,
				e
			});

			return null;
		}
	}

	async getRobotAssetsMapping() {
		const currentVersion = getCurrentPartsVersion(featureToggles.isEnabled('robot_versioning_use_odd_version'));
		const layers: Record<keyof typeof RANDOM_LAYERS, number> = getCurrentPartsConfig(currentVersion);

		const BG = Array.from(new Array(layers['BG'])).map((_, key) => ({
			path: `BG_${key + 1}`,
			translation: bgNames[key + 1]
		}));

		const EYES = Array.from(new Array(layers['EYES'])).map((_, key) => ({
			path: `EYES_${key + 1}`,
			translation: eyesNames[key + 1]
		}));

		const TUBES = Array.from(new Array(layers['TUBES'])).map((_, key) => ({
			path: `TUBES_${key + 1}`,
			translation: tubesNames[key + 1]
		}));

		const LEGS = Array.from(new Array(layers['LEGS'])).map((_, key) => {
			const elem = getLegsLayerTraits(key + 1);

			return {
				path: `LEGS_${key + 1}`,
				translation: `${elem[0].value} ${elem[1].value}`
			};
		});

		const BODY = Array.from(new Array(layers['BODY'])).map((_, key) => {
			const elem = getBodyLayerTraits(key + 1);

			return {
				path: `BODY_${key + 1}`,
				translation: `${elem[0].value} ${elem[1].value}`
			};
		});

		return { BG, EYES, TUBES, LEGS, BODY };
	}

	async isUserEligibleForMint(_userId: string) {
		// const eligibleWalletEntry = await this.babyRobotsRepository.isUserEligibleForMint(userId);

		// waves are open
		return { status: true };
	}

	async saveRobotMintEligible(wallets: string[]) {
		return this.babyRobotsRepository.saveRobotMintEligible(wallets);
	}

	async userEligibleForCustomizeData(userId: string) {
		const codeResponse = await this.userCodesService.getUserCodeByUserId(userId);

		const response = await this.babyRobotsRepository.isUserEligibleForCustomize(userId);

		return {
			maxActivationsCount: response?.maxActivationsCount ?? 0,
			usedActivationsCount: response?.usedActivationsCount ?? 0,
			isUserEligibleForInvites: !!codeResponse?.id
		};
	}

	async saveRobotCustomizeEligible(wallets: string[]) {
		return this.babyRobotsRepository.saveRobotCustomizeEligible(wallets);
	}

	async increaseCustomizeEligibleMaxAttempts(wallet: string) {
		return this.babyRobotsRepository.increaseCustomizeEligibleMaxAttempts(wallet);
	}

	async increaseCustomizeEligibleMaxAttemptsOrCreateIfNotExists(wallet: string, userId: string) {
		const response = await this.babyRobotsRepository.isUserEligibleForCustomize(userId);

		if (!response) {
			await this.saveRobotCustomizeEligible([wallet]);
		} else {
			await this.increaseCustomizeEligibleMaxAttempts(wallet);
		}
	}

	async increaseCustomizeEligibleUsedAttempts(userId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) throw new NotFoundError('User not found');

		return this.babyRobotsRepository.increaseCustomizeEligibleUsedAttempts(user.walletAddress);
	}

	async getRobotMintByTokenId(tokenId: string) {
		const cacheKey = getBabyRobotMintByTokenIdKey(tokenId);

		const cachedRobotMintByTokenId = await this.cacheService.get(cacheKey);

		if (cachedRobotMintByTokenId !== null) {
			const parsedData = JSON.parse(cachedRobotMintByTokenId);

			if (!!parsedData) return parsedData;
		}

		const robotMintByTokenId = await this.babyRobotsRepository.getRobotMintByTokenId(tokenId);

		if (robotMintByTokenId) await this.cacheService.set(cacheKey, JSON.stringify(robotMintByTokenId));

		return robotMintByTokenId;
	}

	async getRobotMintByTokenIdWithoutCache(tokenId: string) {
		return this.babyRobotsRepository.getRobotMintByTokenId(tokenId);
	}

	async mintRobotAfterGenerating(mintId: string, userId: string, imageNameSha: string) {
		return this.babyRobotsRepository.mintRobotAfterGenerating(mintId, userId, imageNameSha);
	}

	async finalizeMintBabyRobot(params: { robotMintId: string }[]) {
		return this.babyRobotsRepository.finalizeMintBabyRobot(params);
	}

	async finalizeErc721MintBabyRobot(data: Erc721MintFinilizeData[]) {
		return this.babyRobotsRepository.finalizeErc721MintBabyRobot(data);
	}

	async startErc721MintBabyRobot(data: Erc721MintStartData[]) {
		return this.babyRobotsRepository.startErc721MintBabyRobot(data);
	}

	getRobotImageUrl(imageNameSha: string) {
		return `https://storage.googleapis.com/${config.robots.robotsBucketName}/${config.robots.robotsGeneratedFolder}/${imageNameSha}.png`;
	}

	async validateCanMintBabyRobot(userId: string, userIp?: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) throw new NotFoundError('User not found');

		if (!user.email || !user.emailVerified) {
			return {
				status: BabyRobotMintResponseStatus.EMAIL_MISSING
			};
		}

		const hasUserIpEntry = userIp ? await this.cacheService.get(getRobotMintIpDataKey(userIp)) : false;

		const mintEntry = await this.getRobotMintByUserId(userId);
		if (mintEntry) {
			if (mintEntry.status === RobotMintAndWaitlistStatus.IN_WAITLIST) {
				const { status: isUserEligible } = await this.isUserEligibleForMint(userId);

				if (hasUserIpEntry) {
					return { status: BabyRobotMintResponseStatus.IP_EXISTS };
				}

				return isUserEligible
					? { status: BabyRobotMintResponseStatus.SUCCESS }
					: { status: BabyRobotMintResponseStatus.ALREADY_WAITLISTED };
			}

			return {
				status: BabyRobotMintResponseStatus.ALREADY_MINTED
			};
		}

		if (hasUserIpEntry) {
			return { status: BabyRobotMintResponseStatus.IP_EXISTS };
		}

		return {
			status: BabyRobotMintResponseStatus.SUCCESS
		};
	}

	async waitlistBabyRobot(userId: string): Promise<MintBabyRobotResponse> {
		const { status } = await this.validateCanMintBabyRobot(userId);
		if (status !== BabyRobotMintResponseStatus.SUCCESS) {
			return { status };
		}

		try {
			const mintEntry = await this.getRobotMintByUserId(userId);

			await this.babyRobotsRepository.waitlistRobot(userId, mintEntry?.id);
		} catch (e) {
			this.logger.error(new Error('Error while waitlisting super robot during super robot mint'), {
				userId,
				e
			});

			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		return { status: BabyRobotMintResponseStatus.SUCCESS };
	}

	async commonMintsPart(userId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) throw new NotFoundError('User not found');

		try {
			const randomLayersMap = this.babyRobotPreviewGenerator.getV2RandomLayers(user.walletAddress);

			await this.babyRobotsRepository.saveRobotLayers(user.walletAddress, randomLayersMap);
		} catch (e) {
			this.logger.error(new Error('Error while saving super robot mint layers'), {
				userId,
				e
			});

			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		let imageNameSha;

		const mintEntry = await this.getRobotMintByUserId(userId);

		try {
			const { scoringAudienceItem, feedbackLayer, imageName } = await this.getMintedRobotInfo(
				user.walletAddress,
				mintEntry?.tokenId
			);

			imageNameSha = sha256(imageName);

			const isImageInStorage = await this.isImageInStorage(imageNameSha);

			if (!isImageInStorage) {
				const mintData = await this.babyRobotsRepository.generateRobot(userId, imageNameSha, mintEntry?.id);

				await this.registerRobotImageGeneration(
					{
						withMint: true,
						scoringAudienceItem,
						feedbackLayer: !!feedbackLayer,
						mintId: mintData.id,
						imageNameSha,
						userId,
						walletAddress: user.walletAddress.toLowerCase(),
						email: user.email ?? '',
						tokenId: mintEntry?.tokenId
					},
					true
				);

				return { status: BabyRobotMintResponseStatus.SUCCESS };
			}
		} catch (e) {
			this.logger.error(new Error('Error while generating super robot during super robot mint'), {
				userId,
				e
			});

			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		try {
			const mintData = await this.babyRobotsRepository.mintRobot(userId, imageNameSha, mintEntry?.id);

			await this.rewardMintService.registerErc721RobotMint({
				mintId: mintData.id,
				imageNameSha,
				userId,
				walletAddress: user.walletAddress.toLowerCase(),
				email: user.email ?? ''
			});
		} catch (e) {
			this.logger.error(new Error('Error while minting super robot during super robot mint'), {
				userId,
				e,
				imageNameSha
			});

			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		return { status: BabyRobotMintResponseStatus.SUCCESS };
	}

	async mintBabyRobot(_input: MintBabyRobotRequest, userId: string, userIp?: string): Promise<MintBabyRobotResponse> {
		const { status } = await this.validateCanMintBabyRobot(userId, userIp);
		if (status !== BabyRobotMintResponseStatus.SUCCESS) {
			return { status };
		}

		const { status: isUserEligible } = await this.isUserEligibleForMint(userId);
		if (!isUserEligible) {
			throw new ForbiddenError('Access to functionality is denied');
		}

		if (userIp) {
			await this.cacheService.set(getRobotMintIpDataKey(userIp), 'true', 7 * 24 * 60 * 60); // 7 days
		}

		const response = await this.commonMintsPart(userId);

		return response;
	}

	async mintBabyRobotByCode(code: string, userId: string, userIp?: string) {
		// user can mint by code if in waitlist
		const { status } = await this.validateCanMintBabyRobot(userId, userIp);

		if (status !== BabyRobotMintResponseStatus.SUCCESS && status !== BabyRobotMintResponseStatus.ALREADY_WAITLISTED) {
			return { status };
		}

		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) throw new NotFoundError('User not found');

		const codeInfo = await this.userCodesService.getCodeInvitationsInfoByCodeWithActivationsData(code);
		if (!codeInfo) {
			this.logger.log('Error while minting by code', { code, userId, error: '!codeInfo' });
			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		if (codeInfo.remainingCodeActivations <= 0) {
			this.logger.log('Error while minting by code', { code, userId, error: '!codeInfo.remainingCodeActivations' });
			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		if (codeInfo.codeOwner === user.walletAddress) {
			this.logger.log('Error while minting by code', {
				code,
				userId,
				error: 'codeInfo.codeOwner === user.walletAddress'
			});
			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		if (codeInfo.codeActivationsResponse.filter((elem) => elem.invitedUser.id === userId).length) {
			this.logger.log('Error while minting by code', {
				code,
				userId,
				error: 'codeInfo.codeActivationsResponse.filter((elem) => elem.invitedUser.id === userId).length'
			});
			return { status: BabyRobotMintResponseStatus.ERROR };
		}

		// if next activation is equal CUSTOMIZE_FOR_INVITES_ACTIVATION_COUNT and flow is on
		if (featureToggles.isEnabled('robot_customization_for_invites_flow')) {
			const codeForInvitesActivations =
				await this.userCodesService.getCodeInvitationsInfoByCodeWithActivationsDataForInvites(code);
			if (!codeForInvitesActivations) {
				this.logger.log('Error while minting by code', { code, userId, error: '!codeForInvitesActivations' });
				return { status: BabyRobotMintResponseStatus.ERROR };
			}

			if (
				codeForInvitesActivations.codeActivationsResponse.length % CUSTOMIZE_FOR_INVITES_ACTIVATION_COUNT ===
				CUSTOMIZE_FOR_INVITES_ACTIVATION_COUNT - 1
			) {
				await this.increaseCustomizeEligibleMaxAttemptsOrCreateIfNotExists(codeInfo.codeOwner, codeInfo.codeOwnerId);
			}
		}

		// if customization for invited flow is on
		if (featureToggles.isEnabled('robot_customization_for_invites_to_invited_flow')) {
			await this.saveRobotCustomizeEligible([user.walletAddress]);
		}

		await this.activeInvitationsService.registerCodeActivation(codeInfo.codeId, codeInfo.codeOwnerId, user.id);

		if (featureToggles.isEnabled('robot_invite_for_invited_flow')) {
			await this.userCodesService.insertUserWalletValidForCodeFlow(user.walletAddress);
		}

		if (userIp) {
			await this.cacheService.set(getRobotMintIpDataKey(userIp), 'true', 7 * 24 * 60 * 60); // 7 days
		}

		const response = await this.commonMintsPart(userId);

		return response;
	}

	async registerRobotImageGeneration(entry: RobotImageGenerationEntry, highPriority = false) {
		await this.redis.zadd(
			config.robotImageGeneration.ROBOT_IMAGE_GENERATION_SORTED_SET_KEY,
			highPriority ? Date.now() / 2 : Date.now(),
			JSON.stringify(entry)
		); //this will queue image generation in worker

		this.logger.log('registered new robot image generation entry', { entry });
	}

	async registerTokenUpdate(entry: TokenUpdateEntry) {
		await this.redis.zadd(config.tokenUpdate.TOKEN_UPDATE_SORTED_SET_KEY, Date.now(), JSON.stringify(entry)); //this will queue token update in worker

		this.logger.log('registered new robot token update entry', { entry });
	}

	async getRobotTraits(
		wallet: string,
		scoringAudienceItem: ScoringAudienceItem | null,
		tokenId?: string | null
	): Promise<RobotTrait[]> {
		const activeCustomTokenItems = tokenId ? await this.getActiveCustomTokenItems(tokenId) : null;

		const feedbackLayer = activeCustomTokenItems?.find((item) => item.customItem.layerType === 'FEEDBACK');

		const randomLayersMap = (await this.babyRobotPreviewGenerator.getV2RandomLayersWithMemory(
			wallet,
			tokenId
		)) as Record<RobotLayer, string>;
		const propertiesLayersMap = this.babyRobotPreviewGenerator.getV2PropertyLayer(scoringAudienceItem, !!feedbackLayer);

		const randomPropertyTraits = getPropertiesTraits(randomLayersMap);

		const getBooleanPropertyTrait = (name: keyof typeof PROPERTY_LAYERS, traitName?: string) => ({
			trait_type: traitName ?? name,
			value: propertiesLayersMap[name] ? 'Yes' : 'No'
		});

		const propertyTraits: PropertyTrait[] = [
			getBooleanPropertyTrait('ENS'),
			getBooleanPropertyTrait('LENS'),
			getBooleanPropertyTrait('MIRROR'),
			getBooleanPropertyTrait('TWITTER'),
			getBooleanPropertyTrait('FEEDBACK', 'EARRING OG')
		];

		const scoreTrait: StatTrait = {
			display_type: 'number',
			trait_type: 'Rank',
			value: scoringAudienceItem?.score ?? 0,
			max_value: 100
		};

		const version = getCurrentPartsVersion(featureToggles.isEnabled('robot_versioning_use_odd_version'));
		const versionNumber = Number(version.match(VERSION_REGEX)?.groups?.version) || 0;

		const versionTrait: StatTrait = {
			display_type: 'number',
			trait_type: 'Version',
			value: versionNumber
		};

		return [...randomPropertyTraits, ...propertyTraits, scoreTrait, versionTrait];
	}

	async getBabyRobotsMintCount() {
		const count = await this.babyRobotsRepository.getBabyRobotsMintCount();

		return { count };
	}

	async getUserRobotsTokenIds(userId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);

		const wallet = user?.walletAddress;
		if (!wallet) {
			throw new NotFoundError('User with such id not found');
		}

		const response = await this.babyRobotGraphService.getTokensInCollectionForOwner(wallet);

		return response.nfts.map((nft) => nft.tokenID);
	}

	async userRobotMintIsInProgress(userId: string) {
		const mint = await this.getRobotMintByUserId(userId);
		if (!mint) return false;

		if (mint.status === RobotMintAndWaitlistStatus.IN_WAITLIST) return false;

		if (mint.status === RobotMintAndWaitlistStatus.CLAIMED || mint.tokenId) return false;

		// if user Robot mint is in progress - return true
		return true;
	}

	async isUserOwnerOfToken(wallet: string) {
		const graphResponse = await this.babyRobotGraphService.getTokensInCollectionForOwner(wallet);

		const isUserOwner = !!graphResponse.nfts.length;

		return isUserOwner;
	}

	async getIsUserRobotTokenOwnerOrMinter(userId: string) {
		try {
			const user = await this.userService.getUserByIdWithCache(userId);
			if (!user) {
				throw new NotFoundError("User with such id doesn't exist");
			}

			const isUserOwner = await this.isUserOwnerOfToken(user.walletAddress);

			const dbResponse = await this.getRobotMintByUserId(userId);

			const isUserMinter = !!dbResponse?.id;

			return isUserOwner || isUserMinter;
		} catch (e) {
			this.logger.error(new Error('Error while getting robot token owner or minter info'), {
				userId,
				e
			});

			return false;
		}
	}

	async getIsUserRobotTokenOwner(userId: string, tokenId: string) {
		try {
			const user = await this.userService.getUserByIdWithCache(userId);

			const graphResponse = await this.babyRobotGraphService.getOwnerByTokenId(tokenId);

			const owner = graphResponse.nfts?.[0]?.owner;

			return user && owner && user.walletAddress.toLowerCase() === owner.toLowerCase();
		} catch (e) {
			this.logger.error(new Error('Error while getting robot token owner'), {
				tokenId,
				e
			});

			return null;
		}
	}

	sanitizeRobotRandomLayersMap(layersMap: RobotLayerMap) {
		const currentVersion = getCurrentPartsVersion(featureToggles.isEnabled('robot_versioning_use_odd_version'));
		const layers: Record<keyof typeof RANDOM_LAYERS, number> = getCurrentPartsConfig(currentVersion);

		const results = Object.entries(layers).map(([key, amount]) => {
			const layersMapNumber = Number(layersMap[key as keyof typeof layersMap]);

			return !isNaN(layersMapNumber) && amount >= layersMapNumber;
		});

		return results.every(Boolean);
	}

	async updateRobotLayers(
		userId: string,
		tokenId: string,
		layersMap: RobotLayerMap,
		state: { toOffIds: string[]; toOnIds: string[]; toTransferIds: string[] }
	) {
		try {
			const { status: isRobotUpdating } = await this.isRobotUpdating(userId, tokenId);
			if (isRobotUpdating) {
				return { status: UpdateRobotLayersResponseStatus.ALREADY_UPDATING };
			}

			const fullLayersMap = { HEAD: '1', ...layersMap }; // TODO: HEAD is now not customazable, but must be saved

			if (!this.sanitizeRobotRandomLayersMap(fullLayersMap)) {
				return { status: UpdateRobotLayersResponseStatus.SANITIZE_FAIL };
			}

			const user = await this.userService.getUserByIdWithCache(userId);

			const wallet = user?.walletAddress;
			if (!wallet) {
				throw new NotFoundError('User with such id not found');
			}

			const graphResponse = await this.babyRobotGraphService.getOwnerByTokenId(tokenId);

			const owner = graphResponse.nfts?.[0]?.owner;

			if (!owner || owner.toLowerCase() !== wallet?.toLowerCase()) {
				throw new ForbiddenError('Access to token forbidden');
			}

			await this.babyRobotsRepository.saveUserChoice(tokenId, fullLayersMap);

			try {
				await this.customItemService.onItems(tokenId, state.toOnIds);

				await this.customItemService.offItems(tokenId, state.toOffIds);

				await this.customItemService.transferItems(userId, tokenId, state.toTransferIds);
			} catch (e) {
				this.logger.error(new Error('Error during manipulating with custom items'), {
					tokenId,
					userId,
					layersMap,
					state,
					e
				});

				return { status: UpdateRobotLayersResponseStatus.FAIL };
			}

			const { scoringAudienceItem, feedbackLayer, imageName } = await this.getMintedRobotInfo(wallet, tokenId);

			const imageNameSha = sha256(imageName);

			const isImageInStorage = await this.isImageInStorage(imageNameSha);

			await this.cacheService.set(getUpdateRobotLayersKey(userId, tokenId), 'true', CUSTOM_TTL);

			if (!isImageInStorage) {
				await this.registerRobotImageGeneration(
					{
						withMint: false,
						scoringAudienceItem,
						feedbackLayer: !!feedbackLayer,
						imageNameSha,
						walletAddress: user.walletAddress.toLowerCase(),
						userId,
						email: user.email ?? '',
						withTokenUpdate: true,
						tokenId
					},
					true
				);
			} else {
				await this.registerTokenUpdate({ tokenId, userId });
			}

			return { status: UpdateRobotLayersResponseStatus.SUCCESS };
		} catch (e) {
			this.logger.error(new Error('Error while saving user choice layers to db'), {
				userId,
				tokenId,
				layersMap,
				e
			});

			return { status: UpdateRobotLayersResponseStatus.FAIL };
		}
	}

	async isRobotUpdating(userId: string, tokenId: string) {
		const existCount = await this.cacheService.exists(getUpdateRobotLayersKey(userId, tokenId));

		return { status: !!existCount };
	}

	async getUserCustomItems(userId: string) {
		return this.customItemService.getUserCustomItemsByUserId(userId);
	}

	async getTokenCustomItems(userId: string, tokenId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) {
			this.logger.error(new Error('TokenCustomItems: User with such id not found'), { userId, tokenId });

			return [];
		}

		const isUserOwner = await this.isUserOwnerOfToken(user.walletAddress);
		if (!isUserOwner) {
			this.logger.error(new Error('TokenCustomItems: User is not owner of token'), { userId, tokenId });

			return [];
		}

		return this.customItemService.getTokenCustomItemsByTokenId(tokenId);
	}

	async getActiveCustomTokenItems(tokenId: string) {
		return this.customItemService.getActiveCustomTokenItems(tokenId);
	}
}
