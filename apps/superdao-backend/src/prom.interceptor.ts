import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram, Summary } from 'prom-client';
import { Observable } from 'rxjs';
import express from 'express';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

function getMicroseconds() {
	const now = process.hrtime();
	return now[0] * 1000000 + now[1] / 1000;
}

const ROBOT_METADATA_ROUTE_REGEX = /(?<route>\/api\/erc721\/robots\/)\d+/;

/** In order not to spam the prometheus with multiple routes with dynamic parameters,
 * combine these routes
 */
function mapPath(path: string) {
	const robotMetadataMatch = path.match(ROBOT_METADATA_ROUTE_REGEX);
	if (robotMetadataMatch?.groups?.route) {
		return `${robotMetadataMatch.groups.route}{tokenId}`; // /api/erc721/robots/{tokenId}
	}

	return path;
}

export class PromInterceptor implements NestInterceptor {
	constructor(
		@InjectMetric('http_requests_total') public httpRequestTotal: Counter<string>,
		@InjectMetric('http_server_requests_seconds') public httpServerRequestsSeconds: Histogram<string>,
		@InjectMetric('http_request_size_bytes') public httpRequestSizeBytes: Summary<string>,
		@InjectMetric('http_response_size_bytes') public httpResponseSizeBytes: Summary<string>
	) {}

	getRequestAndResponse(context: ExecutionContext): [express.Request, express.Response] {
		let request: express.Request;
		let response: express.Response;

		if (context.getType() === 'http') {
			const argumentsHost = context.switchToHttp();
			request = argumentsHost.getRequest<express.Request>();
			response = argumentsHost.getResponse<express.Response>();
		} else if (context.getType<GqlContextType>() === 'graphql') {
			const ctx = GqlExecutionContext.create(context);
			request = ctx.getContext()['req'];
			response = ctx.getContext()['res'];
		} else {
			throw new Error('Unknown context type');
		}

		return [request, response];
	}

	addMetrics(request: express.Request, response: express.Response, context: ExecutionContext, startEpoch: number) {
		const status = response.statusCode.toString();
		const method = request.method;
		const path = context.getType<GqlContextType>() === 'graphql' ? '/graphql' : mapPath(request.path);
		const className = context.getClass().name;
		const handler = context.getHandler().name;

		this.httpRequestTotal.labels(method, path, status, className, handler).inc();

		this.httpServerRequestsSeconds
			.labels(method, path, status, className, handler)
			.observe((getMicroseconds() - startEpoch) / 1000000);

		// TODO: We should check request size by other methods
		const requestLength = Number(request.get('content-length'));

		if (requestLength) {
			this.httpRequestSizeBytes.labels(method, path, status, className, handler).observe(requestLength);
		}

		// TODO: httpResponseSizeBytes not working.
		const responseLength = Number(response.getHeaders()['content-length']);

		if (responseLength) {
			this.httpResponseSizeBytes.labels(method, path, status, className, handler).observe(responseLength);
		}
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
		const startEpoch = getMicroseconds();

		const [request, response] = this.getRequestAndResponse(context);

		response.on('close', () => {
			this.addMetrics(request, response, context, startEpoch);
		});

		return next.handle();
	}
}
