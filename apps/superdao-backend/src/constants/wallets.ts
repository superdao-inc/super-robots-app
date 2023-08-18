import { config } from 'src/config';

const {
	gnosisWallets: { production, stage }
} = config;

export const GNOSIS_ADMIN_ADDRESS = config.appEnv === 'prod' ? production : stage;
