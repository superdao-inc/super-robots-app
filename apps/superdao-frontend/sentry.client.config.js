import {
	BrowserClient,
	Breadcrumbs,
	Dedupe,
	defaultStackParser,
	getCurrentHub,
	GlobalHandlers,
	makeFetchTransport,
	LinkedErrors
} from '@sentry/browser';

const client = new BrowserClient({
	environment: process.env.NEXT_PUBLIC_APP_ENV,
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0,
	sampleRate: 1,
	maxValueLength: 400,

	transport: makeFetchTransport,
	stackParser: defaultStackParser,
	// Only the integrations listed here will be used
	integrations: [new Breadcrumbs(), new GlobalHandlers(), new LinkedErrors(), new Dedupe()]
});

getCurrentHub().bindClient(client);
