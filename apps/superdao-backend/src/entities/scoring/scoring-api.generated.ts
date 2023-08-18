/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AnalyticsItem */
export interface AnalyticsItem {
	/** Tracker Id */
	tracker_id: string;
	/** Wallet */
	wallet: string;
	/** Last Event */
	last_event: 'WALLET_CONNECT' | 'FORM_SUBMIT';
	/** Last Event Timestamp */
	last_event_timestamp: number;
	/** Source */
	source?: string;
	/** Superrank */
	superrank?: number;
	/** Nfts Count */
	nfts_count?: number;
	/** Ens Name */
	ens_name?: string;
	/** Twitter Url */
	twitter_url?: string;
	/** Twitter Username */
	twitter_username?: string;
	/** Twitter Avatar Url */
	twitter_avatar_url?: string;
	/** Twitter Followers Count */
	twitter_followers_count?: number;
	/** Wallet Usd Cap */
	wallet_usd_cap?: number;
	/** Labels */
	labels?: string[];
}

/** AudienceItem */
export interface AudienceItem {
	/** Score Id */
	score_id: string;
	/** Score */
	score: number;
	/** Wallet */
	wallet: string;
	/** Superrank */
	superrank?: number;
	/** Row Number */
	row_number?: number;
	/** Created At */
	created_at?: number;
	/** Tx Count */
	tx_count?: number;
	/** Last Month Tx Count */
	last_month_tx_count?: number;
	/** Nfts Count */
	nfts_count?: number;
	/** Ens Name */
	ens_name?: string;
	/** Twitter Url */
	twitter_url?: string;
	/** Twitter Username */
	twitter_username?: string;
	/** Twitter Avatar Url */
	twitter_avatar_url?: string;
	/** Twitter Followers Count */
	twitter_followers_count?: number;
	/** Wallet Usd Cap */
	wallet_usd_cap?: number;
	/** Labels */
	labels?: string[];
	/** Whitelist Activity */
	whitelist_activity?: string[];
}

/** GetAggregationsResponse */
export interface GetAggregationsResponse {
	/** Values */
	values: number[];
}

/** GetAnalyticsResponse */
export interface GetAnalyticsResponse {
	/** Items */
	items: AnalyticsItem[];
	/** Total */
	total: number;
}

/** GetAudienceAggregationResponse */
export interface GetAudienceAggregationResponse {
	/** Values */
	values: number[];
}

/** GetAudienceResponse */
export interface GetAudienceResponse {
	/** Items */
	items: AudienceItem[];
	/** Total */
	total: number;
}

/** GetWalletAttributesResponse */
export interface GetWalletAttributesResponse {
	/** Wallet */
	wallet: string;
	/** Superrank */
	superrank?: number;
	/** Row Number */
	row_number?: number;
	/** Created At */
	created_at?: number;
	/** Tx Count */
	tx_count?: number;
	/** Last Month Tx Count */
	last_month_tx_count?: number;
	/** Nfts Count */
	nfts_count?: number;
	/** Ens Name */
	ens_name?: string;
	/** Twitter Url */
	twitter_url?: string;
	/** Twitter Username */
	twitter_username?: string;
	/** Twitter Avatar Url */
	twitter_avatar_url?: string;
	/** Twitter Followers Count */
	twitter_followers_count?: number;
	/** Wallet Usd Cap */
	wallet_usd_cap?: number;
	/** Labels */
	labels?: string[];
	/** Whitelist Activity */
	whitelist_activity?: string[];
}

/** HTTPValidationError */
export interface HTTPValidationError {
	/** Detail */
	detail?: ValidationError[];
}

/** ValidationError */
export interface ValidationError {
	/** Location */
	loc: any[];
	/** Message */
	msg: string;
	/** Error Type */
	type: string;
}

export namespace Healthcheck {
	/**
	 * No description
	 * @tags healthcheck
	 * @name Get
	 * @summary Health
	 * @request GET:/healthcheck/
	 */
	export namespace Get {
		export type RequestParams = {};
		export type RequestQuery = {};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = Record<string, string>;
	}
}

export namespace V1 {
	/**
	 * No description
	 * @tags audience
	 * @name Get
	 * @summary Get
	 * @request GET:/v1/audience/{score_id}
	 */
	export namespace Get {
		export type RequestParams = {
			/** Score Id */
			scoreId: string;
		};
		export type RequestQuery = {
			/** Order By Field */
			order_by_field?: string;
			/** Order By Direction */
			order_by_direction?: 'ASC' | 'DESC';
			/** Where Field */
			where_field?: string;
			/** Where Operator */
			where_operator?: 'contains' | 'eq' | 'ne';
			/** Where Value */
			where_value?: string;
			/** Search */
			search?: string;
			/** Limit */
			limit?: number;
			/** Offset */
			offset?: number;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetAudienceResponse;
	}
	/**
	 * No description
	 * @tags audience
	 * @name Get2
	 * @summary Get Aggregation
	 * @request GET:/v1/audience/{score_id}/aggregation
	 * @originalName get
	 * @duplicate
	 */
	export namespace Get2 {
		export type RequestParams = {
			/** Score Id */
			scoreId: string;
		};
		export type RequestQuery = {
			/** Agg Type */
			agg_type: 'count' | 'sum' | 'count_bucket_intervals' | 'count_bucket_values';
			/** Agg Field */
			agg_field: string;
			/** Where Field */
			where_field?: string;
			/** Where Operator */
			where_operator?: 'eq' | 'ne';
			/** Where Value */
			where_value?: string;
			/** Buckets */
			buckets?: any;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetAudienceAggregationResponse;
	}
	/**
	 * No description
	 * @tags analytics
	 * @name Get3
	 * @summary Get
	 * @request GET:/v1/analytics/{tracker_id}
	 * @originalName get
	 * @duplicate
	 */
	export namespace Get3 {
		export type RequestParams = {
			/** Tracker Id */
			trackerId: string;
		};
		export type RequestQuery = {
			/** Order By Field */
			order_by_field?: string;
			/** Order By Direction */
			order_by_direction?: 'ASC' | 'DESC';
			/** Where Field */
			where_field?: string;
			/** Where Operator */
			where_operator?: 'contains' | 'eq' | 'ne';
			/** Where Value */
			where_value?: string;
			/** Search */
			search?: string;
			/** Limit */
			limit?: number;
			/** Offset */
			offset?: number;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetAnalyticsResponse;
	}
	/**
	 * No description
	 * @tags analytics, analytics
	 * @name Get4
	 * @summary Get Aggregations
	 * @request GET:/v1/analytics/{tracker_id}/aggregations
	 * @originalName get
	 * @duplicate
	 */
	export namespace Get4 {
		export type RequestParams = {
			/** Tracker Id */
			trackerId: string;
		};
		export type RequestQuery = {
			/** Agg Type */
			agg_type: 'count' | 'sum' | 'count_bucket_intervals' | 'count_bucket_values';
			/** Agg Field */
			agg_field: string;
			/** Where Field */
			where_field?: string;
			/** Where Operator */
			where_operator?: 'contains' | 'eq' | 'ne';
			/** Where Value */
			where_value?: string;
			/** Buckets */
			buckets?: any;
		};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetAggregationsResponse;
	}
	/**
	 * No description
	 * @tags wallet
	 * @name Get5
	 * @summary Get
	 * @request GET:/v1/wallet/attributes/{address}
	 * @originalName get
	 * @duplicate
	 */
	export namespace Get5 {
		export type RequestParams = {
			/** Address */
			address: string;
		};
		export type RequestQuery = {};
		export type RequestBody = never;
		export type RequestHeaders = {};
		export type ResponseBody = GetWalletAttributesResponse;
	}
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = '';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
		return keys
			.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
		[ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
						? JSON.stringify(property)
						: `${property}`
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
	};

	protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {})
			}
		};
	}

	protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<T> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
			...requestParams,
			headers: {
				...(requestParams.headers || {}),
				...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
			},
			signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
			body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
		}).then(async (response) => {
			const r = response as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data.data;
		});
	};
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	healthcheck = {
		/**
		 * No description
		 *
		 * @tags healthcheck
		 * @name Get
		 * @summary Health
		 * @request GET:/healthcheck/
		 */
		get: (params: RequestParams = {}) =>
			this.request<Record<string, string>, any>({
				path: `/healthcheck/`,
				method: 'GET',
				format: 'json',
				...params
			})
	};
	v1 = {
		/**
		 * No description
		 *
		 * @tags audience
		 * @name Get
		 * @summary Get
		 * @request GET:/v1/audience/{score_id}
		 */
		get: (
			scoreId: string,
			query?: {
				/** Order By Field */
				order_by_field?: string;
				/** Order By Direction */
				order_by_direction?: 'ASC' | 'DESC';
				/** Where Field */
				where_field?: string;
				/** Where Operator */
				where_operator?: 'contains' | 'eq' | 'ne';
				/** Where Value */
				where_value?: string;
				/** Search */
				search?: string;
				/** Limit */
				limit?: number;
				/** Offset */
				offset?: number;
			},
			params: RequestParams = {}
		) =>
			this.request<GetAudienceResponse, HTTPValidationError>({
				path: `/v1/audience/${scoreId}`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags audience
		 * @name Get2
		 * @summary Get Aggregation
		 * @request GET:/v1/audience/{score_id}/aggregation
		 * @originalName get
		 * @duplicate
		 */
		get2: (
			scoreId: string,
			query: {
				/** Agg Type */
				agg_type: 'count' | 'sum' | 'count_bucket_intervals' | 'count_bucket_values';
				/** Agg Field */
				agg_field: string;
				/** Where Field */
				where_field?: string;
				/** Where Operator */
				where_operator?: 'eq' | 'ne';
				/** Where Value */
				where_value?: string;
				/** Buckets */
				buckets?: any;
			},
			params: RequestParams = {}
		) =>
			this.request<GetAudienceAggregationResponse, HTTPValidationError>({
				path: `/v1/audience/${scoreId}/aggregation`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags analytics
		 * @name Get3
		 * @summary Get
		 * @request GET:/v1/analytics/{tracker_id}
		 * @originalName get
		 * @duplicate
		 */
		get3: (
			trackerId: string,
			query?: {
				/** Order By Field */
				order_by_field?: string;
				/** Order By Direction */
				order_by_direction?: 'ASC' | 'DESC';
				/** Where Field */
				where_field?: string;
				/** Where Operator */
				where_operator?: 'contains' | 'eq' | 'ne';
				/** Where Value */
				where_value?: string;
				/** Search */
				search?: string;
				/** Limit */
				limit?: number;
				/** Offset */
				offset?: number;
			},
			params: RequestParams = {}
		) =>
			this.request<GetAnalyticsResponse, HTTPValidationError>({
				path: `/v1/analytics/${trackerId}`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags analytics, analytics
		 * @name Get4
		 * @summary Get Aggregations
		 * @request GET:/v1/analytics/{tracker_id}/aggregations
		 * @originalName get
		 * @duplicate
		 */
		get4: (
			trackerId: string,
			query: {
				/** Agg Type */
				agg_type: 'count' | 'sum' | 'count_bucket_intervals' | 'count_bucket_values';
				/** Agg Field */
				agg_field: string;
				/** Where Field */
				where_field?: string;
				/** Where Operator */
				where_operator?: 'contains' | 'eq' | 'ne';
				/** Where Value */
				where_value?: string;
				/** Buckets */
				buckets?: any;
			},
			params: RequestParams = {}
		) =>
			this.request<GetAggregationsResponse, HTTPValidationError>({
				path: `/v1/analytics/${trackerId}/aggregations`,
				method: 'GET',
				query: query,
				format: 'json',
				...params
			}),

		/**
		 * No description
		 *
		 * @tags wallet
		 * @name Get5
		 * @summary Get
		 * @request GET:/v1/wallet/attributes/{address}
		 * @originalName get
		 * @duplicate
		 */
		get5: (address: string, params: RequestParams = {}) =>
			this.request<GetWalletAttributesResponse, HTTPValidationError>({
				path: `/v1/wallet/attributes/${address}`,
				method: 'GET',
				format: 'json',
				...params
			})
	};
}
