// read as suggestion to redis hash functionality with hget, hset and so on...
export const getUserNftsKey = (userAddress: string, daoAddress: string) => ({
	key: `nfts-by-user:${userAddress}`,
	field: daoAddress
});

export const getCollectionsKey = (daoAddress: string) => `collections:${daoAddress}`;

export const getCollectionAddressKey = (daoAddress: string) => `collection-address:${daoAddress}`;

// read as suggestion to redis hash functionality with hget, hset and so on...
export const getCollectionArtworksKey = (daoAddress: string, tier: string) => ({
	key: `collection-artworks:${daoAddress}`,
	field: tier
});

// read as suggestion to redis hash functionality with hget, hset and so on...
export const getCollectionTierKey = (daoAddress: string, tier: string) => ({
	key: `collection-tier:${daoAddress}`,
	field: tier
});

export const getIsOpenSaleActiveKey = (daoAddress: string) => `is-open-sale-active:${daoAddress}`;

export const getOpenSaleTokenAddressKey = (daoAddress: string) => `open-sale-token-address:${daoAddress}`;

export const getNftAdminServiceCollectionKey = (daoAddress: string) => `nft-admin-service-collection:${daoAddress}`;

export const getIsPrivateSaleActiveKey = (daoAddress: string) => `is-private-sale-active:${daoAddress}`;

export const getTierSalesPricesKey = (daoAddress: string, tierIdOrName: string) => ({
	key: `tier-sales-prices:${daoAddress}`,
	field: tierIdOrName
});

export const getAllActiveOffersKey = () => 'allActiveOffers';

export const getAllExpiredOffersKey = () => 'allExpiredOffers';

export const getCountOfOffersByTypesKey = () => 'countOfOffersByTypes';

export const getCountOfOffersForUserByTypesKey = (userId: string) => `countOfOffersForUserByTypes:${userId}`;

export const getOfferClaimsCountKey = (offerId: string) => `offerClaimsCount:${offerId}`;

export const getOfferNftKey = (offerId: string) => `offerNft:${offerId}`;

export const getOfferByIdKey = (offerId: string) => `offerById:${offerId}`;

export const getUserByIdKey = (userId: string) => `userById:${userId}`;

export const getUserByWalletKey = (wallet: string) => `userByWallet:${wallet}`;

// Super Robots

export const getWalletScoringDataKey = (wallet: string) => `walletScoringDataKey:${wallet}`;

export const getBabyRobotKernelAndTokenIdOwnerDataKey = (tokenId: string, kernelAddress: string) =>
	`babyRobotTokenIdOwner:${tokenId}:${kernelAddress}`;

export const getBabyRobotMintByTokenIdKey = (tokenId: string) => `babyRobotMintByTokenId:${tokenId}`;

export const getErc721BabyRobotTokenIdOwnerDataKey = (tokenId: string, erc721Address: string) =>
	`erc721BabyRobotTokenIdOwner:${tokenId}:${erc721Address}`;

export const getRobotFeedbackFormEntryKey = (wallet: string) => `robotFeedbackFormEntry:${wallet}`;

export const getRobotLayersKey = (wallet: string) => `getRobotLayers:${wallet}`;

export const getUpdateRobotLayersKey = (userId: string, tokenId: string) => `updateRobotLayers:${userId}:${tokenId}`;

// OTP

export const getEmailOTPDataByUserIdKey = (userId: string) => `emailOTPDataByUserId:${userId}`;

// IP

export const getRobotMintIpDataKey = (ip: string) => `RobotMintIpData:${ip}`;
