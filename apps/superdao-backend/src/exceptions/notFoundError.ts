import { ApolloError } from 'apollo-server';
import { ErrorCode } from '@sd/superdao-shared';

export class NotFoundError extends ApolloError {
	constructor(message: string = 'Not found') {
		super(message, ErrorCode.NOT_FOUND);

		this.code = ErrorCode.NOT_FOUND;
		Object.defineProperty(this, 'name', { value: 'NotFoundError' });
	}
}
