import { config } from 'src/config';

import { featureToggles } from '../featureToggles';

export const ACTIVE_TX_KEY = config.robotImageGeneration.ROBOT_IMAGE_GENERATION_ACTIVE_TX_KEY;
export const SORTED_SET_KEY = config.robotImageGeneration.ROBOT_IMAGE_GENERATION_SORTED_SET_KEY;

export const getBatchSize = () => {
	return featureToggles.isEnabled('robot_versioning_throughput') ? 10 : 5;
};
