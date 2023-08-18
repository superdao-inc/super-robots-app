import axios from 'axios';
import { EmailVerificationOptions } from '@sd/superdao-shared';

import { config } from 'src/constants/environment';

export const emailVerificationRequest = async ({ token }: { token: string }): Promise<EmailVerificationOptions> => {
	const { data } = await axios.get<EmailVerificationOptions>(`${config.backend}/api/email/verify/${token}`);
	return data;
};
