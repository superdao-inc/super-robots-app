import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { NewRobot } from 'src/features/robots/new/NewRobot';
import { useMintedBabyRobotByCurrentUserQuery, useRobotTokenOwnerQuery } from 'src/gql/babyRobot.generated';
import { NextPageWithLayout } from 'src/layouts';
import { featureToggles } from 'src/server/featureToggles.service';
import { RobotVersionContextProvider } from 'src/features/robots/context/robotVersionContext';
import { RobotMintAndWaitlistStatus } from 'src/types/types.generated';
import { getRobotsSidebarLayout } from 'src/layouts/robotsSidebarLayout';

type Props = {
	isUsingOddVersion: boolean;
};

const NewMintedRobotPage: NextPageWithLayout<Props> = (props) => {
	const { isUsingOddVersion } = props;

	return (
		<RobotVersionContextProvider isUsingOddVersion={isUsingOddVersion}>
			<NewRobot />
		</RobotVersionContextProvider>
	);
};

NewMintedRobotPage.getLayout = getRobotsSidebarLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req } = ctx;

	const userId = req.session?.userId;
	const isAuthorized = !!userId;

	if (!isAuthorized) {
		return {
			redirect: { destination: '/', permanent: false }
		};
	}

	const preloadResponse = await preloadCodeInvitationData(ctx);

	const headers = { cookie: req.headers.cookie || '' };

	const response = await useMintedBabyRobotByCurrentUserQuery.fetcher({}, headers)();

	const data = response?.mintedBabyRobotByCurrentUser;
	if (!data?.id || data.status === RobotMintAndWaitlistStatus.InWaitlist) {
		return {
			redirect: { destination: '/robots', permanent: false }
		};
	}

	if (data.status === RobotMintAndWaitlistStatus.Claimed && data.tokenId) {
		const ownerResponse = await useRobotTokenOwnerQuery.fetcher({ tokenId: data.tokenId }, headers)();

		if (ownerResponse?.robotTokenOwner?.owner) {
			return {
				redirect: { destination: `/robots/${data.tokenId}`, permanent: false }
			};
		}
	}

	const isUsingOddVersion = featureToggles.isEnabled('robot_versioning_use_odd_version');

	return {
		props: {
			isUsingOddVersion,

			isCodeFlowAvailable: preloadResponse.isCodeFlowAvailable,
			remainingCodeActivations: preloadResponse.remainingCodeActivations,

			og: {
				translations: {
					title: 'Meet Your Super Robot | Super Robots'
				}
			}
		}
	};
});

export default NewMintedRobotPage;
