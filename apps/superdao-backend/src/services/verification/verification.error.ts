export enum VerificationErrorCode {
	TOKEN_EXPIRED = 'TOKEN_EXPIRED',
	TOKEN_INVALID = 'TOKEN_INVALID',
	UNKNOWN = 'UNKNOWN'
}

export class VerificationError extends Error {
	constructor(public readonly code: VerificationErrorCode) {
		super('Verification error');
	}
}
