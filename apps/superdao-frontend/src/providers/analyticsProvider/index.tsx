import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import analytics from 'src/services/analytics';
import { AnalyticsTrackEventType } from 'src/services/analytics/types';

import { usePrevious } from 'src/hooks/usePrevious';

type AnalyticsContextType = {
	trackCustomAnalyticsEvent(type: AnalyticsTrackEventType): void;
};

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useAnalytics = () => {
	const walletContext = useContext(AnalyticsContext);

	if (!walletContext) throw new Error('`useAnalytics` can not be used outside `AnalyticsContext`');

	return walletContext;
};

type Props = {
	children?: React.ReactNode;
};

const pagesWithCustomPageView = ['/r/[slug]'];

const useTrackPageView = () => {
	const { asPath: path, pathname } = useRouter();
	const isAppInitPageViewPushed = useRef(false);

	// Handle router changes
	const prevPath = usePrevious(path);
	useEffect(() => {
		if (pagesWithCustomPageView.includes(pathname)) return;

		if (!isAppInitPageViewPushed.current) {
			isAppInitPageViewPushed.current = true;

			void analytics.page();
			return;
		}

		if (path === prevPath) return;

		void analytics.page();
	}, [path, prevPath, pathname]);
};

export const AnalyticsProvider: React.FC<Props> = ({ children }) => {
	useTrackPageView();

	const trackCustomAnalyticsEvent = useCallback((type: AnalyticsTrackEventType) => {
		void analytics.track(type);
	}, []);

	const contextValue = useMemo(
		() => ({
			trackCustomAnalyticsEvent
		}),
		[trackCustomAnalyticsEvent]
	);

	return <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>;
};
