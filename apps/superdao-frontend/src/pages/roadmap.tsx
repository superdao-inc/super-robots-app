import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { RoadmapContainer } from 'src/features/babyRobot/roadmap/RoadmapContainer';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsLayout } from 'src/layouts/robotsLayout';

type Props = {
	withDecorationOverlay: boolean;
};

const RoadmapPage: NextPageWithLayout<Props> = () => {
	return (
		<div className="w-full grow">
			<RoadmapContainer />
		</div>
	);
};

RoadmapPage.getLayout = getRobotsLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req } = ctx;

	const userId = req.session?.userId;

	let preloadResponse;

	if (userId) {
		preloadResponse = await preloadCodeInvitationData(ctx);
	}

	return {
		props: {
			withDecorationOverlay: true,
			withDecorationOverlayStyles: true,
			withDemo: true,
			og: {
				translations: {
					title: 'Roadmap | Super Robots',
					description: 'The roadmap and upcoming features of the Super Robots NFT project by Superdao'
				}
			},
			...preloadResponse
		}
	};
});

export default RoadmapPage;
