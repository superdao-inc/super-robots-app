export enum EcosystemType {
	EVM = 'evm'
}

export enum CurrencySymbol {
	ETH = 'ETH',
	MATIC = 'MATIC',
	BNB = 'BNB'
}

export enum ChainId {
	ETHEREUM_MAINNET = 1,
	ETHEREUM_TESTNET_ROPSTEN = 3,
	ETHEREUM_TESTNET_KOVAN = 42,
	POLYGON_MAINNET = 137,
	POLYGON_TESTNET_MUMBAI = 80001,
	BINANCE_SMART_CHAIN_MAINNET = 56,
	BINANCE_SMART_CHAIN_TESTNET = 97
}

export type Network = {
	ecosystem: EcosystemType;
	chainId: ChainId;
	title: string;
	rpcUrl: string;
	blockExplorerUrl: string;
	currencySymbol: CurrencySymbol;
	isTestNet: boolean;
};
