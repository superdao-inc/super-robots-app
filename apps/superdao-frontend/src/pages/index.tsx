import absoluteUrl from 'next-absolute-url';
import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { BabyRobotMintV2 } from 'src/features/babyRobot/mintv2/BabyRobotMintV2';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsLayout } from 'src/layouts/robotsLayout';
import { featureToggles } from 'src/server/featureToggles.service';

type Props = {
	withoutVerifyModal: boolean;
	isInviteFlowOn: boolean;
	isMintTurnedOff: boolean;
};

const MintBabyRobotPage: NextPageWithLayout<Props> = ({ isMintTurnedOff, isInviteFlowOn }) => {
	return (
		<div className="w-full grow">
			<BabyRobotMintV2 isInviteFlowOn={isInviteFlowOn} isMintTurnedOff={isMintTurnedOff} />
		</div>
	);
};

MintBabyRobotPage.getLayout = getRobotsLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req } = ctx;

	const userId = req.session?.userId;

	const { origin } = absoluteUrl(req);

	const isMintTurnedOff = featureToggles.isEnabled('super_robot_mint_stop');

	const isInviteFlowOn = featureToggles.isEnabled('robot_invite_flow');

	let preloadResponse;

	if (userId) {
		preloadResponse = await preloadCodeInvitationData(ctx);
	}

	return {
		props: {
			withoutFooter: true,
			withDemo: true,
			isMintTurnedOff,
			withCloseAuthModal: true,
			isInviteFlowOn,
			og: {
				image: 'https://robot.superdao.co/robot-og.png',
				translations: {
					title: 'Super Robots — Get Your Free Personal Robot',
					description:
						'An evolving collection of randomly generated 3D bots reflecting your own vibe and preferences by Superdao'
				},
				origin
			},

			...preloadResponse
		}
	};
});

export default MintBabyRobotPage;
