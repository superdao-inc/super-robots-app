import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { RobotsList } from 'src/features/robots/list/RobotsList';
import { useUserRobotMintIsInProgressQuery, useUserRobotsTokenIdsQuery } from 'src/gql/babyRobot.generated';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsSidebarLayout } from 'src/layouts/robotsSidebarLayout';
import { featureToggles } from 'src/server/featureToggles.service';

type Props = {
	robotMintIsInProgress: boolean;
	robotTokens: string[];
	isUsingOddVersion: boolean;
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
};

const MintedRobotsPage: NextPageWithLayout<Props> = (props) => {
	const { robotTokens, isUsingOddVersion, robotMintIsInProgress } = props;

	return (
		<div className="w-full grow">
			<RobotsList
				robotMintIsInProgress={robotMintIsInProgress}
				robotTokens={robotTokens}
				isUsingOddVersion={isUsingOddVersion}
			/>
		</div>
	);
};

MintedRobotsPage.getLayout = getRobotsSidebarLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req } = ctx;

	const userId = req.session?.userId;
	const isAuthorized = !!userId;

	const headers = { cookie: req.headers.cookie || '' };

	if (!isAuthorized) {
		return {
			redirect: { destination: '/', permanent: false }
		};
	}

	const preloadResponse = await preloadCodeInvitationData(ctx);

	const response = await useUserRobotsTokenIdsQuery.fetcher({}, headers)();
	const robotTokens = response?.userRobotsTokenIds || [];

	const mintIsInProgressQuery = await useUserRobotMintIsInProgressQuery.fetcher({}, headers)();
	const robotMintIsInProgress = !!mintIsInProgressQuery?.userRobotMintIsInProgress;

	const isUsingOddVersion = featureToggles.isEnabled('robot_versioning_use_odd_version');

	return {
		props: {
			robotMintIsInProgress,
			robotTokens,
			isUsingOddVersion,

			isCodeFlowAvailable: preloadResponse.isCodeFlowAvailable,
			remainingCodeActivations: preloadResponse.remainingCodeActivations,

			og: {
				translations: {
					title: 'Owner App | Super Robots',
					description:
						'An evolving collection of randomly generated 3D bots reflecting your own vibe and preferences by Superdao'
				}
			}
		}
	};
});

export default MintedRobotsPage;
