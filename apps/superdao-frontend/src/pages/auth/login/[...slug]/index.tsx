import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { prefetchData, SSR } from 'src/client/ssr';

import { LoginLayout } from 'src/layouts/loginLayout';
import { AuthUI } from 'src/features/auth';

const RedirectPage: NextPage = () => {
	const { push, query } = useRouter();

	const handleRedirect = () => {
		if (query.slug?.[0] && typeof query.slug[0] === 'string' && query.slug[0].startsWith('/')) {
			push(query.slug[0]);
		}
	};

	return (
		<LoginLayout>
			<AuthUI.SharedAuthentication onSuccess={handleRedirect} />
		</LoginLayout>
	);
};

export const getServerSideProps = SSR(async (ctx) => {
	const [_, getProps] = await prefetchData(ctx);

	return { props: getProps() };
});

export default RedirectPage;
