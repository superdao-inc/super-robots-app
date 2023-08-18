import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { FaqContainer } from 'src/features/babyRobot/faq/FaqContainer';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsLayout } from 'src/layouts/robotsLayout';

type Props = {};

const FaqPage: NextPageWithLayout<Props> = () => {
	return (
		<div className="w-full grow">
			<FaqContainer />
		</div>
	);
};

FaqPage.getLayout = getRobotsLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req } = ctx;

	const userId = req.session?.userId;

	let preloadResponse;

	if (userId) {
		preloadResponse = await preloadCodeInvitationData(ctx);
	}

	return {
		props: {
			withDemo: true,
			og: {
				translations: {
					title: 'FAQ | Super Robots',
					description: 'Find the answers to the Frequently Asked Questions about Super Robots by Superdao'
				}
			},
			...preloadResponse
		}
	};
});

export default FaqPage;
