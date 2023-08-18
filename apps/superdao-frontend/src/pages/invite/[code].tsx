import { SSR, preloadCodeInvitationData, preloadCodeInvitationDataByCode } from 'src/client/ssr';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsLayout } from 'src/layouts/robotsLayout';
import { InvitationsLogic } from 'src/features/robots/invite/InvitationsLogic';

type Props = {
	withoutRedirect: boolean;
	withoutFooter: boolean;
	withoutVerifyModal: boolean;
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
	maxCodeActivations: number;
	code: string;
	codeOwner: string;
	nextAttemptToSendEmail: number | undefined;
};

const Page: NextPageWithLayout<Props> = (props) => {
	const { codeOwner, remainingCodeActivations, nextAttemptToSendEmail } = props;

	return (
		<InvitationsLogic
			nextAttemptToSendEmail={nextAttemptToSendEmail}
			codeOwner={codeOwner}
			remainingCodeActivations={remainingCodeActivations}
		/>
	);
};

Page.getLayout = getRobotsLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req, query } = ctx;
	const code = query?.code?.toString();
	if (!code) {
		return {
			redirect: { destination: `/`, permanent: false }
		};
	}

	const userId = req.session?.userId;

	let preloadCommonResponse;

	if (userId) {
		preloadCommonResponse = await preloadCodeInvitationData(ctx);
	}

	const preloadResponse = await preloadCodeInvitationDataByCode(ctx, code);
	if (preloadResponse.error || !preloadResponse.codeOwner) {
		return {
			redirect: { destination: `/`, permanent: false }
		};
	}

	return {
		props: {
			withDemo: true,
			withoutRedirect: true,
			withoutFooter: true,
			withoutVerifyModal: true,

			og: {
				translations: {
					title: 'Get your Super Robot',
					description:
						"You're invited to mint a Super Robot. Get your robot and become a part of an evolving collection of randomly generated 3D bots that reflect your own vibe and preferences. Free mint and no gas fee"
				}
			},

			...preloadCommonResponse,
			...preloadResponse
		}
	};
});

export default Page;
