import { Sentry } from '@sd/errors';

Sentry.init({
	environment: process.env.NEXT_PUBLIC_APP_ENV,
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	tracesSampleRate: 0.5,
	sampleRate: 1,
	maxValueLength: 400,
	beforeSendTransaction: (e) => {
		const isKubeProbe = e.request?.headers && e.request.headers['user-agent'].includes('kube-probe');

		// Filter transactions to avoid spamming Sentry
		// If null is returned, the transaction will not be sent
		if (isKubeProbe) {
			return null;
		}
	}
});
