import { useState } from 'react';
import { BackIcon, NewTitle1 } from 'src/components';

import { subShopsConfig, subShopsParamsConfig } from './constants';
import { SelectableSubshopColorsSections } from './SelectableSubshopColorsSections';
import { SelectableSubshopItemsSections } from './SelectableSubshopItemsSections';
import { SelectableSubshopItemsConfigurableWardrobe } from './SelectableSubshopItemsConfigurableWardrobe';

type Props = {
	isUsingOddVersion: boolean;
	onPartSelection: (part: string | null, type: string) => void;
	onSetSelection: (fullset: { BG: string; BODY: string; TUBES: string; EYES: string; LEGS: string } | null) => void;
	partsConfig: {
		bg: string;
		eyes: string;
		tubes: string;
		body: string;
		legs: string;
	};
	imageName: string;
	subShop: string;
	onResetSubShop: () => void;
};

export const SelectableSubshopItems = (props: Props) => {
	const {
		partsConfig,
		onPartSelection: handleItemSelection,
		onSetSelection: handleSetSelection,
		isUsingOddVersion,
		imageName,
		subShop,
		onResetSubShop: handleResetSubShop
	} = props;

	const [currentSection, setCurrentSection] = useState('FULLSET');
	const [currentColor, setCurrentColor] = useState<string | null>(null);

	const handleSectionSelection = (section: string) => setCurrentSection(section);

	const handleColorSelection = (color: string | null) => setCurrentColor(color);

	const items = subShopsParamsConfig.find((config) => config.name === subShop)?.elems ?? [];
	const name = subShopsConfig.find((config) => config.path === subShop)?.name ?? '';

	return (
		<div className="1280:max-w-full 1280:px-6 mx-auto max-w-[672px]">
			<div
				className="500:top-9 500:left-10 1280:top-10 z-1 absolute top-3 left-5 flex h-10 w-10 cursor-pointer items-center justify-center transition-all duration-100 hover:opacity-50"
				onClick={handleResetSubShop}
			>
				<BackIcon className="opacity-40" />
			</div>

			<NewTitle1 className="1280:block mt-10 hidden w-full text-center">{name}</NewTitle1>
			<div className="500:mt-8 1280:mt-4 mx-auto mt-6 flex w-max max-w-full gap-[2px] overflow-x-auto px-5">
				<SelectableSubshopItemsSections
					items={items}
					currentSection={currentSection}
					onSectionSelection={handleSectionSelection}
				/>
			</div>
			<div className="mx-auto mt-3 flex w-max max-w-full gap-2 overflow-x-auto px-5">
				<SelectableSubshopColorsSections
					items={items}
					currentSection={currentSection}
					currentColor={currentColor}
					onColorSelection={handleColorSelection}
				/>
			</div>
			<SelectableSubshopItemsConfigurableWardrobe
				subShop={subShop}
				items={items}
				imageName={imageName}
				isUsingOddVersion={isUsingOddVersion}
				currentSection={currentSection}
				currentColor={currentColor}
				partsConfig={partsConfig}
				onSetSelection={handleSetSelection}
				onPartSelection={handleItemSelection}
			/>
		</div>
	);
};
