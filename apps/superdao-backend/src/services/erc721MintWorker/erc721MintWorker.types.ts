export type Erc721MintParticipant = {
	mintId: string; // for comfortable db updates
	imageNameSha: string;
	userId: string;
	email: string;
	walletAddress: string;
	erc721ContractAddress: string;
};

export type Erc721MintStartData = {
	mintId: string; // for comfortable db updates
	wallet: string;
	transactionHash: string | undefined;
};

export type Erc721MintFinilizeData = {
	mintId: string; // for comfortable db updates
	wallet: string;
	tokenId: string | undefined;
};
