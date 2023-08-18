export interface IBullQueueResponse {
	isInStorage: boolean;
	jobId: number | string | null;
	imageHashSum: string;
}

export class ImageError extends Error {
	constructor(msg: string) {
		super(msg);

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, ImageError.prototype);
	}
}
