import cn from 'classnames';
import { useEffect } from 'react';
import { CUSTOMIZE_COLORS } from './constants';
import { GetTokenCustomItemsQuery, GetUserCustomItemsQuery } from 'src/gql/babyRobot.generated';
import { customizeCustomElements } from './constants.custom';

type Props = {
	userCustomItems: GetUserCustomItemsQuery['getUserCustomItems'];
	tokenCustomItems: GetTokenCustomItemsQuery['getTokenCustomItems'];
	currentColor: string | null;
	onColorSelection: (color: string | null) => void;
};

const colorsConfig = [
	{
		hex: '#FFCF01',
		name: 'lemon'
	},
	{
		hex: '#FF8135',
		name: 'orange'
	},
	{
		hex: '#FA61AA',
		name: 'bubblegum'
	},
	{
		hex: '#A055FF',
		name: 'plum'
	},
	{
		hex: '#31D8FE',
		name: 'sky'
	},
	{
		hex: '#B5ED30',
		name: 'lime'
	},
	{
		hex: '#FBFBFB',
		name: 'silver/snow'
	},
	{
		hex: '#464645',
		name: 'charcoal/onyx'
	}
];

export const SelectableInventoryColors = (props: Props) => {
	const { userCustomItems, tokenCustomItems, currentColor, onColorSelection } = props;

	useEffect(() => {
		if (currentColor) {
			const allItems = [...userCustomItems, ...tokenCustomItems];
			const currentConfigItemsColors = allItems.reduce((acc, item) => {
				const name = item.customItem.layerName;

				const colors = customizeCustomElements.find((elem) => elem.index === name)?.color ?? [];

				colors.forEach((color) => {
					if (!acc.includes(color)) acc.push(color);
				});

				return acc;
			}, [] as CUSTOMIZE_COLORS[]);

			const actualColorsConfig = colorsConfig.filter((confElem) =>
				currentConfigItemsColors.includes(confElem.name as any)
			);

			if (!actualColorsConfig.find((elem) => elem.name === currentColor)) onColorSelection(null);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const bindColor = (color: string | null) => () => onColorSelection(color);

	const allItems = [...userCustomItems, ...tokenCustomItems];
	const currentConfigItemsColors = allItems.reduce((acc, item) => {
		const name = item.customItem.layerName;

		const colors = customizeCustomElements.find((elem) => elem.index === name)?.color ?? [];

		colors.forEach((color) => {
			if (!acc.includes(color)) acc.push(color);
		});

		return acc;
	}, [] as CUSTOMIZE_COLORS[]);

	const actualColorsConfig = colorsConfig.filter((confElem) => currentConfigItemsColors.includes(confElem.name as any));

	return (
		<>
			<div
				className={cn(
					'500:h-[48px] 500:w-[48px] h-10 w-10 shrink-0 cursor-pointer rounded-full border-2 border-[#6153CC]/[.0] p-[2px] transition-all',
					{
						'border-[#6153CC]': currentColor === null
					}
				)}
				onClick={bindColor(null)}
			>
				<div className="h-full w-full cursor-pointer rounded-full">
					<img src="/color-palette.png" />
				</div>
			</div>
			{actualColorsConfig.map((color) => {
				return (
					<div
						key={color.name}
						className={cn(
							'500:h-[48px] 500:w-[48px] h-10 w-10 shrink-0 cursor-pointer rounded-full border-2 border-[#6153CC]/[.0] p-[2px] transition-all',
							{
								'border-[#6153CC]': currentColor === color.name
							}
						)}
						onClick={bindColor(color.name)}
					>
						<div className="h-full w-full rounded-full" style={{ backgroundColor: color.hex }}></div>
					</div>
				);
			})}
		</>
	);
};
