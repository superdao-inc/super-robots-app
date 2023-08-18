import cn from 'classnames';

import { RobotWardrobeImage } from './RobotWardrobeImage';
import { NewBody, NewLabel1, ShopCloseIcon } from 'src/components';
import { ROBOT_PARTS_URL, getCurrentPartsVersion } from '@sd/superdao-shared';
import { GetTokenCustomItemsQuery, GetUserCustomItemsQuery } from 'src/gql/babyRobot.generated';
import { customizeCustomElements } from './constants.custom';
import { CustomItemByTokenResponse } from 'src/types/types.generated';
import { CustomItemByTokenType } from './types';
import Tooltip from 'src/components/tooltip';
import { TooltipContent } from 'src/components/navigation/tooltipContent';

type Props = {
	isUsingOddVersion: boolean;
	currentColor: string | null;
	userCustomItems: GetUserCustomItemsQuery['getUserCustomItems'];
	tokenCustomItems: GetTokenCustomItemsQuery['getTokenCustomItems'];
	onCustomPartSelection: (part: CustomItemByTokenResponse | null, type: string) => void;
	customPartsConfig: {
		customBg: CustomItemByTokenType;
		customEyes: CustomItemByTokenType;
		customTubes: CustomItemByTokenType;
		customBody: CustomItemByTokenType;
		customLegs: CustomItemByTokenType;
		customFeedback: CustomItemByTokenType;
	};
};

export const SelectableItemsInventory = (props: Props) => {
	const {
		isUsingOddVersion,
		currentColor,
		userCustomItems,
		tokenCustomItems,
		customPartsConfig,
		onCustomPartSelection
	} = props;

	const getItem = (item: GetTokenCustomItemsQuery['getTokenCustomItems'][0]) => {
		if (item.customItem.layerType === 'BG') return customPartsConfig['customBg'];
		if (item.customItem.layerType === 'BODY') return customPartsConfig['customBody'];
		if (item.customItem.layerType === 'EYES') return customPartsConfig['customEyes'];
		if (item.customItem.layerType === 'FEEDBACK') return customPartsConfig['customFeedback'];
		if (item.customItem.layerType === 'LEGS') return customPartsConfig['customLegs'];
		if (item.customItem.layerType === 'TUBES') return customPartsConfig['customTubes'];
	};

	const isItemActive = (item: GetTokenCustomItemsQuery['getTokenCustomItems'][0]) => {
		const itemInConfig = getItem(item);

		return item.id === itemInConfig?.id ? true : false;
	};

	const bindPartSelection = (item: GetTokenCustomItemsQuery['getTokenCustomItems'][0]) => () => {
		onCustomPartSelection(isItemActive(item) ? null : (item as any), item.customItem.layerType);
	};

	const filteredUserCustomIcons = userCustomItems.filter((item) => {
		const colors = customizeCustomElements.find((elem) => elem.index === item.customItem.layerName)?.color ?? [];

		return currentColor ? colors.includes(currentColor as any) : true;
	});

	const filteredTokenCustomIcons = tokenCustomItems.filter((item) => {
		const colors = customizeCustomElements.find((elem) => elem.index === item.customItem.layerName)?.color ?? [];

		return currentColor ? colors.includes(currentColor as any) : true;
	});

	return (
		<div className="1280:w-full 1280:px-0 px-10">
			{!!filteredUserCustomIcons.length && (
				<>
					<div className="1280:grid-cols-[repeat(auto-fill,_220px)] 500:grid-cols-[repeat(auto-fill,_162px)] 1280:w-full 500:px-0 grid grid-flow-dense grid-cols-[repeat(2,minmax(140px,_1fr))] justify-center gap-x-3 gap-y-4">
						<NewLabel1 className="1280:col-span-full 500:col-span-3 col-span-2 mt-10 w-full font-bold">
							Your items
						</NewLabel1>
						{filteredUserCustomIcons.map((item) => {
							const isCurrentItemActive = isItemActive(item as any);

							const isBg = item.customItem.layerType === 'BG';

							const configItem = customizeCustomElements.find((elem) => elem.index === item.customItem.layerName);
							if (!configItem) return null;

							const robotPartsPrefix = `${ROBOT_PARTS_URL}/${
								configItem.hasPreview ? 'preview-' : ''
							}${getCurrentPartsVersion(isUsingOddVersion)}`;

							return (
								<div
									key={item.id}
									className={cn(
										'500:w-[162px] 500:h-[162px] 1280:w-[220px] 1280:h-[220px] relative aspect-square h-auto w-full shrink-0 cursor-pointer self-start rounded-xl border-2 border-white/[.0] transition-all',
										{ '!border-[#6153CC]': isCurrentItemActive }
									)}
									onClick={bindPartSelection(item as any)}
								>
									{isCurrentItemActive && (
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
												'absolute bottom-0 left-0 hidden h-[50px] w-full bg-gradient-to-t from-[#22242A]/[.5] to-[#22242A]/[.01]',
												{ '!block': isBg }
											)}
										></div>
										<div className={cn('mx-auto flex h-full w-full items-center justify-center')}>
											<RobotWardrobeImage src={`${robotPartsPrefix}/${item.customItem.layerName}.png`} />
										</div>
										<NewBody className={cn('z-1 relative -mt-[26px] max-w-full truncate text-center')}>
											{configItem.name}
										</NewBody>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}

			{!!filteredTokenCustomIcons.length && (
				<>
					<div className="1280:grid-cols-[repeat(auto-fill,_220px)] 500:grid-cols-[repeat(auto-fill,_162px)] 1280:w-full 500:px-0 grid grid-flow-dense grid-cols-[repeat(2,minmax(140px,_1fr))] justify-center gap-x-3 gap-y-4">
						<NewLabel1 className="1280:col-span-full 500:col-span-3 col-span-2 mt-10 w-full font-bold">
							Robot&apos;s items
						</NewLabel1>
						{filteredTokenCustomIcons.map((item) => {
							const isCurrentItemActive = isItemActive(item as any);

							const isBg = item.customItem.layerType === 'BG';

							const configItem = customizeCustomElements.find((elem) => elem.index === item.customItem.layerName);
							if (!configItem) return null;

							const robotPartsPrefix = `${ROBOT_PARTS_URL}/${
								configItem.hasPreview ? 'preview-' : ''
							}${getCurrentPartsVersion(isUsingOddVersion)}`;

							return (
								<div
									key={item.id}
									className={cn(
										'500:w-[162px] 500:h-[162px] 1280:w-[220px] 1280:h-[220px] relative aspect-square h-auto w-full shrink-0 cursor-pointer self-start rounded-xl border-2 border-white/[.0] transition-all',
										{ '!border-[#6153CC]': isCurrentItemActive }
									)}
									onClick={bindPartSelection(item as any)}
								>
									{isCurrentItemActive && (
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
												'absolute bottom-0 left-0 hidden h-[50px] w-full bg-gradient-to-t from-[#22242A]/[.5] to-[#22242A]/[.01]',
												{ '!block': isBg }
											)}
										></div>
										<div className={cn('mx-auto flex h-full w-full items-center justify-center')}>
											<RobotWardrobeImage src={`${robotPartsPrefix}/${item.customItem.layerName}.png`} />
										</div>
										<NewBody className={cn('z-1 relative -mt-[26px] max-w-full truncate text-center')}>
											{configItem.name}
										</NewBody>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};
