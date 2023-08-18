import 'dotenv/config';
import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
	APP_ENV: str({ choices: ['dev', 'stage', 'prod'], default: 'dev' }),
	APP_ENV_SLUG: str({ default: 'dev' }),

	UNLEASH_SERVER_URL: str({ default: 'UNLEASH_URL' }),
	UNLEASH_SERVER_API_KEY: str({ default: 'UNLEASH_SECRET' }),
	WALLET_CONNECT_PROJECT_ID: str({ default: 'WC_PROJECT_ID' })
});

export const config = {
	appEnv: env.APP_ENV,

	unleash: {
		url: env.UNLEASH_SERVER_URL,
		apiKey: env.UNLEASH_SERVER_API_KEY,
		environment: env.APP_ENV_SLUG
	},

	walletConnect: {
		projectId: env.WALLET_CONNECT_PROJECT_ID
	}
};
