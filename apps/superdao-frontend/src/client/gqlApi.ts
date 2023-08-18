import axios, { AxiosResponse } from 'axios';

import Router from 'next/router';
import { isBrowser } from 'src/utils/browser';
import { DataType, DocumentType } from 'src/client/graphql';
import { config } from 'src/constants/environment';

const baseURI = isBrowser ? '/graphql' : `${config.backend}/graphql`;

export const gqlBaseApi = axios.create({
	baseURL: baseURI,
	timeout: 120000,
	timeoutErrorMessage: 'Request takes more than 120 seconds'
});

gqlBaseApi.interceptors.response.use(
	function onFulfilled(response) {
		return response;
	},
	function onRejected(error) {
		if (isBrowser && error) {
			const { status } = error;

			if (status === 401) {
				Router.push('/auth/login');
			}
		}

		// The response.data.errors from the graphql endpoint is an array of objects.
		// When this structure goes to next js, next js checks is it a:
		// 1. Normal error (instance of Error, so it can be correctly serialized)? No.
		// 2. Maybe it's a string or plain object (https://www.npmjs.com/package/is-plain-object)? No.
		// 3. Ok then, I cannot serialize this and I will do `'' + error` and flow it to stderr.
		// For now, I think that stringify is a good solution.
		return Promise.reject(JSON.stringify(error?.response?.data?.errors) || error);
	}
);

export const gqlClient = async <R = any, D = any>(
	data?: { variables?: D } & DocumentType,
	cookie?: string
): Promise<R | undefined> => {
	const headers = cookie ? { cookie } : undefined;
	const result = await gqlBaseApi.request<DataType<R>, AxiosResponse<DataType<R>>, { variables?: D }>({
		method: 'post',
		data,
		headers
	});

	return result.data.data;
};

export const requestWrapper =
	<T, V>(document: string, variables?: V, options?: { cookie?: string }) =>
	(): Promise<T | undefined> => {
		const cookie = options?.cookie;
		return gqlClient({ query: document, variables }, cookie);
	};
