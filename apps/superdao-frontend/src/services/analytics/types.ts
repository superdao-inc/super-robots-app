export type AnalyticsState = {
	context: {
		sessionId: string;
		os?: {
			name: string;
		};
		userAgent?: string; // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
		timezone?: string; // 'Asia/Makassar'
		locale?: string; // 'en-GB'
		campaign: {
			id?: string; // Used to identify which ads campaign this referral references. Use utm_id to identify a specific ads campaign.
			source?: string; // Use utm_source to identify a search engine, newsletter name, or other source.
			medium?: string; // Use utm_medium to identify a medium such as email or cost-per-click.
			name?: string; // Used for keyword analysis. Use utm_campaign to identify a specific product promotion or strategic campaign.
			term?: string; // Used for paid search. Use utm_term to note the keywords for this ad.
			content?: string; // Used for A/B testing and content-targeted ads. Use utm_content to differentiate ads or links that point to the same URL.
		};
		referrer?: string;
		initialized: boolean;
		app: string;
		version: null | string;
		debug: boolean;
		offline: boolean;
		library: {
			name: string;
			version: string;
		};
	};
	user: {
		userId?: string;
		anonymousId: string;
		// traits: {}
	};

	page: {
		last: {
			properties: AnalyticsPageProperties;
			meta: AnalyticsPageMeta;
			options: Record<string, any>;
		};
		history: {
			properties: AnalyticsPageProperties;
			meta: AnalyticsPageMeta;
			options: Record<string, any>;
		}[];
	};
};

export type AnalyticsSession = {
	id: string;
	created: number;
	createdAt: Date;
	expires: number;
	expiresAt: Date;
	elapsed: number;
	remaining: number;
	isNew: boolean;
};

export enum AnalyticPayloadType {
	PAGE = 'page',
	TRACK = 'track'
}

export type OfferAnalyticsContext = {
	advertiserId: string | undefined;
	campaignId: string | undefined;
	offerId: string | undefined;
};

export type AnalyticsPagePayload = {
	userId?: string;
	type: AnalyticPayloadType.PAGE;
	properties: AnalyticsPageProperties;
	anonymousId: string;
	meta: AnalyticsPageMeta;
	options: AnalyticsPageOptions;
};

export type AnalyticsPageOptions = OfferAnalyticsContext & Record<string, any>;

export type AnalyticsPageProperties = {
	referrer?: string;
	title: string;
	hash: string;
	url: string;
	path: string;
	search: string;
	width: number;
	height: number;
};

export type AnalyticsPageMeta = {
	rid: string;
	ts: number;
	hasCallback: boolean;
};

export type AnalyticsTrackPayload = {
	type: AnalyticPayloadType.TRACK;
	event: AnalyticsTrackEventType;
	properties: AnalyticsTrackProperties;
	userId?: string;
	anonymousId: string;
	meta: {
		rid: string;
		ts: number;
		hasCallback: boolean;
	};
	options: Record<string, any>;
};

export type AnalyticsTrackProperties = OfferAnalyticsContext;

export enum AnalyticsTrackEventType {
	PAGE_VIEW = 'PAGE_VIEW',
	WALLET_CONNECT = 'WALLET_CONNECT',
	TARGET_ACTION_MINT = 'TARGET_ACTION_MINT'
}
