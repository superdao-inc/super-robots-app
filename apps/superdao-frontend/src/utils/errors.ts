import { ErrorCode } from '@sd/superdao-shared';

export const parseGrapqhlErrorCode = (error: unknown) => {
	const parsedError = typeof error === 'string' ? JSON.parse(error) : error;

	if (Array.isArray(parsedError) && parsedError[0]?.extensions?.code) {
		return parsedError[0].extensions.code as string;
	}

	return null;
};

export const isNotFoundError = (error: unknown) => {
	return parseGrapqhlErrorCode(error) === ErrorCode.NOT_FOUND;
};

export const parseGqlErrorMessage = (error: unknown): string | null => {
	const parsedError = typeof error === 'string' ? JSON.parse(error) : error;

	if (Array.isArray(parsedError) && parsedError[0]?.message) {
		return parsedError[0].message as string;
	}

	if (parsedError instanceof Error && parsedError.message) {
		return parsedError.message;
	}

	return null;
};
