import cn from 'classnames';

import { getCurrentPartsVersion, ROBOT_PARTS_URL } from '@sd/superdao-shared';

import { RobotWardrobeImage } from './RobotWardrobeImage';
import { NewBody, NewLabel1, ShopCloseIcon } from 'src/components';
import { customizeElements, featuredConfig, subShopsConfig } from './constants';
import { EmptyBoxIcon } from 'src/components/assets/icons/emptyBox';
import Tooltip from 'src/components/tooltip';
import { TooltipContent } from 'src/components/navigation/tooltipContent';

type Props = {
	isUsingOddVersion: boolean;
	currentSection: string;
	currentColor: string | null;
	partsConfig: {
		bg: string;
		eyes: string;
		tubes: string;
		body: string;
		legs: string;
	};
	onPartSelection: (part: string | null, type: string) => void;
	onSelectSubShop: (subShop: string) => void;
};

export const SelectableItemsConfigurableWardrobe = (props: Props) => {
	const { isUsingOddVersion, currentSection, currentColor, partsConfig, onPartSelection, onSelectSubShop } = props;

	const isItemActive = (item: string, type: string) => {
		return partsConfig[type as keyof typeof partsConfig] === item;
	};

	const bindPartSelection = (item: string) => () => {
		onPartSelection(isItemActive(item, item.split('_')[0].toLowerCase()) ? null : (item as any), item.split('_')[0]);
	};

	const bindRedirectToSubShop = (subShop: string) => () => {
		onSelectSubShop(subShop);
	};

	const isFeaturedSection = currentSection.toLowerCase() === 'featured';
	const isBgSection = currentSection.toLowerCase() === 'bg';

	const robotPartsPrefix = `${ROBOT_PARTS_URL}/${isBgSection ? '' : 'preview-'}${getCurrentPartsVersion(
		isUsingOddVersion
	)}`;

	const activeMappingPartition = isFeaturedSection
		? featuredConfig
		: customizeElements.filter((elem) => elem.type === currentSection);

	const activeMappingPartitionEnabledItems =
		currentColor === null
			? activeMappingPartition
			: activeMappingPartition.filter((elem) => elem.color.includes(currentColor as any));

	const activePartsConfigItem = partsConfig[currentSection.toLowerCase() as keyof typeof partsConfig];

	const isPartitionEmpty = !activeMappingPartitionEnabledItems.length;

	if (isPartitionEmpty) {
		return (
			<div className="1280:w-full mt-6 flex flex-wrap items-center justify-center gap-x-[6px] gap-y-4">
				<div className="flex min-h-[50vh] items-center">
					<div>
						<EmptyBoxIcon className="mx-auto" />
						<NewLabel1 className="mt-6 w-full px-6 text-center font-normal">
							Oops, there is no items with selected atributes
						</NewLabel1>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="1280:grid-cols-[repeat(auto-fill,_220px)] 500:grid-cols-[repeat(auto-fill,_162px)] 1280:w-full 500:px-0 mt-6 grid grid-flow-dense grid-cols-[repeat(2,minmax(140px,_1fr))] justify-center gap-x-3 gap-y-4 px-5">
			{isFeaturedSection && (
				<>
					{subShopsConfig.map((subShop) => (
						<div
							className="1280:h-[220px] 500:h-[160px] col-span-2 h-auto w-full cursor-pointer px-1"
							key={subShop.path}
							onClick={bindRedirectToSubShop(subShop.path)}
						>
							<div className="relative h-full w-full overflow-hidden rounded-lg">
								<img className="min-h-full min-w-full object-cover" src={`/${subShop.path}_sub.png`} />
								{
									// FIXME: text now is on posters
								}
								{/* <NewBody className={cn(' -mt-[26px] max-w-full truncate text-center')}>{subShop.name}</NewBody> */}
							</div>
						</div>
					))}
				</>
			)}
			{activeMappingPartitionEnabledItems.map((item) => {
				let isItemActive = item.index === activePartsConfigItem;

				if (currentSection.toLowerCase() === 'featured') {
					isItemActive = Object.values(partsConfig).includes(item.index);
				}

				const isBgSection = currentSection.toLowerCase() === 'bg';

				return (
					<div
						key={item.index}
						className={cn(
							'500:w-[162px] 500:h-[162px] 1280:w-[220px] 1280:h-[220px] relative aspect-square h-auto w-full shrink-0 cursor-pointer self-start rounded-xl border-2 border-white/[.0] transition-all',
							{ '!border-[#6153CC]': isItemActive }
						)}
						onClick={bindPartSelection(item.index)}
					>
						{
							// first item must not be unequipable
						}
						{isItemActive && item.index.split('_')[1] !== '1' && (
							<div className="z-1 absolute top-[10px] left-[10px] flex h-5 w-5 shrink-0 items-center items-center justify-center rounded-full bg-[#383838]/[.7] backdrop-blur-lg">
								<Tooltip backgroundColor="#383838" content={<TooltipContent title={'Unequip item'} />} placement="top">
									<ShopCloseIcon className="shrink-0 fill-white opacity-70" />
								</Tooltip>
							</div>
						)}
						<div
							className={cn(
								'relative h-full w-full overflow-hidden rounded-lg border border-white/[.04] bg-white/[.06]'
							)}
						>
							<div
								className={cn(
									'absolute bottom-0 left-0 hidden h-[50px] w-full bg-gradient-to-t from-[#22242A]/[.5] to-[#22242A]/[.01]',
									{ '!block': isBgSection }
								)}
							></div>
							<div className={cn('mx-auto flex h-full w-full items-center justify-center')}>
								<RobotWardrobeImage src={`${robotPartsPrefix}/${item.index}.png`} />
							</div>
							<NewBody className={cn('z-1 relative -mt-[26px] max-w-full truncate text-center')}>{item.name}</NewBody>
						</div>
					</div>
				);
			})}
		</div>
	);
};
