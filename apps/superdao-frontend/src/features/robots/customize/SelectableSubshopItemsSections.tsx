import cn from 'classnames';

import { BgTraitIcon } from 'src/components/assets/icons/robots/bgTraitIcon';
import { TubesTraitIcon } from 'src/components/assets/icons/robots/tubesTraitIcon';
import { EyesTraitIcon } from 'src/components/assets/icons/robots/eyesTraitIcon';
import { BodyTraitIcon } from 'src/components/assets/icons/robots/bodyTraitIcon';
import { LegsTraitIcon } from 'src/components/assets/icons/robots/legsTraitIcon';
import { NewLabel1 } from 'src/components';
import { FeaturedFullSetIcon } from 'src/components/assets/icons/robots/featuredFullSetIcon';
import { CUSTOMIZE_COLORS } from './constants';

type Props = {
	currentSection: string;
	onSectionSelection: (section: string) => void;
	items: {
		type: string;
		name: string;
		index: string;
		color: CUSTOMIZE_COLORS[];
	}[];
};

const sectionsConfig = {
	FULLSET: {
		Icon: FeaturedFullSetIcon,
		text: 'Full sets'
	},
	BG: {
		Icon: BgTraitIcon,
		text: 'BG'
	},
	TUBES: {
		Icon: TubesTraitIcon,
		text: 'Tubes'
	},
	EYES: {
		Icon: EyesTraitIcon,
		text: 'Eyes'
	},
	LEGS: {
		Icon: LegsTraitIcon,
		text: 'Legs'
	},
	BODY: {
		Icon: BodyTraitIcon,
		text: 'Body'
	}
};

export const SelectableSubshopItemsSections = (props: Props) => {
	const { items, currentSection, onSectionSelection } = props;

	const bindSection = (section: string) => () => onSectionSelection(section);

	const keys = new Set(items.map((item) => item.type));

	const mappedSections = ['FULLSET', ...Object.keys(sectionsConfig).filter((key) => keys.has(key))];

	return (
		<>
			{mappedSections.map((section) => {
				const cell = sectionsConfig[section as keyof typeof sectionsConfig];

				const CurrentIcon = cell.Icon;

				const isActive = currentSection === section;

				return (
					<div
						key={section}
						onClick={bindSection(section)}
						className={cn('shrink-0 cursor-pointer rounded-lg p-4 transition-all', {
							'bg-[#D0DCF514]': isActive
						})}
					>
						<div
							className={cn('flex items-center justify-center gap-[6px] transition-all', {
								'opacity-100': isActive,
								'opacity-40 hover:opacity-70': !isActive
							})}
						>
							<CurrentIcon />
							<NewLabel1 className="font-bold">{sectionsConfig[section as keyof typeof sectionsConfig].text}</NewLabel1>
						</div>
					</div>
				);
			})}
		</>
	);
};
