import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { AuthGuard } from 'src/auth.guard';
import { ForbiddenError, NotFoundError } from 'src/exceptions';

import { ScoringApiDataProviderService } from 'src/entities/scoring/scoring.service';
import { featureToggles } from 'src/services/featureToggles';
import {
	BabyRobotCustomizeEligibleResponse,
	BabyRobotsMintCount,
	CustomItemByTokenResponse,
	CustomItemByUserResponse,
	IsUserEligibleForMintResponse,
	MintBabyRobotByCodeRequest,
	MintBabyRobotRequest,
	MintedBabyRobotByTokenIdRequest,
	MintedBabyRobotByUserRequest,
	MintedBabyRobotInfo,
	MintedBabyRobotInfoWithImageMeta,
	MintedBabyRobotInfoWithImageMetaAndOwner,
	RobotAssetsMapping,
	RobotByTokenImageInfoRequest,
	RobotTokenOwner,
	ScoringAudienceItem,
	TokenCustomItemsRequest,
	UpdateRobotLayersRequest,
	UsersInvitedByCurrentUserCodeRequest,
	UsersInvitedByCurrentUserCodeResponse,
	WalletScoringDataRequest
} from './babyRobot.dto';
import { BabyRobot } from './babyRobot.model';
import { BabyRobotService } from './babyRobot.service';
import { IsRobotUpdatingResponse, MintBabyRobotResponse, UpdateRobotLayersResponse } from './babyRobot.types';
import { BabyRobotMint } from './babyRobotMint.model';

@Resolver(() => BabyRobot)
export class BabyRobotResolver {
	constructor(
		private readonly babyRobotsService: BabyRobotService,
		private readonly scoringService: ScoringApiDataProviderService
	) {}

	// ROBOT INFORMATION PART: db entries

	// returns information about robot image by any user id (token id is optional param from BabyRobotMint table)
	@Query(() => BabyRobotMint, { nullable: true })
	async mintedBabyRobotByUser(@Args() req: MintedBabyRobotByUserRequest) {
		return this.babyRobotsService.getRobotMintByUserId(req.userId);
	}

	// returns mint log entry from db for current user
	@UseGuards(AuthGuard)
	@Query(() => BabyRobotMint, { nullable: true })
	async mintedBabyRobotByCurrentUser(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) return null;

		return this.babyRobotsService.getRobotMintByUserId(userId);
	}

	// ROBOT INFORMATION PART: custom response

	// returns information about robot image by current user id (token id is optional param from BabyRobotMint table)
	@UseGuards(AuthGuard)
	@Query(() => MintedBabyRobotInfo, { nullable: true })
	async mintedBabyRobotInfo(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) return null;

		return this.babyRobotsService.getMintedBabyRobotInfoByUserId(userId);
	}

	// returns information about robot image by token id
	@UseGuards(AuthGuard)
	@Query(() => MintedBabyRobotInfo, { nullable: true })
	async mintedBabyRobotInfoByTokenId(@Context('req') ctx: Request, @Args() req: MintedBabyRobotByTokenIdRequest) {
		const userId = ctx.session?.userId;
		if (!userId) return null;

		return this.babyRobotsService.getMintedBabyRobotInfoByTokenId(req.tokenId);
	}

	// returns information about robot image by any user wallet (token id is optional param from BabyRobotMint table, user must have robotMintByUserId)
	@Query(() => MintedBabyRobotInfoWithImageMeta, { nullable: true })
	async mintedBabyRobotInfoWithImageMetaByWallet(@Args() req: WalletScoringDataRequest) {
		return this.babyRobotsService.getMintedBabyRobotInfoWithImageMetaByWallet(req.walletAddress);
	}

	// TODO: because of usage this method in robots card preview, image generator wrker after customizing robot
	// have 2 similar image generation entries with same imageNameSha

	// returns information about robot image by tokenId (with image metadata and owner)
	@Query(() => MintedBabyRobotInfoWithImageMetaAndOwner, { nullable: true })
	async mintedBabyRobotInfoWithImageMetaAndOwnerByTokenId(@Args() req: RobotByTokenImageInfoRequest) {
		return this.babyRobotsService.getMintedBabyRobotInfoWithImageMetaAndOwnerByTokenId(req.tokenId);
	}

	@UseGuards(AuthGuard)
	@Query(() => UsersInvitedByCurrentUserCodeResponse)
	async usersInvitedByCurrentUserCode(
		@Args() request: UsersInvitedByCurrentUserCodeRequest,
		@Context('req') ctx: Request
	) {
		const userId = ctx.session?.userId;
		if (!userId) return { items: [], count: 0 };

		return this.babyRobotsService.usersInvitedByCurrentUserCode(userId, request.offset ?? 0, request.limit ?? 0);
	}

	// COMMON PART: queries

	// returns assets name<->translation mapping
	@Query(() => RobotAssetsMapping)
	async robotAssetsMapping() {
		return this.babyRobotsService.getRobotAssetsMapping();
	}

	// returns is current user eligible for minting
	@Query(() => IsUserEligibleForMintResponse)
	async isUserEligibleForMint(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.isUserEligibleForMint(userId);
	}

	// returns wallet scoring data
	@Query(() => ScoringAudienceItem, { nullable: true })
	async walletScoringData(@Args() req: WalletScoringDataRequest) {
		return this.scoringService.getWalletScoringData(req.walletAddress);
	}

	// returns all mints count
	@Query(() => BabyRobotsMintCount)
	async babyRobotsMintCount() {
		return this.babyRobotsService.getBabyRobotsMintCount();
	}

	// returns user owned robot token ids (from Graph)
	@UseGuards(AuthGuard)
	@Query(() => [String])
	async userRobotsTokenIds(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.getUserRobotsTokenIds(userId);
	}

	// returns user owned robot token ids (from Graph)
	@UseGuards(AuthGuard)
	@Query(() => Boolean)
	async userRobotMintIsInProgress(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) return false;

		return this.babyRobotsService.userRobotMintIsInProgress(userId);
	}

	// returns if user owns or minted robot (from Graph and db)
	@Query(() => Boolean)
	async isUserRobotTokenOwnerOrMinter(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) {
			return false;
		}

		return this.babyRobotsService.getIsUserRobotTokenOwnerOrMinter(userId);
	}

	// returns is user owner of token (from Graph)
	@Query(() => Boolean)
	async isUserRobotTokenOwner(@Context('req') ctx: Request, @Args() req: RobotByTokenImageInfoRequest) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.getIsUserRobotTokenOwner(userId, req.tokenId);
	}

	// returns if robot token id is updating by this user (from Redis)
	@UseGuards(AuthGuard)
	@Query(() => IsRobotUpdatingResponse)
	async isRobotUpdating(@Context('req') ctx: Request, @Args() req: RobotByTokenImageInfoRequest) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.isRobotUpdating(userId, req.tokenId);
	}

	// COMMON PART: mutations

	// returns user owned robot token ids (from Graph) in mutationFormat
	@UseGuards(AuthGuard)
	@Mutation(() => [String])
	async getUserRobotsTokenIds(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.getUserRobotsTokenIds(userId);
	}

	// provides mint sanitize logic
	@UseGuards(AuthGuard)
	@Mutation(() => MintBabyRobotResponse)
	async validateCanMintBabyRobot(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.validateCanMintBabyRobot(userId, ctx.headers['cf-connecting-ip'] as string);
	}

	// provides mint logic
	@UseGuards(AuthGuard)
	@Mutation(() => MintBabyRobotResponse)
	async mintBabyRobot(@Args() req: MintBabyRobotRequest, @Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		if (featureToggles.isEnabled('super_robot_mint_stop')) {
			throw new ForbiddenError('Access to functionality is denied');
		}

		return this.babyRobotsService.mintBabyRobot(req, userId, ctx.headers['cf-connecting-ip'] as string);
	}

	// provides mint logic by code invitation
	@UseGuards(AuthGuard)
	@Mutation(() => MintBabyRobotResponse)
	async mintBabyRobotByCode(@Args() req: MintBabyRobotByCodeRequest, @Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.mintBabyRobotByCode(req.code, userId, ctx.headers['cf-connecting-ip'] as string);
	}

	// provides waitlist logic
	@UseGuards(AuthGuard)
	@Mutation(() => MintBabyRobotResponse)
	async waitlistBabyRobot(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.waitlistBabyRobot(userId);
	}

	// provides update token id layers logic
	@UseGuards(AuthGuard)
	@Mutation(() => UpdateRobotLayersResponse)
	async updateRobotLayers(
		@Context('req') ctx: Request,
		@Args('updateRobotLayersRequest') req: UpdateRobotLayersRequest
	) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		const isUserChoiceWhitelistEnabled = await this.babyRobotsService.userEligibleForCustomizeData(userId);
		if (!isUserChoiceWhitelistEnabled?.maxActivationsCount) {
			throw new ForbiddenError('Access to endpoint forbidden');
		}

		if (!(isUserChoiceWhitelistEnabled.maxActivationsCount - isUserChoiceWhitelistEnabled.usedActivationsCount)) {
			throw new ForbiddenError('User has no customize activations left');
		}

		await this.babyRobotsService.increaseCustomizeEligibleUsedAttempts(userId);

		return this.babyRobotsService.updateRobotLayers(
			userId,
			req.tokenId,
			{
				BODY: req.common.body,
				BG: req.common.bg,
				EYES: req.common.eyes,
				LEGS: req.common.legs,
				TUBES: req.common.tubes
			},
			{ toOffIds: req.toOffIds, toOnIds: req.toOnIds, toTransferIds: req.toTransferIds }
		);
	}

	// returns owner of robot token as query
	@Query(() => RobotTokenOwner, { nullable: true })
	async robotTokenOwner(@Args() req: MintedBabyRobotByTokenIdRequest) {
		return this.babyRobotsService.robotTokenOwner(req.tokenId);
	}

	// returns owner of robot token as mutation
	@Mutation(() => RobotTokenOwner, { nullable: true })
	async getRobotTokenOwner(@Args() req: MintedBabyRobotByTokenIdRequest) {
		return this.babyRobotsService.robotTokenOwner(req.tokenId);
	}

	@UseGuards(AuthGuard)
	@Query(() => BabyRobotCustomizeEligibleResponse, { nullable: true })
	async userEligibleForCustomizeData(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.userEligibleForCustomizeData(userId);
	}

	@UseGuards(AuthGuard)
	@Query(() => [CustomItemByUserResponse])
	async getUserCustomItems(@Context('req') ctx: Request) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.getUserCustomItems(userId);
	}

	@UseGuards(AuthGuard)
	@Query(() => [CustomItemByTokenResponse])
	async getTokenCustomItems(@Context('req') ctx: Request, @Args() req: TokenCustomItemsRequest) {
		const userId = ctx.session?.userId;
		if (!userId) throw new NotFoundError();

		return this.babyRobotsService.getTokenCustomItems(userId, req.tokenId);
	}
}
