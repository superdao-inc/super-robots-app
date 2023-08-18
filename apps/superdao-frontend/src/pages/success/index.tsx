import absoluteUrl from 'next-absolute-url';

import { getHostname, preloadCodeInvitationData, SSR } from 'src/client/ssr';
import { NextPageWithLayout } from 'src/layouts';
import { getProtocol } from 'src/utils/protocol';
import { BabyRobotSuccessV2 } from 'src/features/babyRobot/mintv2/BabyRobotSuccessV2';
import { ConfettiCanvas } from 'src/components';
import { useMintedBabyRobotInfoWithImageMetaByWalletQuery } from 'src/gql/babyRobot.generated';
import { featureToggles } from 'src/server/featureToggles.service';
import { getRobotsLayout } from 'src/layouts/robotsLayout';

type Props = {
	isUsingOddVersion: boolean;
	imageName: string;
	babyRobotUrl: string;
	pageFullUrl: string;
	og: {
		image: string;
		translations: {
			title: string;
			description: string;
		};
		origin: string;
	};
};

const SuccessPage: NextPageWithLayout<Props> = (props) => (
	<div className="w-full grow self-center py-6">
		<BabyRobotSuccessV2 isUsingOddVersion={props.isUsingOddVersion} imageName={props.imageName} />
		<ConfettiCanvas position="fixed" />
	</div>
);

SuccessPage.getLayout = getRobotsLayout;

export default SuccessPage;

export const getServerSideProps = SSR(async (ctx) => {
	const { req } = ctx;

	const userId = req.session?.userId;

	const { origin } = absoluteUrl(req);

	const protocol = getProtocol(ctx);
	const hostname = getHostname(ctx);

	const pageFullUrl = `${protocol}${hostname}`;

	const headers = { cookie: req.headers.cookie || '' };
	const walletAddress = ctx.query?.wallet;

	if (!walletAddress || typeof walletAddress !== 'string') {
		return {
			redirect: { destination: '/', permanent: false }
		};
	}

	let imageName;
	let babyRobotUrl;

	try {
		const response = await useMintedBabyRobotInfoWithImageMetaByWalletQuery.fetcher(
			{ walletAddress: walletAddress.toLowerCase() },
			headers
		)();

		imageName = response?.mintedBabyRobotInfoWithImageMetaByWallet?.imageName;
		babyRobotUrl = response?.mintedBabyRobotInfoWithImageMetaByWallet?.imageUrl;

		if (!imageName || !babyRobotUrl) {
			return {
				redirect: { destination: '/', permanent: false }
			};
		}
	} catch (e) {
		return {
			redirect: { destination: '/', permanent: false }
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
			isUsingOddVersion,
			imageName,
			babyRobotUrl,
			pageFullUrl,
			withCloseAuthModal: true,
			withoutFooter: true,
			og: {
				image: babyRobotUrl,
				translations: {
					title: 'Super Robot',
					description: `Own your Superdao Robot`
				},
				origin
			},

			...preloadResponse
		}
	};
});
