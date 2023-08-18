import absoluteUrl from 'next-absolute-url';
import { getHostname, preloadCodeInvitationData, SSR } from 'src/client/ssr';
import { NextPageWithLayout } from 'src/layouts';
import { featureToggles } from 'src/server/featureToggles.service';
import { Robot } from 'src/features/robots/robot/Robot';
import { getProtocol } from 'src/utils/protocol';
import { RobotVersionContextProvider } from 'src/features/robots/context/robotVersionContext';
import { RobotDataContextProvider } from 'src/features/robots/context/robotDataContext';
import {
	MintedBabyRobotInfoWithImageMetaAndOwnerByTokenIdQuery,
	useIsRobotUpdatingQuery,
	useMintedBabyRobotInfoWithImageMetaAndOwnerByTokenIdQuery
} from 'src/gql/babyRobot.generated';
import { getRobotsSidebarLayout } from 'src/layouts/robotsSidebarLayout';

type Props = {
	isUsingOddVersion: boolean;
	tokenId: string;
	protocol: string;
	hostname: string;
	robot: MintedBabyRobotInfoWithImageMetaAndOwnerByTokenIdQuery['mintedBabyRobotInfoWithImageMetaAndOwnerByTokenId'];
	updatingStatus: boolean;
	og: {
		image: string;
		translations: {
			title: string;
			description: string;
		};
		origin: string;
	};
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
};

const Page: NextPageWithLayout<Props> = (props) => {
	const { isUsingOddVersion, tokenId, protocol, hostname, robot, updatingStatus } = props;

	return (
		<RobotVersionContextProvider isUsingOddVersion={isUsingOddVersion}>
			<RobotDataContextProvider tokenId={tokenId} protocol={protocol} hostname={hostname}>
				<Robot
					imageName={robot?.imageName || ''}
					propertyTraits={robot?.propertyTraits || []}
					owner={robot?.owner}
					updatingStatus={updatingStatus}
				/>
			</RobotDataContextProvider>
		</RobotVersionContextProvider>
	);
};

Page.getLayout = getRobotsSidebarLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req, query } = ctx;
	const tokenId = query?.tokenId?.toString();

	const userId = req.session?.userId;

	let preloadResponse;

	if (userId) {
		preloadResponse = await preloadCodeInvitationData(ctx);
	}

	const headers = { cookie: req.headers.cookie || '' };

	const { origin } = absoluteUrl(req);

	if (!tokenId) {
		return {
			redirect: { destination: '/', permanent: false }
		};
	}

	const protocol = getProtocol(ctx);
	const hostname = getHostname(ctx);

	const isUsingOddVersion = featureToggles.isEnabled('robot_versioning_use_odd_version');

	const robot = await useMintedBabyRobotInfoWithImageMetaAndOwnerByTokenIdQuery
		.fetcher({ tokenId }, headers)()
		.then((res) => res?.mintedBabyRobotInfoWithImageMetaAndOwnerByTokenId);

	if (!robot) {
		return {
			redirect: { destination: '/', permanent: false }
		};
	}

	const { isImageInStorage, imageUrl } = robot;

	let updatingStatus = false;

	if (userId) {
		const updatingResponse = await useIsRobotUpdatingQuery.fetcher({ tokenId: tokenId as string }, headers)();
		updatingStatus = updatingResponse?.isRobotUpdating.status ?? false;
	}

	const props: Props = {
		isUsingOddVersion,
		protocol,
		hostname,
		tokenId,
		robot,
		updatingStatus,
		og: {
			image: isImageInStorage ? imageUrl : 'https://robot.superdao.co/robot-updating.png',
			translations: {
				title: `Super Robot #${tokenId} | Super Robots`,
				description: `Meet Super Robot #${tokenId}. Super Robots is an evolving collection of randomly generated 3D bots reflecting your own vibe and preferences by Superdao`
			},
			origin
		},

		isCodeFlowAvailable: preloadResponse?.isCodeFlowAvailable ?? false,
		remainingCodeActivations: preloadResponse?.remainingCodeActivations ?? 0
	};

	return {
		props
	};
});

export default Page;
