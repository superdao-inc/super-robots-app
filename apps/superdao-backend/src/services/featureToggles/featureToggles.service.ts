import { startUnleash, Context } from 'unleash-client';

import { config } from 'src/config';
import { log } from 'src/utils/logger';

// let unleashInstance: Unleash | undefined;

type FeatureToggleContext = Context & {
	daoId?: string;
};

export const initUnleash = async () => {
	log.log('Starting unleash...');

	// unleashInstance =
	await startUnleash({
		appName: `superdao-backend-app-${config.unleash.environment}`,
		environment: config.unleash.environment,
		url: config.unleash.url,
		customHeaders: { Authorization: config.unleash.apiKey }
	});

	log.log('Unleash successfully started');
};

export const featureToggles = {
	isEnabled: (_name: string, _context?: FeatureToggleContext) => {
		// if (!unleashInstance) {
		// 	log.error(new Error('unleashInstance is not ready'));

		// 	return false;
		// }

		// return unleashInstance.isEnabled(name, context);

		return true;
	}
};
