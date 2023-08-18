const Sentry = require('@sentry/nextjs');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { i18n } = require('./next-i18next.config');
const withImages = require('next-images');
const withNextCircularDeps = require('next-circular-dependency');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});
const withTM = require('next-transpile-modules')(['@sd/errors', '@sd/superdao-shared']);

/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'dist',
	exclude: /node_modules/, // next-circular-dependency
	poweredByHeader: false,
	reactStrictMode: true,
	i18n,
	eslint: {
		ignoreDuringBuilds: true
	},
	webpack: (config, { webpack }) => {
		config.module.rules.push({
			test: /.*\.(js|mjs|jsx|ts|tsx)$/,
			sideEffects: false
		});

		return config;
	},
	onDemandEntries: {
		// period (in ms) where the server will keep pages in the buffer
		maxInactiveAge: 120 * 1000,
		// number of pages that should be kept simultaneously without being disposed
		pagesBufferLength: 10
	},
	compiler: {
		emotion: true
	},
	swcMinify: false, // TODO: changed to true due to fix of this issues https://github.com/uploadcare/react-widget/issues/351
	async redirects() {
		return [];
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		// Get it on the client via "import getConfig from 'next/config';"
		APP_ENV: process.env.APP_ENV,
		APP_ENV_SLUG: process.env.APP_ENV_SLUG,
		INFURA_POLYGON_MAINNET_API_KEY: process.env.INFURA_POLYGON_MAINNET_API_KEY,
		POLYGON_UPDATE_MANAGER_PROXY: process.env.POLYGON_UPDATE_MANAGER_PROXY,
		MAGIC_PUBLISHABLE_KEY: process.env.MAGIC_PUBLISHABLE_KEY,
		BACKEND_SERVICE_URL: process.env.BACKEND_SERVICE_URL,
		UNLEASH_PROXY_URL: process.env.UNLEASH_PROXY_URL,
		UNLEASH_PROXY_CLIENT_KEY: process.env.UNLEASH_PROXY_CLIENT_KEY,
		RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
		WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID
	},
	sentry: {
		hideSourceMaps: process.env.APP_ENV === 'prod'
	}
};

module.exports = (phase) => {
	// Plugins
	const plugins = [withImages];
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		plugins.push(withTM);
		plugins.push(withNextCircularDeps);
	}
	if (process.env.ANALYZE === 'true') {
		plugins.push(withBundleAnalyzer);
		plugins.push(withTM);
	}
	if (process.env.APP_ENV !== 'dev') plugins.push(Sentry.withSentryConfig);

	return plugins.reduce((config, plugin) => plugin(config), { ...nextConfig });
};
