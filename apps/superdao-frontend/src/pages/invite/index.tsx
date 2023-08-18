import { InvitationsCodeActivated } from 'src/features/robots/invite/InvitationsCodeActivated';
import { SSR, preloadCodeInvitationData } from 'src/client/ssr';
import { InvitationsCode } from 'src/features/robots/invite/InvivitationsCode';
import { NextPageWithLayout } from 'src/layouts';
import { getRobotsSidebarLayout } from 'src/layouts/robotsSidebarLayout';
import { InvitationsCodeInactive } from 'src/features/robots/invite/InvitationsCodeInactive';
import { useGetCodeInvitationsInfoQuery } from 'src/gql/userCodes.generated';
import { Loader } from 'src/components';

type Props = {
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
	maxCodeActivations: number;
	code: string;
};

const Page: NextPageWithLayout<Props> = () => {
	const { data: getCodeInvitationsInfo, isLoading } = useGetCodeInvitationsInfoQuery(
		{},
		{ select: (data) => data.getCodeInvitationsInfo }
	);
	const { code, isCodeFlowAvailable, remainingCodeActivations, maxCodeActivations } = getCodeInvitationsInfo ?? {
		isCodeFlowAvailable: false,
		remainingCodeActivations: 0,
		maxCodeActivations: 0,
		code: ''
	};

	if (isLoading) {
		return (
			<div className="m-auto mx-auto flex h-[80vh] w-10 items-center justify-center">
				<Loader size="lg" />
			</div>
		);
	}

	if (!isCodeFlowAvailable) {
		return <InvitationsCodeInactive />;
	}

	if (!remainingCodeActivations) {
		return <InvitationsCodeActivated maxCodeActivations={maxCodeActivations} />;
	}

	return (
		<InvitationsCode
			code={code}
			remainingCodeActivations={remainingCodeActivations}
			maxCodeActivations={maxCodeActivations}
		/>
	);
};

Page.getLayout = getRobotsSidebarLayout;

export const getServerSideProps = SSR(async (ctx) => {
	const { req } = ctx;

	const userId = req.session?.userId;
	const isAuthorized = !!userId;

	if (!isAuthorized) {
		return {
			redirect: { destination: `/`, permanent: false }
		};
	}

	const preloadResponse = await preloadCodeInvitationData(ctx);

	return {
		props: {
			og: {
				translations: {
					title: 'Invite | Super Robots',
					description: 'Invite friends to mint a Super Robot NFT'
				}
			},

			...preloadResponse
		}
	};
});

export default Page;
