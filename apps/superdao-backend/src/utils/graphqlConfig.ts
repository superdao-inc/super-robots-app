import { PluginDefinition } from 'apollo-server-core/src/types';
import { GraphQLRequestListener } from 'apollo-server-plugin-base/src';
import { ErrorCode } from '@sd/superdao-shared';

export const mapErrorToStatus = (code: string | undefined): number => {
	switch (code) {
		case ErrorCode.UNAUTHENTICATED:
			return 401;

		case ErrorCode.FORBIDDEN:
			return 403;

		case ErrorCode.NOT_FOUND:
			return 404;

		case 'PERSISTED_QUERY_NOT_FOUND':
		case 'GRAPHQL_PARSE_FAILED':
		case 'GRAPHQL_VALIDATION_FAILED':
			return 400;

		case 'INTERNAL_SERVER_ERROR':
			return 500;

		case 'NOT_IMPLEMENTED':
			return 501;

		default:
			return 500;
	}
};

export const graphqlHttpPlugin: PluginDefinition = {
	async requestDidStart(): Promise<GraphQLRequestListener> {
		return {
			async willSendResponse({ response }) {
				if (response?.errors?.[0]?.extensions?.code && response.http) {
					response.http.status = mapErrorToStatus(response.errors[0].extensions.code);
				}
			}
		};
	}
};
