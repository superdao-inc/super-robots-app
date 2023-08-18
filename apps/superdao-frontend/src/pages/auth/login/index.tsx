import { NextPage } from 'next';

import { useRouter } from 'next/router';
import { prefetchData, SSR } from 'src/client/ssr';

import { LoginLayout } from 'src/layouts/loginLayout';
import { AuthUI } from 'src/features/auth';

const LoginPage: NextPage = () => {
	const { push, query } = useRouter();

	const handleRedirect = () => {
		if (query) {
			if (query.from) {
				push(query.from.toString());
				return;
			}
			if (query.to) {
				push(query.to.toString());
				return;
			}
		}

		push('/');
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

export default LoginPage;
