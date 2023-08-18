import { SUPPORTED_NETWORKS } from '../constants';

export const getSupportedNetworks = (isProd: boolean) =>
	SUPPORTED_NETWORKS.filter((network) => (isProd ? !network.isTestNet : true));
