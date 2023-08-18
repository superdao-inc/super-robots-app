import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { shouldRedirectToMobileStub } from 'src/utils/shouldRedirectToMobileStub';
import { WithChildren } from 'src/types/type.utils';
import { VerifyEmailModal } from 'src/features/auth/components/verifyEmailModal';
import { useCurrentUserQuery } from 'src/gql/user.generated';
import { RobotsHeader } from 'src/features/robots/header/RobotsHeader';
import { RobotsFooter } from 'src/features/robots/footer/RobotsFooter';
import { useGetCodeInvitationsInfoQuery } from 'src/gql/userCodes.generated';

type Props = WithChildren<{}>;

export const RobotsLayout = (props: Props) => {
	const { children } = props;
	const {
		props: {
			nextAttemptToSendEmail,
			withoutFooter,
			withoutRedirect,
			withoutVerifyModal,
			withDemo,
			withDecorationOverlay
		}
	} = children;
	const { push, asPath, pathname } = useRouter();
	const { data } = useCurrentUserQuery();
	const currentUser = data?.currentUser;

	const { data: getCodeInvitationsInfo } = useGetCodeInvitationsInfoQuery(
		{},
		{ select: (data) => data.getCodeInvitationsInfo }
	);
	const { isCodeFlowAvailable, remainingCodeActivations } = getCodeInvitationsInfo ?? {
		isCodeFlowAvailable: false,
		remainingCodeActivations: 0
	};

	const needVerifyEmail = currentUser?.id && !currentUser.emailVerified;

	useEffect(() => {
		if (shouldRedirectToMobileStub(pathname)) {
			void push(`/mobile?from=${asPath}`);
		}
	}, [asPath, pathname, push]);

	return (
		<>
			<div className={cn('relative', { 'z-1': withDecorationOverlay })}>
				<RobotsHeader
					isCodeFlowAvailable={isCodeFlowAvailable}
					remainingCodeActivations={remainingCodeActivations}
					withoutRedirect={withoutRedirect}
					withDemo={withDemo}
				/>
			</div>
			<div
				className={cn(
					'500:min-h-[calc(100vh-56px-89px)] 1280:min-h-[calc(100vh-56px-105px)] relative flex min-h-[calc(100vh-56px-129px)]',
					{
						'500:!min-h-[calc(100vh-56px)] 1280:!min-h-[calc(100vh-56px)] !min-h-[calc(100vh-56px)]': withoutFooter
					}
				)}
			>
				{children}
			</div>
			{!withoutFooter && <RobotsFooter />}
			{!withoutVerifyModal && needVerifyEmail && (
				<VerifyEmailModal withClose={true} nextAttemptToSendEmail={nextAttemptToSendEmail} />
			)}
		</>
	);
};

export const getRobotsLayout = (page: ReactElement) => <RobotsLayout {...page.props}>{page}</RobotsLayout>;
