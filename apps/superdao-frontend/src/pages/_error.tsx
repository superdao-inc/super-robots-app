import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import DefaultErrorComponent from 'next/error';
import { AppError } from 'src/services/errors';
import { Body, Button, PageContent, Title1 } from 'src/components';

const ErrorPage: NextPage = () => {
	const { replace } = useRouter();

	const handleAction = () => {
		replace('/');
	};

	return (
		<PageContent>
			<div className="relative flex h-screen flex-col items-center justify-center pt-[100px]">
				<Head>
					<title>Not found</title>
				</Head>

				<div className="absolute top-9 left-1/2 h-6 -translate-x-1/2">
					<Image src="/assets/superdaoUpdatedHorizontalLogo.svg" width={160} height={24} />
				</div>

				<Image src="/assets/arts/mascotSeat.svg" width={160} height={160} />

				<Title1 className="mt-[35px]">Page not found</Title1>

				<Body className="text-foregroundSecondary mt-2 text-center">
					The page you are trying to access does not exist
					<br />
					or has been moved. Try going back to our homepage
				</Body>

				<Button className="mt-8" size="lg" label="Go to homepage" color="accentPrimary" onClick={handleAction} />
			</div>
		</PageContent>
	);
};

ErrorPage.getInitialProps = async (ctx) => {
	AppError.capture(ctx.err, { options: { silent: true } });
	return DefaultErrorComponent.getInitialProps(ctx);
};

export default ErrorPage;
