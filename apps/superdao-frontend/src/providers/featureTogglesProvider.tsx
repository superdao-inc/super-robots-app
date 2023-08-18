import { FC, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { IMutableContext } from '@unleash/proxy-client-react';
import { IConfig as IUnleashProxyClientConfig } from 'unleash-proxy-client';
const FlagProvider = dynamic(() => import('@unleash/proxy-client-react'), { ssr: false });

import { config } from 'src/constants';

const unleashProxyClientConfig: IUnleashProxyClientConfig = {
	url: config.unleashProxy.url,
	clientKey: config.unleashProxy.clientKey,
	appName: config.unleashProxy.appName,
	environment: config.unleashProxy.environment
};

export interface FeatureToggleContext extends IMutableContext {
	daoId: string;
}

export const FeatureTogglesProvider: FC<PropsWithChildren> = ({ children }) => {
	return <FlagProvider config={unleashProxyClientConfig}>{children}</FlagProvider>;
};
