export class MetamaskError extends Error {
	code: number;

	data?: {
		code: number;
		message: string;
	};
}
