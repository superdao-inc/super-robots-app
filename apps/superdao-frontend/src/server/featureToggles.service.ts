import * as unleash from 'unleash-client';

export interface FeatureToggleContext extends unleash.Context {
	daoId: string;
}

export const featureToggles = {
	isEnabled: (_: string) => true
};
