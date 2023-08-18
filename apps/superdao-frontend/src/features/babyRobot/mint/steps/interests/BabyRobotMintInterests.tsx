import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Label4 } from 'src/components/text';
import { TInterestMap } from './types';
import { interests } from './constants';

type Props = {
	interestsMap: TInterestMap;
	isActive: boolean;
	setInterestsMap: (value: TInterestMap) => void;
};

export const BabyRobotInterests = (props: Props) => {
	const { interestsMap, setInterestsMap, isActive } = props;

	const { t } = useTranslation();

	const bindInterestClick = (interest: string) => () => {
		if (!isActive) return;

		setInterestsMap({ ...interestsMap, [interest]: !interestsMap[interest] });
	};

	return (
		<div className={'flex max-w-[550px] flex-wrap gap-4 px-2 sm:px-0'}>
			{interests.map((interest) => (
				<div
					onClick={bindInterestClick(interest)}
					key={interest}
					className={cn(
						'bg-overlayTertiary hover:bg-overlayTertiaryHover cursor-pointer rounded-3xl py-2 px-5 transition-all sm:py-2 sm:px-5',
						{
							'!bg-overlayOrange': interestsMap[interest],
							'hover:!bg-overlayTertiary !cursor-default': !isActive
						}
					)}
				>
					<Label4
						className={cn(
							'text-[15px] transition-all sm:text-[17px]',
							isActive ? 'text-foregroundPrimary' : 'text-foregroundTertiary',
							{
								'!text-accentPrimary': interestsMap[interest]
							}
						)}
					>
						{t(`features.babyRobots.mint.steps.interests.entries.${interest}`)}
					</Label4>
				</div>
			))}
		</div>
	);
};
