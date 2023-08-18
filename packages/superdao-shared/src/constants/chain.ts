import { chainIdToHex } from '../utils/chainToHex';

export enum Chain {
	Ethereum = 1,
	Polygon = 137
}

export type ChainProps = {
	key: 'mumbai' | 'polygon' | 'ethereum';
	chainId: Chain;
	chainIdHex: `0x${string}`;
	name: string;
	fullName: string;
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	rpcUrls: [string, ...string[]];
	blockExplorerUrls: [string, ...string[]];
};

export const polygonChain: ChainProps = {
	key: 'polygon',
	chainId: Chain.Polygon,
	chainIdHex: chainIdToHex(Chain.Polygon), // '0x89'
	name: 'Polygon',
	fullName: 'Polygon Mainnet',
	nativeCurrency: {
		name: 'MATIC',
		symbol: 'MATIC',
		decimals: 18
	},
	rpcUrls: ['https://polygon-rpc.com'],
	blockExplorerUrls: ['https://www.polygonscan.com/']
};

export const ethereumChain: ChainProps = {
	key: 'ethereum',
	chainId: Chain.Ethereum,
	chainIdHex: chainIdToHex(Chain.Ethereum),
	name: 'Ethereum',
	fullName: 'Ethereum Mainnet',
	nativeCurrency: {
		name: 'Ether',
		symbol: 'ETH',
		decimals: 18
	},
	rpcUrls: ['https://mainnet.infura.io/v3/'],
	blockExplorerUrls: ['https://etherscan.io']
};

export const networkMap: Record<Chain, ChainProps> = {
	[Chain.Polygon]: polygonChain,
	[Chain.Ethereum]: ethereumChain
};
