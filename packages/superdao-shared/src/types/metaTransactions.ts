export type MetaTxMessage = {
	from: string;
	value: number;
	to: string;
	data: string;
	nonce: number;
};

type ForwardRequestType = {
	name: string;
	type: string;
};

export type MetaTxParams = {
	primaryType: string;
	types: { ForwardRequest: ForwardRequestType[] };
	domain: { name: string; version: string; chainId: number; verifyingContract: string };
	message: MetaTxMessage;
};
