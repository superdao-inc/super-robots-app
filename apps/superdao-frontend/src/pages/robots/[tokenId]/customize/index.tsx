import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { CustomizeRobotContainer } from 'src/features/robots/customize/CustomizeRobotContainer';
import { useIsRobotUpdatingQuery, useIsUserRobotTokenOwnerQuery } from 'src/gql/babyRobot.generated';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsLayout } from 'src/layouts/robotsLayout';
import { featureToggles } from 'src/server/featureToggles.service';

type Props = {
	isUsingOddVersion: boolean;
};

const CustomizeRobotPage: NextPageWithLayout<Props> = (props) => {
	const { isUsingOddVersion } = props;

	return (
		<div className="w-full grow">
			<CustomizeRobotContainer isUsingOddVersion={isUsingOddVersion} />
		</div>
	);
};

CustomizeRobotPage.getLayout = getRobotsLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req, query } = ctx;
	const { tokenId } = query;

	const userId = req.session?.userId;
	const isAuthorized = !!userId;

	const headers = { cookie: req.headers.cookie || '' };

	if (!tokenId) {
		return {
			redirect: { destination: '/', permanent: false }
		};
	}

	if (!isAuthorized) {
		return {
			redirect: { destination: `/robots/${tokenId}`, permanent: false }
		};
	}

	const response = await useIsUserRobotTokenOwnerQuery.fetcher({ tokenId: tokenId as string }, headers)();

	const isUserOwnerOfToken = response?.isUserRobotTokenOwner;

	if (!isUserOwnerOfToken) {
		return {
			redirect: { destination: `/robots/${tokenId}`, permanent: false }
		};
	}

	const updatingResponse = await useIsRobotUpdatingQuery.fetcher({ tokenId: tokenId as string }, headers)();
	const updatingStatus = updatingResponse?.isRobotUpdating.status;

	if (updatingStatus) {
		return {
			redirect: { destination: `/robots/${tokenId}`, permanent: false }
		};
	}

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
					title: 'Customization | Super Robots',
					description: 'Customize your Robot NFT as you like'
				}
			},

			...preloadResponse
		}
	};
});

export default CustomizeRobotPage;
