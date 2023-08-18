import { ReactElement } from 'react';
import useScrollHook from 'react-infinite-scroll-hook';

type Params = {
	isLoading: boolean;
	hasNextPage: boolean | undefined;
	fetchNextPage: () => void;
};

export const useInfiniteScroll = (params: Params) => {
	const { isLoading, hasNextPage, fetchNextPage } = params;

	const [sentryRef] = useScrollHook({
		loading: isLoading,
		hasNextPage: hasNextPage || false,
		onLoadMore: fetchNextPage,
		disabled: false,
		rootMargin: '0px 0px 250px 0px'
	});

	const renderSentry = (loader?: ReactElement) => {
		return <div ref={sentryRef}>{isLoading || hasNextPage ? loader : null}</div>;
	};

	return [renderSentry] as const;
};
