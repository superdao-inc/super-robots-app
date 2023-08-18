import { config } from 'src/config';
import { featureToggles } from '../featureToggles';

export const SORTED_SET_KEY = config.tokenUpdate.TOKEN_UPDATE_SORTED_SET_KEY;

export const getBatchSize = () => {
	return featureToggles.isEnabled('robot_token_updating_throughput') ? 10 : 5;
};
