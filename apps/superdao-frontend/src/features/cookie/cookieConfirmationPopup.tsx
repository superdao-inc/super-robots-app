import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { cookiePolicy } from 'src/constants';
import { Button, CookieIcon, SubHeading, toast } from 'src/components';
import { useFadeTransition } from 'src/hooks/transitions/useFadeTransition';
import { useDecideAboutCookiesMutation } from 'src/gql/user.generated';

import { AuthAPI } from '../auth';
import { UserAPI } from '../user';

export const CookieConfirmationPopup = () => {
	const { t } = useTranslation();
	const { pathname } = useRouter();

	const isAuthorized = AuthAPI.useIsAuthorized();

	const [localHasCookieDecisionState, setLocalHasCookieDecisionState] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('localHasCookieDecision') === 'true') setLocalHasCookieDecisionState(true);
	}, []);

	const {
		data: hasCookieDecision,
		isLoading: isHasCookieDecisionDataLoading,
		refetch: refetchHasCookieDecisionData
	} = UserAPI.useCurrentUserQuery(undefined, {
		select: (user) => user.currentUser.hasCookieDecision
	});

	const { mutate: decideAboutCookies } = useDecideAboutCookiesMutation();

	// User logged-in and there is no agreement in the DB
	const authorizedNotDecided = isAuthorized && !isHasCookieDecisionDataLoading && !hasCookieDecision;

	const isShouldShow =
		(authorizedNotDecided && !localHasCookieDecisionState) || (!isAuthorized && !localHasCookieDecisionState);

	const { shouldShowEl: isVisible, styles: fadeStyles } = useFadeTransition(isShouldShow, 300);

	// Automatically save agreement to the DB if it was only local
	useEffect(() => {
		if (authorizedNotDecided && localHasCookieDecisionState) decideAboutCookies({ decision: true });
	}, [authorizedNotDecided, decideAboutCookies, localHasCookieDecisionState]);

	const bindCookieDecision = (decision: boolean) => async () => {
		if (!isAuthorized) {
			localStorage.setItem('localHasCookieDecision', 'true');
			setLocalHasCookieDecisionState(true);
			return;
		}

		decideAboutCookies(
			{ decision },
			{
				onSuccess: () => refetchHasCookieDecisionData(),
				onError: () => {
					toast.error(t('cookie.error'), { position: 'bottom-center' });
				}
			}
		);
	};

	if (!isVisible || pathname === '/_error') {
		return null;
	}

	return (
		<div
			className={cn(
				'bottom-3 left-1/2 z-50 flex w-[90%] max-w-[982px] -translate-x-1/2 items-start gap-4 rounded-xl bg-[#2B2B2B] p-4 opacity-0 transition-all duration-300 md:bottom-9 md:flex-nowrap md:items-center',
				fadeStyles,
				`${isVisible ? 'fixed' : 'hidden'}`
			)}
		>
			<CookieIcon width={36} height={36} className="shrink-0" />
			<div className="flex flex-wrap items-center gap-6 gap-y-0.5 md:flex-nowrap">
				<SubHeading className="whitespace-normal font-semibold">
					We use cookies to improve your site experience. By clicking «Accept&nbsp;cookies», you agree to the use of
					cookies on our website. To&nbsp;find out more visit our{' '}
					<a href={cookiePolicy} target="_blank" rel="noreferrer" className="text-accentPrimary">
						Cookie&nbsp;Policy
					</a>
				</SubHeading>
				<div className="mt-2 mr-0 flex w-full items-center justify-start gap-3 md:mt-0 md:mr-2 md:w-max md:justify-center">
					<Button onClick={bindCookieDecision(true)} label="Accept&nbsp;cookies" size="md" color="accentPrimary" />
				</div>
			</div>
		</div>
	);
};
