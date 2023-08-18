import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { Caption, PageContent } from 'src/components';
import { CustomHead } from 'src/components/head';
import { privacyPolicy, termsOfUse } from 'src/constants';

type Props = {
	children?: React.ReactNode;
};

/**
 * Is a wrapper for any custom login page. Includes Superdao logo, header and footer.
 */
export const LoginLayout: FC<Props> = (props) => {
	const { children } = props;
	const { t } = useTranslation();

	return (
		<PageContent
			className="flex h-full min-h-full flex-col items-center justify-center"
			columnClassName="flex-1 flex flex-col items-center"
		>
			<CustomHead main={'Login'} additional={'Superdao'} description={'Login to Superdao'} />
			<img height={56} src="/logo-full.svg" alt="" className="mt-9" />

			<div className="relative my-auto min-h-[200px] w-[min(400px,100%)] overflow-hidden rounded-xl p-0 md:px-4">
				{children}
			</div>

			<Caption className="text-foregroundQuaternary mb-9">
				<Link href={termsOfUse} passHref>
					<a
						target="_blank"
						className="text-foregroundTertiary hover:text-foregroundPrimary transition-all duration-300"
					>
						{t('pages.login.footer.terms')}
					</a>
				</Link>

				{` ${t('pages.login.footer.and')} `}

				<Link href={privacyPolicy}>
					<a
						target="_blank"
						className="text-foregroundTertiary hover:text-foregroundPrimary transition-all duration-300"
					>
						{t('pages.login.footer.privacy')}
					</a>
				</Link>
			</Caption>
		</PageContent>
	);
};
