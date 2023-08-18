import { SUPPORTED_NETWORKS } from '../constants';
import { Network } from '../types';

export const ecosystems = Array.from(new Set(SUPPORTED_NETWORKS.map((x) => x.ecosystem)));
export const chainIds = Array.from(new Set(SUPPORTED_NETWORKS.map((x) => x.chainId)));
export const currencies = Array.from(new Set(SUPPORTED_NETWORKS.map((x) => x.currencySymbol)));

export const getNetworkByChainId = (chainId: number): Network | undefined =>
	SUPPORTED_NETWORKS.find((network) => network.chainId === chainId);
