import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';

import { shouldRedirectToMobileStub } from 'src/utils/shouldRedirectToMobileStub';
import { WithChildren } from 'src/types/type.utils';
import { VerifyEmailModal } from 'src/features/auth/components/verifyEmailModal';
import { useCurrentUserQuery } from 'src/gql/user.generated';

type Props = WithChildren<{}>;

export const NullLayout = (props: Props) => {
	const { children } = props;
	const {
		props: { nextAttemptToSendEmail, withCloseAuthModal }
	} = children;
	const { push, asPath, pathname } = useRouter();
	const { data } = useCurrentUserQuery();
	const currentUser = data?.currentUser;

	const needVerifyEmail = currentUser?.id && !currentUser.emailVerified;

	useEffect(() => {
		if (shouldRedirectToMobileStub(pathname)) {
			void push(`/mobile?from=${asPath}`);
		}
	}, [asPath, pathname, push]);

	return (
		<>
			{children}
			{needVerifyEmail && (
				<VerifyEmailModal withClose={withCloseAuthModal} nextAttemptToSendEmail={nextAttemptToSendEmail} />
			)}
		</>
	);
};

export const getNullLayout = (page: ReactElement, props?: Props) => <NullLayout {...props}>{page}</NullLayout>;
