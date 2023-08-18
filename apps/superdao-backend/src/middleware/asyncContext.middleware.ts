import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { AsyncStorage, InjectTracer } from '@dev/nestjs-common';

export class AsyncContextMiddleware implements NestMiddleware {
	constructor(@InjectTracer() private readonly asyncStorage: AsyncStorage) {}

	use(req: Request, _: Response, next: NextFunction): void {
		const store = new Map<string, unknown>();

		store.set('requestId', uuidv4());
		store.set('traceId', (req.headers['x-trace-id'] as string) || uuidv4());

		this.asyncStorage.run(store, () => next());
	}
}
