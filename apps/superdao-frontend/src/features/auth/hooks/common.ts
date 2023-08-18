import { AppError } from 'src/services/errors';
import { toast } from 'src/components/toast/toast';
import { loginMessageKey } from 'src/utils/toastKeys';

export const handleAuthError = (error: any, errorMessage: string | null, defaultError: string) => {
	const message = errorMessage ?? defaultError;

	AppError.capture(error, {
		payload: {
			tags: { team: 'CORE', section: 'Auth' }
		},
		display: () => {
			toast.error(message, { id: loginMessageKey, duration: 5000 });
		},
		options: {
			silent: message === 'User closed modal'
		}
	});
};
