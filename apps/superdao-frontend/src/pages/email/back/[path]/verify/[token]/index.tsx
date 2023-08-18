import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EmailVerificationOptions } from '@sd/superdao-shared';

import { EmailVerificationUI, EmailVerificationAPI } from 'src/features/emailVerification';
import { PageContent } from 'src/components';
import { CustomHead } from 'src/components/head';
import { SSR } from 'src/client/ssr';
import { Logo } from 'src/features/topMenu/logo';

const Index: NextPage<EmailVerificationOptions> = ({ status, email }) => {
	const { query } = useRouter();
	const { path } = query;

	const decodedBackPath = atob(decodeURIComponent(path as string));

	return (
		<div className="xs:px-6 flex min-h-full justify-center px-0 pb-6">
			<div className="w-full max-w-[1080px] flex-1 py-7">
				<CustomHead main="Email verification" description="Superdao email verification" />
				<Link href="/" passHref>
					<a className="z-1 xs:px-0 absolute flex px-4">
						<Logo />
					</a>
				</Link>
				<PageContent className="h-full" columnClassName="flex items-center justify-center">
					<EmailVerificationUI.EmailVerification status={status} email={email} backPath={decodedBackPath} />
				</PageContent>
			</div>
		</div>
	);
};

export const getServerSideProps = SSR(async (ctx) => {
	const { token } = ctx.query;

	if (typeof token !== 'string') throw Error('Search parameter "token" is invalid');

	const res = await EmailVerificationAPI.emailVerificationRequest({ token });

	return { props: res };
});

export default Index;
