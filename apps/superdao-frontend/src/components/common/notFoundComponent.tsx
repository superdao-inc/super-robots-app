import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HTMLAttributes } from 'react';
import cn from 'classnames';

import { Body, Button, Title1 } from 'src/components';

export const NotFoundComponent = (props: HTMLAttributes<HTMLDivElement>) => {
	const { className } = props;

	const { replace } = useRouter();
	const { t } = useTranslation();

	const handleAction = () => {
		replace('/');
	};

	return (
		<div className={cn('flex flex-col items-center justify-center', className)}>
			<Image src="/assets/arts/mascotSeat.svg" width={160} height={160} />

			<Title1 className="mt-[35px]">{t('components.notFound.title')}</Title1>

			<Body className="text-foregroundSecondary mt-2 whitespace-pre-line text-center">
				{t('components.notFound.text')}
			</Body>

			<Button
				className="mt-8"
				size="lg"
				label={t('components.notFound.action')}
				color="accentPrimary"
				onClick={handleAction}
			/>
		</div>
	);
};
