import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';

import { shouldRedirectToMobileStub } from 'src/utils/shouldRedirectToMobileStub';
import { WithChildren } from 'src/types/type.utils';
import { VerifyEmailModal } from 'src/features/auth/components/verifyEmailModal';
import { useCurrentUserQuery } from 'src/gql/user.generated';

type Props = WithChildren<{}>;

export const EmptyLayout = (props: Props) => {
	const { children } = props;
	const {
		props: { nextAttemptToSendEmail }
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
		<div className="flex min-h-full justify-center px-0 pb-0 sm:px-6">
			<div className="w-full max-w-[1080px] flex-1">{children}</div>
			{needVerifyEmail && <VerifyEmailModal nextAttemptToSendEmail={nextAttemptToSendEmail} />}
		</div>
	);
};

export const getEmptyLayout = (page: ReactElement, props?: Props) => <EmptyLayout {...props}>{page}</EmptyLayout>;
