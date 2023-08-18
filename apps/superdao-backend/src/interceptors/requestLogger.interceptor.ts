import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { CustomLogger } from '@dev/nestjs-common';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
	constructor(private logger: CustomLogger) {
		this.logger = logger.createScope(RequestLoggerInterceptor.name);
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const type = context.getType<GqlContextType>();
		let req: Request, res: Response, handler: string | undefined;

		switch (type) {
			case 'http':
				const argumentsHost = context.switchToHttp();
				req = argumentsHost.getRequest<Request>();
				res = argumentsHost.getResponse<Response>();
				break;
			case 'graphql':
				const ctx = GqlExecutionContext.create(context).getContext();
				req = ctx.req;
				res = ctx.res;
				handler = context.getHandler().name;
				break;
			default:
				return next.handle();
		}

		const { method } = req;
		const url = type === 'graphql' ? '/graphql' : req.path;
		const now = Date.now();

		this.logger.log('Request', {
			url,
			method,
			handler,
			startTime: now
		});

		return next.handle().pipe(
			tap(() => {
				this.logger.log('Response', {
					url,
					method,
					handler,
					statusCode: res.statusCode,
					executionTime: Date.now() - now
				});
			})
		);
	}
}
