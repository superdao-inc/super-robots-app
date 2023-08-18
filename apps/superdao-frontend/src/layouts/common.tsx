import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';

import { shouldRedirectToMobileStub } from 'src/utils/shouldRedirectToMobileStub';
import { WithChildren } from 'src/types/type.utils';
import { TopMenu } from 'src/features/topMenu';
import { VerifyEmailModal } from 'src/features/auth/components/verifyEmailModal';
import { useCurrentUserQuery } from 'src/gql/user.generated';

type Props = WithChildren<{}>;

export const CommonLayout = (props: Props) => {
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
		<div className="xs:px-6 flex min-h-full justify-center px-0 pb-6">
			<div className="w-full max-w-[1080px] flex-1">
				<TopMenu />
				{children}
			</div>
			{needVerifyEmail && <VerifyEmailModal nextAttemptToSendEmail={nextAttemptToSendEmail} />}
		</div>
	);
};

export const getCommonLayout = (page: ReactElement, props?: Props) => <CommonLayout {...props}>{page}</CommonLayout>;
