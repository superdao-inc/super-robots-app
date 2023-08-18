export enum EmailVerificationErrorCode {
	ALREADY_VERIFIED = 'already-verified',
	NOT_MATCH = 'not-match'
}

export class EmailVerificationError extends Error {
	constructor(message: string, public readonly code: EmailVerificationErrorCode) {
		super(message);
	}
}
