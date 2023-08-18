import Analytics, { AnalyticsInstance, AnalyticsPlugin } from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';
import { getSession } from '@analytics/session-utils';

import { isDev, isProduction, isStage } from 'src/constants/environment';

import { AnalyticsPagePayload, AnalyticsSession, AnalyticsTrackPayload } from './types';
import { UserSession } from 'src/services/UserSession';

export const USER_SESSION_KEY = '__user_session';
export const USER_SESSION_DURATION = isStage || isDev ? 5 : 30; // in minutes

const analyticPluginSuperdao = (): AnalyticsPlugin => {
	return {
		name: 'analytics-plugin-superdao',
		bootstrap: ({ instance }: { payload: AnalyticsPagePayload; instance: AnalyticsInstance }) => {
			const session: AnalyticsSession = getSession(USER_SESSION_DURATION);

			try {
				instance.storage.setItem(USER_SESSION_KEY, session);
			} catch (error) {
				console.error(error);
			}
		},
		page: () => {
			const userWalletAddress = UserSession.getUserWallet();

			// @ts-ignore
			window.sdt?.page({ userWalletAddress });
		},
		track: ({ payload }: { payload: AnalyticsTrackPayload }) => {
			const eventType = payload.event;
			const userWalletAddress = UserSession.getUserWallet();

			// @ts-ignore
			window.sdt?.track(eventType, { userWalletAddress });
		}
		// identify: ({ payload }: { payload: AnalyticsTrackPayload; instance: AnalyticsInstance }) => {}
	};
};

const analytics = Analytics({
	app: 'robot',
	debug: isDev,
	plugins: [
		googleTagManager({
			containerId: 'GTM-M3GRF36', //TODO: need change here with GTM-M3GRF36 ?
			enabled: isProduction
		}),
		analyticPluginSuperdao()
	]
});

export default analytics;
