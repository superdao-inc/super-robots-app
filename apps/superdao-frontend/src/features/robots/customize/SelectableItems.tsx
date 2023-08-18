import { useState } from 'react';
import { useRouter } from 'next/router';
import { BackIcon, NewTitle1 } from 'src/components';

import { SelectableColorsSections } from './SelectableColorsSections';
import { SelectableItemsSections } from './SelectableItemsSections';
import { SelectableItemsConfigurableWardrobe } from './SelectableItemsConfigurableWardrobe';
import { useSwitch } from 'src/hooks';
import { SelectableItemsExitModal } from './SelectableItemsExitModal';
import { SelectableItemsInventory } from './SelectableItemsInventory';
import { GetTokenCustomItemsQuery, GetUserCustomItemsQuery } from 'src/gql/babyRobot.generated';
import { CustomItemByTokenResponse } from 'src/types/types.generated';
import { CustomItemByTokenType } from './types';
import { SelectableInventoryColors } from './SelectableInventoryColors';

type Props = {
	isUsingOddVersion: boolean;
	onPartSelection: (part: string | null, type: string) => void;
	partsConfig: {
		bg: string;
		eyes: string;
		tubes: string;
		body: string;
		legs: string;
	};
	onSelectSubShop: (subShop: string) => void;
	isRobotChanged: boolean;
	isDemo?: boolean;
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

export const SelectableItems = (props: Props) => {
	const {
		partsConfig,
		onPartSelection: handleItemSelection,
		isUsingOddVersion,
		onSelectSubShop: handleSelectSubShop,
		isRobotChanged,
		isDemo,
		userCustomItems,
		tokenCustomItems,
		customPartsConfig,
		onCustomPartSelection
	} = props;

	const { push, query, back } = useRouter();
	const { tokenId } = query;

	const [isExitModalOpen, { on, off }] = useSwitch(false);

	const [currentSection, setCurrentSection] = useState('FEATURED');
	const [currentColor, setCurrentColor] = useState<string | null>(null);

	const handleSectionSelection = (section: string) => setCurrentSection(section);

	const handleColorSelection = (color: string | null) => setCurrentColor(color);

	const handleRedirectToRobot = () => {
		if (isRobotChanged && !isDemo) {
			on();
			return;
		}

		if (isDemo) {
			back();

			return;
		}

		push(`/robots/${tokenId}`);
	};

	const handleExit = () => {
		off();
		push(`/robots/${tokenId}`);
	};

	return (
		<div className="1280:max-w-full 1280:px-6 mx-auto max-w-[672px]">
			<div
				className="z-1 1280:flex absolute top-10 left-10 hidden h-10 w-10 cursor-pointer items-center justify-center transition-all duration-100 hover:opacity-50"
				onClick={handleRedirectToRobot}
			>
				<BackIcon className="opacity-40" />
			</div>

			<NewTitle1 className="1280:block mt-10 hidden w-full text-center">
				{isDemo ? 'Try customization' : 'Customize your Robot'}
			</NewTitle1>
			<div className="500:mt-8 1280:mt-4 mx-auto mt-6 flex w-max max-w-full gap-[2px] overflow-x-auto px-5">
				<SelectableItemsSections
					userCustomItems={userCustomItems}
					tokenCustomItems={tokenCustomItems}
					isDemo={isDemo}
					currentSection={currentSection}
					onSectionSelection={handleSectionSelection}
				/>
			</div>
			<div className="mx-auto mt-3 flex w-max max-w-full gap-2 overflow-x-auto px-5">
				{currentSection === 'INVENTORY' ? (
					<SelectableInventoryColors
						userCustomItems={userCustomItems}
						tokenCustomItems={tokenCustomItems}
						currentColor={currentColor}
						onColorSelection={handleColorSelection}
					/>
				) : (
					<SelectableColorsSections
						currentSection={currentSection}
						currentColor={currentColor}
						onColorSelection={handleColorSelection}
					/>
				)}
			</div>
			{currentSection === 'INVENTORY' ? (
				<SelectableItemsInventory
					userCustomItems={userCustomItems}
					tokenCustomItems={tokenCustomItems}
					isUsingOddVersion={isUsingOddVersion}
					currentColor={currentColor}
					customPartsConfig={customPartsConfig}
					onCustomPartSelection={onCustomPartSelection}
				/>
			) : (
				<SelectableItemsConfigurableWardrobe
					onSelectSubShop={handleSelectSubShop}
					isUsingOddVersion={isUsingOddVersion}
					currentSection={currentSection}
					currentColor={currentColor}
					partsConfig={partsConfig}
					onPartSelection={handleItemSelection}
				/>
			)}

			<SelectableItemsExitModal isOpen={isExitModalOpen} onClose={off} onExit={handleExit} />
		</div>
	);
};
