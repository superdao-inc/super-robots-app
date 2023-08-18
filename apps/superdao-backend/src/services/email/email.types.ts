export type EmailData = {
	header: string;
	paragraphs: string[];
	tier?: {
		img: string;
		name: string;
	};
	dao?: {
		name: string;
		avatar: string;
		about?: string;
		hasAvatar?: boolean;
	};
	btnLabel: string;
	btnLink: string;
	isWhitelist?: boolean; // Whitelist
	isGrantRole?: boolean; // Admin rights
};

export type VariablesMap = Record<string, Record<string, unknown>>;

export type UsersWalletsMap = Record<
	string,
	{
		name: string;
	}
>;

export type UsersWalletAddressesMap = Record<
	string,
	{
		walletAddress: string;
	}
>;

export type UsersWelcomeParamsMap = Record<
	string,
	{
		walletAddress: string;
		tierName: string;
		tierImage: string;
	}
>;

export type UsersRewardMintParamsMap = Record<
	string,
	{
		tierName: string;
		tierImage: string;
		nftName: string;
		walletAddress: string;
		ownerName: string;
		ownerImage: string;
		userSlug: string;
	}
>;

export type UsersErc721MintParamsMap = Record<
	string,
	{
		mintId: string;
		wallet: string;
		tokenId: string | null | undefined;
	}
>;

export type UsersWhitelistClaimParamsMap = Record<
	string,
	{
		id: string;
		tierName: string;
		tierImage: string;
		tierId: string;
	}
>;

export type UsersIdsMap = Record<
	string,
	{
		id: string;
	}
>;

export type EmailPayload = {
	from: string;
	subject: string;
	html: string;
};

export type EmailConfirmationOptions = {
	userId: string;
	email: string;
	ua?: string;
	linkUrl?: string;
	userPageAnchor?: string;
	otp: string;
};
