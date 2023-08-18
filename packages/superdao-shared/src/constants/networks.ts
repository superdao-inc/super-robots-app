import { ChainId, CurrencySymbol, Network, EcosystemType } from '../types';

export const Ethereum: Network = {
	ecosystem: EcosystemType.EVM,
	chainId: ChainId.ETHEREUM_MAINNET,
	title: 'Ethereum',
	rpcUrl: 'https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79',
	blockExplorerUrl: 'https://etherscan.io/',
	currencySymbol: CurrencySymbol.ETH,
	isTestNet: false
};

export const EthereumRopsten: Network = {
	ecosystem: EcosystemType.EVM,
	chainId: ChainId.ETHEREUM_TESTNET_ROPSTEN,
	title: 'Ethereum Testnet (ropsten)',
	rpcUrl: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
	blockExplorerUrl: 'https://ropsten.etherscan.io',
	currencySymbol: CurrencySymbol.ETH,
	isTestNet: true
};

export const EthereumKovan: Network = {
	ecosystem: EcosystemType.EVM,
	chainId: ChainId.ETHEREUM_TESTNET_KOVAN,
	title: 'Ethereum Testnet (kovan)',
	rpcUrl: 'https://kovan.poa.network',
	blockExplorerUrl: 'https://kovan.etherscan.io',
	currencySymbol: CurrencySymbol.ETH,
	isTestNet: true
};

export const Polygon: Network = {
	ecosystem: EcosystemType.EVM,
	chainId: ChainId.POLYGON_MAINNET,
	title: 'Polygon',
	rpcUrl: 'https://polygon-mainnet.infura.io/v3/efd7267dd08944fab28f259ff9685a0b',
	blockExplorerUrl: 'https://polygonscan.com',
	currencySymbol: CurrencySymbol.MATIC,
	isTestNet: false
};

export const PolygonMumbai: Network = {
	ecosystem: EcosystemType.EVM,
	chainId: ChainId.POLYGON_TESTNET_MUMBAI,
	title: 'Polygon Testnet (mumbai)',
	rpcUrl: 'https://polygon-mumbai.infura.io/v3/423058990e6e45af98acaa52887f96d1',
	blockExplorerUrl: 'https://mumbai.polygonscan.com',
	currencySymbol: CurrencySymbol.MATIC,
	isTestNet: true
};

export const BinanceSmartChain: Network = {
	ecosystem: EcosystemType.EVM,
	chainId: ChainId.BINANCE_SMART_CHAIN_MAINNET,
	title: 'Binance Smart Chain',
	rpcUrl: 'https://bsc-dataseed.binance.org',
	blockExplorerUrl: 'https://bscscan.com',
	currencySymbol: CurrencySymbol.BNB,
	isTestNet: false
};

export const CHAIN_ID_BY_NETWORK_NAME = {
	ETHEREUM_MAINNET: '1',
	ETHEREUM_TESTNET_ROPSTEN: '3',
	ETHEREUM_TESTNET_KOVAN: '42',
	POLYGON_MAINNET: '137',
	POLYGON_TESTNET_MUMBAI: '80001',
	BINANCE_SMART_CHAIN_MAINNET: '56',
	BINANCE_SMART_CHAIN_TESTNET: '97'
};

export const SUPPORTED_NETWORKS = [Polygon, Ethereum, BinanceSmartChain];
