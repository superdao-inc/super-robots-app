import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';
import { AudienceWalletTag, audienceWalletTagValues } from '@sd/superdao-shared';

import { Dropdown } from 'src/components/dropdown';
import { useSwitch } from 'src/hooks';
import { Tag } from './Tag';

const POPPER_MODIFIERS = [
	{ name: 'offset', options: { offset: [0, 12] } },
	{ name: 'arrow', options: { padding: 8 } }
];

type TagListProps = { tags: string[] };

export const TagList = memo(({ tags }: TagListProps) => {
	const { i18n } = useTranslation();

	const [showDropdawn, dropdown] = useSwitch(false);

	const [firstTag, secondTag, hiddenTags] = useMemo(() => {
		const filteredTags = tags.filter((tag) => {
			const enhancedTag = tag.trim().toLowerCase();

			return (
				audienceWalletTagValues.includes(enhancedTag as AudienceWalletTag) &&
				i18n.exists(`pages.scorings.audiences.tags.${enhancedTag.split(' ').join('_')}`, { nsSeparator: '.' })
			);
		});

		return [filteredTags[0], filteredTags[1], filteredTags.slice(2)];
	}, [i18n, tags]);

	const listTemplate = useMemo(
		() => (
			<div className="flex flex-col gap-2 px-2">
				{hiddenTags.map((tag, index) => (
					<Tag key={index} variant={tag} />
				))}
			</div>
		),
		[hiddenTags]
	);

	return (
		<div className="flex gap-2">
			{firstTag && <Tag variant={firstTag} />}
			{secondTag && <Tag variant={secondTag} />}
			{!!hiddenTags.length && (
				<Dropdown
					content={listTemplate}
					isOpen={showDropdawn}
					modifiers={POPPER_MODIFIERS}
					placement="right"
					onClickOutside={dropdown.off}
				>
					<div
						className="text-foregroundSecondary bg-overlayTertiary min-w-[24px] rounded-lg px-1 text-center text-[10px] font-bold leading-[24px]"
						role="button"
						tabIndex={0}
						onClick={dropdown.on}
					>
						+{hiddenTags.length}
					</div>
				</Dropdown>
			)}
		</div>
	);
});

TagList.displayName = 'TagList';
