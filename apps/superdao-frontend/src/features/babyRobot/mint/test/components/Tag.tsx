import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { AudienceWalletTag } from '@sd/superdao-shared';

import s from './Tag.module.css';

export const SORTED_TAG_VARIANTS: string[] = [
	AudienceWalletTag.developer,
	AudienceWalletTag.crypto_native,
	AudienceWalletTag.gamer,
	AudienceWalletTag.defi,
	AudienceWalletTag.culture,
	AudienceWalletTag.ens,
	AudienceWalletTag.influencer,
	AudienceWalletTag.hunter,
	AudienceWalletTag.whale,
	AudienceWalletTag.farcaster,
	AudienceWalletTag.talentProtocol,
	AudienceWalletTag.smoothie
];

export const TAG_CLASSNAME_BY_VARIANT: Record<string, string> = {
	[AudienceWalletTag.developer]: s.color_0,
	[AudienceWalletTag.crypto_native]: s.color_1,
	[AudienceWalletTag.gamer]: s.color_2,
	[AudienceWalletTag.defi]: s.color_3,
	[AudienceWalletTag.culture]: s.color_4,
	[AudienceWalletTag.ens]: s.color_5,
	[AudienceWalletTag.influencer]: s.color_6,
	[AudienceWalletTag.hunter]: s.color_7,
	[AudienceWalletTag.whale]: s.color_8,
	[AudienceWalletTag.farcaster]: s.color_9,
	[AudienceWalletTag.talentProtocol]: s.color_10,
	[AudienceWalletTag.smoothie]: s.color_11
};

type TagProps = { variant: string };

export const Tag = memo(({ variant }: TagProps) => {
	const { t } = useTranslation();

	const enhancedVariant = variant.trim().toLowerCase();

	return (
		<div
			className={cn(
				TAG_CLASSNAME_BY_VARIANT[enhancedVariant],
				'w-fit whitespace-nowrap rounded-lg px-2 text-[10px] font-bold leading-[24px]'
			)}
		>
			{t(`pages.scorings.audiences.tags.${enhancedVariant.split(' ').join('_')}`, { nsSeparator: '.' })}
		</div>
	);
});

Tag.displayName = 'Tag';
