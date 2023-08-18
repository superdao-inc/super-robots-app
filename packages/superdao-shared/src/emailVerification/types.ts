import { EmailVerificationStatus } from './constants';

export type EmailVerificationOptions = {
	status: EmailVerificationStatus;
	email?: string;
	backPath?: string;
};
