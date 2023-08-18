import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { DemoCustomizeRobotContainer } from 'src/features/robots/customize/DemoCustomizeRobotContainer';
import { getRandomRobotImageName } from 'src/features/robots/customize/utils';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsLayout } from 'src/layouts/robotsLayout';
import { featureToggles } from 'src/server/featureToggles.service';

type Props = {
	isUsingOddVersion: boolean;
};

const DemoCustomizeRobotPage: NextPageWithLayout<Props> = (props) => {
	const { isUsingOddVersion } = props;

	const imageName = getRandomRobotImageName(isUsingOddVersion);

	return (
		<div className="w-full grow">
			<DemoCustomizeRobotContainer imageName={imageName} isUsingOddVersion={isUsingOddVersion} />
		</div>
	);
};

DemoCustomizeRobotPage.getLayout = getRobotsLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const userId = ctx.req.session?.userId;

	const isUsingOddVersion = featureToggles.isEnabled('robot_versioning_use_odd_version');

	let preloadResponse;

	if (userId) {
		preloadResponse = await preloadCodeInvitationData(ctx);
	}

	return {
		props: {
			withDemo: true,
			withoutFooter: true,
			isUsingOddVersion,

			og: {
				translations: {
					title: 'Demo | Super Robots',
					description: 'Try our demo customization for Super Robots by Superdao'
				}
			},

			...preloadResponse
		}
	};
});

export default DemoCustomizeRobotPage;
