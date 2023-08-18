import { memo, useCallback } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { EmailVerificationOptions, EmailVerificationStatus } from '@sd/superdao-shared';

import { Title2, Body, Button } from 'src/components';

const successData = {
	title: 'pages.email.verification.success.title',
	description: 'pages.email.verification.success.decription',
	imgProps: { src: '/assets/arts/mascotHappy.svg', width: 228, height: 147 }
};

const failureData = {
	title: 'pages.email.verification.expired.title',
	description: 'pages.email.verification.expired.decription',
	imgProps: { src: '/assets/arts/mascotSad.svg', width: 126, height: 171 }
};

const EmailVerification = ({ status, email, backPath = '/' }: EmailVerificationOptions) => {
	const { t } = useTranslation();
	const { push } = useRouter();

	const { imgProps, title, description } = status === EmailVerificationStatus.SUCCESS ? successData : failureData;

	const navigateBackToPage = useCallback(() => push(backPath), [backPath, push]);

	return (
		<div className="flex flex-col items-center">
			<Image {...imgProps} />
			<Title2 className="mt-8">{t(title)}</Title2>
			<Body className="text-foregroundSecondary mt-2 whitespace-pre-line text-center tracking-wide">
				{t(description)}
				{email && <b className="font-bold"> {email}</b>}
			</Body>
			<Button
				className="mt-8"
				label={t('pages.email.verification.navigate')}
				size="lg"
				color="accentPrimary"
				onClick={navigateBackToPage}
			/>
		</div>
	);
};

export default memo(EmailVerification);
