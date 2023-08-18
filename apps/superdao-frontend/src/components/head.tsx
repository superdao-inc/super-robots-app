import Head from 'next/head';
import { ReactNode } from 'react';
import { getOptimizedFileUrl } from 'src/utils/upload';

export type HeadProps = {
	main: string;
	additional?: string;
	description: string;
	avatar?: string | null;
	addon?: string | ReactNode;
};

export const CustomHead = ({ main, additional, description, avatar, addon }: HeadProps) => {
	// https://github.com/vercel/next.js/discussions/38256
	const titleContent = `${main}${additional ? ` · ${additional}` : ''}`;

	return (
		<Head>
			<title>{titleContent}</title>
			<meta property="title" content={main} key="title" />
			<meta property="description" content={description} key="description" />
			{avatar ? <meta property="og:image" content={getOptimizedFileUrl(avatar)} /> : null}
			{addon}
		</Head>
	);
};
