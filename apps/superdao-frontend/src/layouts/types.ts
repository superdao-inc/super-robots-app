import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type NextPageWithLayout<T = {}> = NextPage<T> & {
	getLayout?: (page: ReactElement) => ReactNode;
};
