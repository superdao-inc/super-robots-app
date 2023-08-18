import toast from 'react-hot-toast';
import { AppError } from '@sd/errors';

import { parseGqlErrorMessage } from 'src/utils/errors';

export const captureError = (error: unknown, unknownErrorMsg: string): void => {
	AppError.capture(error, {
		payload: { tags: { team: 'CORE', section: 'User' } },
		display: () => toast.error(parseGqlErrorMessage(error) ?? unknownErrorMsg)
	});
};
