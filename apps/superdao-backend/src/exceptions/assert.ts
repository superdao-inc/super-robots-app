import { NotFoundError } from './notFoundError';

export function assertNotValid(condition: unknown, msg?: string): asserts condition {
	if (!Boolean(condition)) throw new Error(msg);
}

export function assertNotFound<T>(value: T, message?: string): asserts value is NonNullable<T> {
	if (value === undefined || value === null) {
		throw new NotFoundError(message);
	}
}
