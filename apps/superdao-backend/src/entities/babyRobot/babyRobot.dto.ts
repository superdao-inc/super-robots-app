import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import PaginatedResponse, { PaginationArgs } from 'src/gql/pagination';
import { CustomItem } from '../robotCustomItem/customItem.model';

@ArgsType()
export class MintedBabyRobotByUserRequest {
	@Field(() => String)
	userId: string;
}

@ArgsType()
export class MintedBabyRobotByTokenIdRequest {
	@Field(() => String)
	tokenId: string;
}

@ArgsType()
@InputType('MintBabyRobotRequest')
export class MintBabyRobotRequest {
	@Field(() => [String])
	interests: string[];
}

@ArgsType()
@InputType('MintBabyRobotByCodeRequestInput')
export class MintBabyRobotByCodeRequest {
	@Field(() => String)
	code: string;
}

@ArgsType()
export class WalletScoringDataRequest {
	@Field(() => String)
	walletAddress: string;
}

@ArgsType()
export class RobotByTokenImageInfoRequest {
	@Field(() => String)
	tokenId: string;
}

@InputType()
export class CommonUpdateRobotLayersPart {
	@Field(() => String)
	bg: string;

	@Field(() => String)
	body: string;

	@Field(() => String)
	eyes: string;

	@Field(() => String)
	tubes: string;

	@Field(() => String)
	legs: string;
}

@InputType()
export class CustomUpdateRobotLayersPartElemCustomItem {
	@Field(() => String)
	layerName: string;

	@Field(() => String)
	layerType: string;
}

@InputType()
export class CustomUpdateRobotLayersPartElem {
	@Field(() => String)
	id: string;

	@Field(() => CustomUpdateRobotLayersPartElemCustomItem)
	customItem: CustomUpdateRobotLayersPartElemCustomItem;
}

@InputType()
export class CustomUpdateRobotLayersPart {
	@Field(() => CustomUpdateRobotLayersPartElem, { nullable: true })
	bg: CustomUpdateRobotLayersPartElem | null;

	@Field(() => CustomUpdateRobotLayersPartElem, { nullable: true })
	body: CustomUpdateRobotLayersPartElem | null;

	@Field(() => CustomUpdateRobotLayersPartElem, { nullable: true })
	eyes: CustomUpdateRobotLayersPartElem | null;

	@Field(() => CustomUpdateRobotLayersPartElem, { nullable: true })
	tubes: CustomUpdateRobotLayersPartElem | null;

	@Field(() => CustomUpdateRobotLayersPartElem, { nullable: true })
	legs: CustomUpdateRobotLayersPartElem | null;

	@Field(() => CustomUpdateRobotLayersPartElem, { nullable: true })
	feedback: CustomUpdateRobotLayersPartElem | null;
}

@InputType()
export class UpdateRobotLayersRequest {
	@Field(() => String)
	tokenId: string;

	@Field(() => CommonUpdateRobotLayersPart)
	common: CommonUpdateRobotLayersPart;

	@Field(() => [String])
	toOffIds: string[];

	@Field(() => [String])
	toOnIds: string[];

	@Field(() => [String])
	toTransferIds: string[];
}

@ObjectType('ScoringActivityContract')
export class ScoringActivityContract {
	@Field(() => String)
	address: string;

	@Field(() => String)
	imageUrl: string;

	@Field(() => String)
	name: string;

	@Field(() => String)
	externalUrl: string;
}

@ObjectType()
export class PropertyTrait {
	@Field(() => String)
	trait_type: string;

	@Field(() => String)
	value: string;
}

@ObjectType()
export class StatTrait {
	@Field(() => String)
	display_type: string;

	@Field(() => String)
	trait_type: string;

	@Field(() => Int)
	value: number;
}

@ObjectType('MintedBabyRobotInfo')
export class MintedBabyRobotInfo {
	@Field(() => String)
	imageName: string;

	@Field(() => [PropertyTrait])
	propertyTraits: PropertyTrait[];

	@Field(() => [StatTrait])
	statTraits: StatTrait[];
}

@ObjectType('RobotTokenOwner')
export class RobotTokenOwner {
	@Field(() => String)
	owner: string;
}

@ObjectType('MintedBabyRobotInfoWithImageMeta')
export class MintedBabyRobotInfoWithImageMeta extends MintedBabyRobotInfo {
	@Field(() => String)
	imageUrl: string;

	@Field(() => Boolean)
	isImageInStorage: boolean;
}

@ObjectType('UsersInvitedByCurrentUserCode')
export class UsersInvitedByCurrentUserCode {
	@Field(() => String)
	id: string;

	@Field(() => String)
	walletAddress: string;

	@Field(() => String, { nullable: true })
	tokenId: string | null;
}

@ObjectType('MintedBabyRobotInfoWithImageMetaAndOwner')
export class MintedBabyRobotInfoWithImageMetaAndOwner extends MintedBabyRobotInfoWithImageMeta {
	@Field(() => String)
	owner: string;

	@Field(() => String)
	imageNameSha: string;
}

@ObjectType('RobotAssetMappingElem')
export class RobotAssetMappingElem {
	@Field(() => String)
	path: string;

	@Field(() => String)
	translation: string;
}

@ObjectType('RobotAssetsMapping')
export class RobotAssetsMapping {
	@Field(() => [RobotAssetMappingElem])
	BG: RobotAssetMappingElem[];

	@Field(() => [RobotAssetMappingElem])
	EYES: RobotAssetMappingElem[];

	@Field(() => [RobotAssetMappingElem])
	TUBES: RobotAssetMappingElem[];

	@Field(() => [RobotAssetMappingElem])
	BODY: RobotAssetMappingElem[];

	@Field(() => [RobotAssetMappingElem])
	LEGS: RobotAssetMappingElem[];
}

@ObjectType()
export class BabyRobotsMintCount {
	@Field(() => Int)
	count: number;
}

@ObjectType()
export class IsUserEligibleForMintResponse {
	@Field(() => Boolean)
	status: boolean;
}

@ObjectType('ScoringAudienceItem')
export class ScoringAudienceItem {
	@Field(() => String)
	wallet: string;

	@Field(() => Int)
	score: number;

	@Field(() => [String])
	tags: string[];

	@Field(() => Int)
	nftsCount: number;

	@Field(() => String, { nullable: true })
	ens: string | null;

	@Field(() => String, { nullable: true })
	twitterUrl: string | null;

	@Field(() => String, { nullable: true })
	twitterAvatarUrl: string | null;

	@Field(() => String, { nullable: true })
	twitterUsername: string | null;

	@Field(() => Int)
	walletUsdCap: number;

	@Field(() => Int, { nullable: true })
	twitterFollowersCount: number | null;

	@Field(() => [String])
	activity: string[];

	@Field(() => Int)
	lastMonthTxCount: number;
}

@ObjectType()
export class UsersInvitedByCurrentUserCodeResponse extends PaginatedResponse(UsersInvitedByCurrentUserCode) {}

@ArgsType()
export class UsersInvitedByCurrentUserCodeRequest extends PaginationArgs {
	@Field(() => Int)
	@Min(1)
	limit?: number = 100;
}

@ObjectType()
export class BabyRobotCustomizeEligibleResponse {
	@Field(() => Int)
	maxActivationsCount: number;

	@Field(() => Int)
	usedActivationsCount: number;

	@Field(() => Boolean)
	isUserEligibleForInvites: boolean;
}

@ObjectType()
export class CustomItemByUserResponse {
	@Field()
	id: string;

	@Field(() => CustomItem)
	customItem: CustomItem;
}

@ObjectType()
export class CustomItemByTokenResponse {
	@Field()
	id: string;

	@Field()
	isEnabled: boolean;

	@Field(() => CustomItem)
	customItem: CustomItem;
}

@ArgsType()
export class TokenCustomItemsRequest {
	@Field()
	tokenId: string;
}
