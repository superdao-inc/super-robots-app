import getConfig from 'next/config';
import { Chain, networkMap } from '@sd/superdao-shared';

const { publicRuntimeConfig } = getConfig();

export const environment = publicRuntimeConfig.APP_ENV;
export const environmentSlug = publicRuntimeConfig.APP_ENV_SLUG; // possible values: dev, stage, review-123, review-456, prod
export const isProduction = environment === 'prod';
export const isStage = environment === 'stage';
export const isDev = environment === 'dev';

export const infuraProjectId = publicRuntimeConfig.INFURA_POLYGON_MAINNET_API_KEY;

const magicPublishableKey = publicRuntimeConfig.MAGIC_PUBLISHABLE_KEY;

export const recaptchaSiteKey = publicRuntimeConfig.RECAPTCHA_SITE_KEY;

export const config = {
	polygon: networkMap[Chain.Polygon],
	ethereum: networkMap[Chain.Ethereum],
	infura: {
		polygonUrl: `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`,
		infuraProjectId
	},
	magic: {
		magicPublishableKey
	},
	backend: publicRuntimeConfig.BACKEND_SERVICE_URL,
	unleashProxy: {
		url: publicRuntimeConfig.UNLEASH_PROXY_URL,
		clientKey: publicRuntimeConfig.UNLEASH_PROXY_CLIENT_KEY,
		appName: `superdao-frontend-app-${environmentSlug}`,
		environment: environmentSlug
	},
	walletConnect: {
		projectId: publicRuntimeConfig.WALLET_CONNECT_PROJECT_ID
	}
};
