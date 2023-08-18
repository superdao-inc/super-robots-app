import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { PageContent, Title1 } from 'src/components';
import { CustomHead } from 'src/components/head';
import { MobileHeader } from 'src/components/mobileHeader';
import { UserAPI } from '../../API';

const ProfileEmailSettings = () => {
	const router = useRouter();
	const { t } = useTranslation();

	const userRes = UserAPI.useCurrentUserQuery();

	return (
		<PageContent columnSize="sm">
			<CustomHead
				main={userRes.data?.currentUser?.displayName ?? ''}
				additional="Email settings"
				description="Superdao profile email settings"
			/>

			<div className="bg-backgroundSecondary rounded-lg px-6 py-5">
				<Title1 className="mb-6 hidden lg:flex">{t('pages.emailSettings.title')}</Title1>
				<MobileHeader title={t('pages.emailSettings.title')} onBack={router.back} />
			</div>
		</PageContent>
	);
};

export default memo(ProfileEmailSettings);
