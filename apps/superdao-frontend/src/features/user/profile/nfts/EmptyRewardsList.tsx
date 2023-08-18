import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Body, Button, Title1 } from 'src/components';
import { NoRewardsArt } from 'src/components/assets/arts';

type Props = {
	isCurrentUserProfile?: boolean;
};

export const EmptyRewardsList = (props: Props) => {
	const { isCurrentUserProfile } = props;

	const { t } = useTranslation();
	const { push } = useRouter();

	const navigateToHome = useCallback(() => push(`/`), [push]);

	return (
		<div className="flex w-full flex-col items-center justify-center py-12">
			<NoRewardsArt />

			{isCurrentUserProfile ? (
				<>
					<Title1 className="mt-4 text-center">{t('pages.user.emptyNftList.currentUser.title')}</Title1>
					<Body className="text-foregroundSecondary mt-2 mb-10 text-center">
						{t('pages.user.emptyNftList.currentUser.description')}
					</Body>

					<Button
						size="lg"
						label={t('pages.user.emptyNftList.currentUser.goToRewards')}
						color="accentPrimary"
						onClick={navigateToHome}
					/>
				</>
			) : (
				<Title1 className="mt-4 text-center">{t('pages.user.emptyNftList.commonUser.title')}</Title1>
			)}
		</div>
	);
};
