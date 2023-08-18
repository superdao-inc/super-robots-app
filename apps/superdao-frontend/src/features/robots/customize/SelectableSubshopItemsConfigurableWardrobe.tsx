import cn from 'classnames';

import isEqual from 'lodash/isEqual';
import { getCurrentPartsVersion, ROBOT_PARTS_URL } from '@sd/superdao-shared';

import { RobotWardrobeImage } from './RobotWardrobeImage';
import { NewBody, ShopCloseIcon } from 'src/components';
import { CUSTOMIZE_COLORS, subShopsParamsConfig } from './constants';
import { RobotLayerDisplay } from 'src/features/robotsCommon/RobotLayerDisplay';
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
	onSetSelection: (fullset: { BG: string; BODY: string; TUBES: string; EYES: string; LEGS: string } | null) => void;
	items: {
		type: string;
		name: string;
		index: string;
		color: CUSTOMIZE_COLORS[];
	}[];
	imageName: string;
	subShop: string;
};

export const SelectableSubshopItemsConfigurableWardrobe = (props: Props) => {
	const {
		items,
		isUsingOddVersion,
		currentSection,
		currentColor,
		partsConfig,
		onSetSelection,
		onPartSelection,
		imageName,
		subShop
	} = props;

	const bindSetSelection = (fullset: { BG: string; BODY: string; TUBES: string; EYES: string; LEGS: string }) => () => {
		const isItemActive = isEqual(
			Object.entries(partsConfig)
				.filter(([key]) => key !== 'bg')
				.map(([_, value]) => value)
				.sort((a, b) => (a >= b ? 1 : -1)),
			Object.entries(fullset)
				.filter(([key]) => key !== 'name' && key !== 'BG')
				.map(([_, value]) => value)
				.sort((a, b) => (a >= b ? 1 : -1))
		);

		console.log(isItemActive);

		onSetSelection(isItemActive ? null : fullset);
	};

	const isItemActive = (item: string, type: string) => {
		return partsConfig[type as keyof typeof partsConfig] === item;
	};

	const bindPartSelection = (item: string) => () => {
		onPartSelection(isItemActive(item, item.split('_')[0].toLowerCase()) ? null : (item as any), item.split('_')[0]);
	};

	const robotPartsPrefix = `${ROBOT_PARTS_URL}/preview-${getCurrentPartsVersion(isUsingOddVersion)}`;

	const isFullsetSection = currentSection.toLowerCase() === 'fullset';

	const activeMappingPartition = items.filter((elem) => elem.type === currentSection);

	const activeMappingPartitionEnabledItems =
		currentColor === null
			? activeMappingPartition
			: activeMappingPartition.filter((elem) => elem.color.includes(currentColor as any));

	const activePartsConfigItem = partsConfig[currentSection.toLowerCase() as keyof typeof partsConfig];

	const subShopConfig = subShopsParamsConfig.find((elem) => elem.name === subShop);

	return (
		<div className="1280:grid-cols-[repeat(auto-fill,_220px)] 500:px-0 500:grid-cols-[repeat(auto-fill,_162px)] 1280:w-full mt-6 grid grid-cols-[repeat(2,minmax(140px,_1fr))] justify-center gap-x-3 gap-y-4 px-5">
			{isFullsetSection ? (
				<>
					{subShopConfig?.fullsets.map((fullset, i) => {
						const isItemActive = isEqual(
							Object.entries(partsConfig)
								.filter(([key]) => key !== 'bg')
								.map(([_, value]) => value)
								.sort((a, b) => (a >= b ? 1 : -1)),
							Object.entries(fullset)
								.filter(([key]) => key !== 'name' && key !== 'BG')
								.map(([_, value]) => value)
								.sort((a, b) => (a >= b ? 1 : -1))
						);

						return (
							<div
								key={`fullset_${i}`}
								className={cn(
									'500:w-[162px] 500:h-[162px] 1280:w-[220px] 1280:h-[220px] relative aspect-square h-auto w-full shrink-0 cursor-pointer self-start rounded-xl border-2 border-white/[.0] transition-all',
									{ '!border-[#6153CC]': isItemActive }
								)}
								onClick={bindSetSelection(fullset)}
							>
								{isItemActive && (
									<div className="z-1 absolute top-[10px] left-[10px] flex h-5 w-5 shrink-0 items-center items-center justify-center rounded-full bg-[#383838]/[.7] backdrop-blur-lg">
										<Tooltip
											backgroundColor="#383838"
											content={<TooltipContent title={'Unequip item'} />}
											placement="top"
										>
											<ShopCloseIcon className="shrink-0 fill-white opacity-70" />
										</Tooltip>
									</div>
								)}
								<div
									className={cn(
										'relative h-full w-full overflow-hidden rounded-lg border border-white/[.04] bg-white/[.04]'
									)}
								>
									<div
										className={cn(
											'z-1 absolute bottom-0 left-0 block h-[50px] w-full bg-gradient-to-t from-[#22242A]/[.5] to-[#22242A]/[.01]'
										)}
									></div>
									<div
										className={cn(
											'mx-auto flex h-full w-full items-center justify-center overflow-hidden rounded-lg p-6'
										)}
									>
										<RobotLayerDisplay
											withoutBackground
											imageName={imageName}
											isUsingOddVersion={isUsingOddVersion}
											customParts={{
												eyes: fullset['EYES'],
												legs: fullset['LEGS'],
												body: fullset['BODY'],
												tubes: fullset['TUBES']
											}}
											className="1280:rounded-none bg-[#22242A]"
										/>
									</div>
									<NewBody className={cn('z-1 relative -mt-[26px] max-w-full truncate text-center')}>
										{fullset.name}
									</NewBody>
								</div>
							</div>
						);
					})}
				</>
			) : (
				activeMappingPartitionEnabledItems.map((item) => {
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
									<Tooltip
										backgroundColor="#383838"
										content={<TooltipContent title={'Unequip item'} />}
										placement="top"
									>
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
										'absolute bottom-0 left-0 block hidden h-[50px] w-full bg-gradient-to-t from-[#22242A]/[.5] to-[#22242A]/[.01]',
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
				})
			)}
		</div>
	);
};
