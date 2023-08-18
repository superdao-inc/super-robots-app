import cn from 'classnames';

import { BgTraitIcon } from 'src/components/assets/icons/robots/bgTraitIcon';
import { TubesTraitIcon } from 'src/components/assets/icons/robots/tubesTraitIcon';
import { EyesTraitIcon } from 'src/components/assets/icons/robots/eyesTraitIcon';
import { BodyTraitIcon } from 'src/components/assets/icons/robots/bodyTraitIcon';
import { LegsTraitIcon } from 'src/components/assets/icons/robots/legsTraitIcon';
import { NewLabel1 } from 'src/components';
import { FeaturedTraitIcon } from 'src/components/assets/icons/robots/featuredTraitIcon';
import { FeaturedBackpackIcon } from 'src/components/assets/icons/robots/featuredBackpackIcon';
import { GetTokenCustomItemsQuery, GetUserCustomItemsQuery } from 'src/gql/babyRobot.generated';

type Props = {
	currentSection: string;
	onSectionSelection: (section: string) => void;
	isDemo?: boolean;
	userCustomItems: GetUserCustomItemsQuery['getUserCustomItems'];
	tokenCustomItems: GetTokenCustomItemsQuery['getTokenCustomItems'];
};

const sections = ['FEATURED', 'INVENTORY', 'BODY', 'LEGS', 'TUBES', 'EYES', 'BG'];

const sectionsConfig = {
	FEATURED: {
		Icon: FeaturedTraitIcon,
		text: 'Featured'
	},
	INVENTORY: {
		Icon: FeaturedBackpackIcon,
		text: 'Inventory'
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

export const SelectableItemsSections = (props: Props) => {
	const { currentSection, onSectionSelection, isDemo = false, userCustomItems, tokenCustomItems } = props;

	const bindSection = (section: string) => () => onSectionSelection(section);

	const filteredSections = isDemo
		? sections.filter((section) => section !== 'INVENTORY')
		: [...userCustomItems, ...tokenCustomItems].length
		? sections
		: sections.filter((section) => section !== 'INVENTORY');

	return (
		<>
			{filteredSections.map((section) => {
				const cell = sectionsConfig[section as keyof typeof sectionsConfig];

				const CurrentIcon = cell.Icon;

				const isActive = currentSection === section;

				return (
					<div
						key={section}
						onClick={bindSection(section)}
						className={cn('cursor-pointer rounded-lg p-4 transition-all ', {
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
