export const loginMessageKey = 'login';
export const airdropKey = (daoId: string) => `airdrop_${daoId}`;
export const whitelistKey = (daoId: string) => `whitelist_${daoId}`;
export const buyNftKey = (daoId: string, tier: string) => `buy_nft_${daoId}_${tier}`;
export const buyWhitelistNftKey = (daoAddress: string, tier: string) => `buy_whitelist_nft_${daoAddress}_${tier}`;
export const banMemberKey = (displayName: string, daoId: string) => `banMember_${displayName}_${daoId}`;
export const burnNftKey = (displayName: string, daoId: string) => `burnNft_${displayName}_${daoId}`;
export const removeWhitelistWalletKey = (displayName: string, daoId: string) =>
	`removeWhitelistWallet_${displayName}_${daoId}`;
export const changeMemberRoleKey = (userId: string, daoId: string) => `changeMemberRole_${userId}_${daoId}`;
export const nftAdminUpdateCollectionKey = (daoAddress: string) => `nftAdminUpdateCollection_${daoAddress}`;
export const nftAdminUpdateSaleKey = (daoAddress: string) => `nftAdminUpdateSale_${daoAddress}`;
