import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation, SSRConfig, useTranslation } from 'next-i18next';
import { DefaultOptions, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import axios, { AxiosError } from 'axios';
import { css, Global } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-datepicker/dist/react-datepicker.css';

import { isProduction } from 'src/constants';
import { FEATURES } from '@sd/superdao-shared';
import { datepickerStyle } from 'src/utils/datepicker';
import { CustomToaster } from 'src/components';
import { WalletProvider } from 'src/providers/walletProvider';
import { AnalyticsProvider } from 'src/providers/analyticsProvider';
import { FeatureTogglesProvider } from 'src/providers/featureTogglesProvider';
import { NextPageWithLayout } from 'src/layouts';
import { LayoutProvider } from 'src/providers/layoutProvider';
import { AuthUI } from 'src/features/auth';
import '../style/global.css';
import 'src/features/robots/header/HeaderBurger/HeaderBurger.css';
import { MetaParams } from 'src/types/metaparams';
import Script from 'next/script';

const defaultOptions: DefaultOptions<Error | AxiosError> = {
	queries: {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: (failureCount, error) => {
			if (axios.isAxiosError(error)) {
				const { response } = error;
				const status = response ? response.status : 0;
				const isBadRequest = status >= 400 && status < 500;

				return failureCount < 3 && !isBadRequest;
			}

			return false;
		},
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
	}
};

const queryClient = new QueryClient({
	// @ts-expect-error
	defaultOptions
});

/**
 * FIXME: Add types
 */
type PageProps = {
	dehydratedState: any;
	features: any;
	og?: MetaParams;
	withDecorationOverlayStyles?: boolean;
};

type AppPropsWithLayout = AppProps<PageProps & SSRConfig> & {
	Component: NextPageWithLayout;
};

const SuperdaoApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const { t } = useTranslation();
	const router = useRouter();

	const googleTagManagerScript = isProduction ? (
		<Script id="google-tag-manager" strategy="afterInteractive">
			{`
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-M3GRF36');
				`}
		</Script>
	) : null;

	const { dehydratedState, features, _nextI18Next, og, withDecorationOverlayStyles, ...layoutProps } = pageProps;
	const isMetaTransactionEnabled = features?.[FEATURES.CORE_GASLESS] ?? false;
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<title>{og?.translations?.title ?? t('meta.title')}</title>
				<meta name="description" content={og?.translations?.description ?? t('meta.description')} key="description" />

				<link rel="apple-touch-icon" sizes="57x57" href="/meta/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/meta/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/meta/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/meta/apple-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/meta/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/meta/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/meta/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/meta/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/meta/favicon-192x192.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/meta/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />

				<meta name="msapplication-TileImage" content="/meta/ms-icon-144x144.png" />
				<meta name="msapplication-TileColor" content="#1b202a" />
				<meta name="theme-color" content="#1b202a" />

				{og && (
					<>
						<meta property="og:type" content="website" />

						<meta property="og:image:width" content="1200" />
						<meta property="og:image:height" content="630" />

						<meta name="twitter:card" content="summary_large_image" />

						{og.origin && <meta property="og:url" content={og.origin + router.asPath} />}

						{og.image && <meta property="og:image" content={og.image} />}
						{og.image && <meta name="twitter:image" content={og.image} />}

						{og.translations?.title && <meta property="og:title" content={og.translations.title} />}
						{og.translations?.title && <meta name="twitter:title" content={og.translations.title} />}
						{og.translations?.title && <meta name="twitter:text:title" content={og.translations.title} />}

						{og.translations?.description && <meta property="og:description" content={og.translations.description} />}
						{og.translations?.description && (
							<meta property="twitter:description" content={og.translations.description} />
						)}
					</>
				)}
			</Head>

			{googleTagManagerScript}

			{withDecorationOverlayStyles && <Global styles={decorationOverlayStyles} />}
			<Global styles={globalStyles} />
			<Global styles={datepickerStyle} />
			{/* @ts-expect-error TODO: move to @tanstack/react-query to support React v18 */}
			<QueryClientProvider client={queryClient}>
				{/* @ts-expect-error TODO: move to @tanstack/react-query to support React v18 */}
				<Hydrate state={dehydratedState}>
					<FeatureTogglesProvider>
						<AnalyticsProvider>
							<WalletProvider isMetaTransactionEnabled={isMetaTransactionEnabled}>
								<AuthUI.AuthModalProvider>
									<LayoutProvider>{getLayout(<Component {...layoutProps} />)}</LayoutProvider>
									<AuthUI.AuthModal />
								</AuthUI.AuthModalProvider>
							</WalletProvider>
						</AnalyticsProvider>
					</FeatureTogglesProvider>

					<CustomToaster />
				</Hydrate>
				<ReactQueryDevtools position="bottom-right" />
			</QueryClientProvider>
		</>
	);
};

export default appWithTranslation(SuperdaoApp);

const decorationOverlayStyles = css`
	body,
	html {
		overflow-x: hidden;
	}
`;

const globalStyles = css`
	body,
	html {
		scroll-behavior: smooth;

		margin: 0;
		padding: 0;
		background-color: #191b21;

		font-family: 'Space Mono', monospace;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body {
		width: 100%;
	}

	* {
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
	}

	body.ReactModal__Body--open {
		overflow: hidden;
	}

	.ReactModal__Overlay {
		opacity: 0;
		transition: opacity 200ms ease-in-out;
	}

	.ReactModal__Overlay--after-open {
		opacity: 1;
	}

	.ReactModal__Overlay--before-close {
		opacity: 0;
	}
`;
