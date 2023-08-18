import { ethers } from 'ethers';
import { SaleType } from './sale';

export enum MessageName {
	BURN_NFT_SUCCESS = 'BURN_NFT_SUCCESS',
	BURN_NFT_FAILED = 'BURN_NFT_FAILED',
	BAN_MEMBER_SUCCESS = 'BAN_MEMBER_SUCCESS',
	BAN_MEMBER_FAILED = 'BAN_MEMBER_FAILED',
	REMOVE_WHITELIST_SUCCESS = 'REMOVE_WHITELIST_SUCCESS',
	REMOVE_WHITELIST_FAILED = 'REMOVE_WHITELIST_FAILED',
	AIRDROP_SUCCESS = 'AIRDROP_SUCCESS',
	AIRDROP_FAIL = 'AIRDROP_FAIL',
	WHITELIST_SUCCESS = 'WHITELIST_SUCCESS',
	WHITELIST_FAIL = 'WHITELIST_FAIL',
	BUY_NFT_SUCCESS = 'BUY_NFT_SUCCESS',
	BUY_NFT_FAIL = 'BUY_NFT_FAIL',
	BUY_WHITELIST_NFT_SUCCESS = 'BUY_WHITELIST_NFT_SUCCESS',
	BUY_WHITELIST_NFT_FAIL = 'BUY_WHITELIST_NFT_FAIL',
	CLAIM_NFT_SUCCESS = 'CLAIM_NFT_SUCCESS',
	CLAIM_NFT_FAIL = 'CLAIM_NFT_FAIL',
	CLAIM_NFT_FAIL_HAS_NFT = 'CLAIM_NFT_FAIL_HAS_NFT',
	BUY_ALLOWANCE_SUCCESS = 'BUY_ALLOWANCE_SUCCESS',
	BUY_ALLOWANCE_FAILED = 'BUY_ALLOWANCE_FAILED',
	CHANGE_MEMBER_ROLE_SUCCESS = 'CHANGE_MEMBER_ROLE_SUCCESS',
	CHANGE_MEMBER_ROLE_FAILED = 'CHANGE_MEMBER_ROLE_FAILED',
	NFT_ADMIN_UPDATE_COLLECTION_SUCCESS = 'NFT_ADMIN_UPDATE_COLLECTION_SUCCESS',
	NFT_ADMIN_UPDATE_COLLECTION_FAILED = 'NFT_ADMIN_UPDATE_COLLECTION_FAILED',
	NFT_ADMIN_UPDATE_SALE_SUCCESS = 'NFT_ADMIN_UPDATE_SALE_SUCCESS',
	NFT_ADMIN_UPDATE_SALE_FAILED = 'NFT_ADMIN_UPDATE_SALE_FAILED'
}

export type BanMemberMessageBody = {
	daoId: string;
	walletAddress: string;
	displayName: string | null;
};

export type AirdropMessageBody = {
	daoId: string;
	daoSlug: string;
	walletsCount: number;
};

export type WhitelistMessageBody = {
	daoId: string;
	daoSlug: string;
	daoAddress: string;
	walletsCount: number;
};

export type BuyNftMessageBody = {
	daoId: string;
	daoAddress: string;
	tier: string;
};

export type BuyWhitelistNftMessageBody = {
	daoId: string;
	daoAddress: string;
	tier: string;
};

export type BuyAllowanceMessageBody = {
	transaction: Omit<ethers.Transaction, 'gasLimit' | 'gasPrice' | 'value' | 'maxPriorityFeePerGas' | 'maxFeePerGas'>;
};

export type ClaimNftSuccessMessageBody = { daoSlug: string; tier: string };

export type ReferralClaimNftSuccessMessageBody = { daoSlug: string; tier: string; isAmbassadorNow: boolean };

export type ChangeMemberRoleMessageBody = {
	userId: string;
	daoId: string;
	daoSlug: string;
};

export type NftAdminUpdateCollectionMessageBody = {
	transactionHash: string;
	daoId: string;
	daoAddress: string;
	userToNotify: string;
};

export type NftAdminUpdateSaleMessageBody = {
	transactionHash: string;
	daoId: string;
	daoAddress: string;
	userToNotify: string;
	type: SaleType;
};

export type MessageBody = {
	[MessageName.BAN_MEMBER_SUCCESS]: BanMemberMessageBody;
	[MessageName.BAN_MEMBER_FAILED]: BanMemberMessageBody;
	[MessageName.BURN_NFT_SUCCESS]: BanMemberMessageBody;
	[MessageName.BURN_NFT_FAILED]: BanMemberMessageBody;
	[MessageName.REMOVE_WHITELIST_SUCCESS]: WhitelistMessageBody;
	[MessageName.REMOVE_WHITELIST_FAILED]: WhitelistMessageBody;
	[MessageName.AIRDROP_SUCCESS]: AirdropMessageBody;
	[MessageName.AIRDROP_FAIL]: AirdropMessageBody;
	[MessageName.WHITELIST_SUCCESS]: WhitelistMessageBody;
	[MessageName.WHITELIST_FAIL]: WhitelistMessageBody;
	[MessageName.BUY_NFT_SUCCESS]: BuyNftMessageBody;
	[MessageName.BUY_NFT_FAIL]: BuyNftMessageBody;
	[MessageName.BUY_WHITELIST_NFT_SUCCESS]: BuyNftMessageBody;
	[MessageName.BUY_WHITELIST_NFT_FAIL]: BuyNftMessageBody;
	[MessageName.CLAIM_NFT_SUCCESS]: ClaimNftSuccessMessageBody;
	[MessageName.CLAIM_NFT_FAIL]: unknown;
	[MessageName.CLAIM_NFT_FAIL_HAS_NFT]: unknown;
	[MessageName.BUY_ALLOWANCE_SUCCESS]: BuyAllowanceMessageBody;
	[MessageName.BUY_ALLOWANCE_FAILED]: unknown;
	[MessageName.CHANGE_MEMBER_ROLE_SUCCESS]: ChangeMemberRoleMessageBody;
	[MessageName.CHANGE_MEMBER_ROLE_FAILED]: ChangeMemberRoleMessageBody;
	[MessageName.CHANGE_MEMBER_ROLE_FAILED]: ChangeMemberRoleMessageBody;
	[MessageName.CHANGE_MEMBER_ROLE_FAILED]: ChangeMemberRoleMessageBody;
	[MessageName.NFT_ADMIN_UPDATE_COLLECTION_SUCCESS]: NftAdminUpdateCollectionMessageBody;
	[MessageName.NFT_ADMIN_UPDATE_COLLECTION_FAILED]: NftAdminUpdateCollectionMessageBody;
	[MessageName.NFT_ADMIN_UPDATE_SALE_SUCCESS]: NftAdminUpdateSaleMessageBody;
	[MessageName.NFT_ADMIN_UPDATE_SALE_FAILED]: NftAdminUpdateSaleMessageBody;
};
