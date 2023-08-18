import { AuthenticationError, ForbiddenError, ValidationError, ApolloError } from 'apollo-server-core';
import { log } from 'src/utils/logger';

import { NotFoundError } from './notFoundError';
import { ErrorCode } from '@sd/superdao-shared';

export { NotFoundError, AuthenticationError, ForbiddenError, ValidationError, ApolloError };

export const throwErrorByCode = (error: unknown): never => {
	if (error instanceof ApolloError) {
		log.error(new Error('throwErrorByCode: ApolloError'), { error });

		switch (error.code) {
			case ErrorCode.NOT_FOUND:
				throw new NotFoundError(error.message);

			case ErrorCode.UNAUTHENTICATED:
				throw new AuthenticationError(error.message);

			case ErrorCode.FORBIDDEN:
				throw new ForbiddenError(error.message);

			case ErrorCode.VALIDATION_ERROR:
				throw new ValidationError(error.message);

			default:
				throw error;
		}
	}

	if (error instanceof Error) {
		log.error(new Error('throwErrorByCode: Default Error'), { error });
		throw new ApolloError(error?.message);
	}

	log.error(new Error('throwErrorByCode: Unknown error'), { error });
	throw new ApolloError('Unknown error');
};
