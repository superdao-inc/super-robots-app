import { StylesConfig } from 'react-select';
import { borders, colors } from 'src/style';

export function getDefaultColourStyles<T>(): StylesConfig<T> {
	return {
		control: (styles, { isFocused, menuIsOpen }) => ({
			...styles,
			background: isFocused || menuIsOpen ? colors.backgroundTertiaryHover : colors.overlaySecondary,
			color: colors.foregroundPrimary,
			border: 0,
			borderRadius: borders.medium,
			cursor: 'pointer',
			boxShadow: 'none',
			padding: '8px 16px',
			fontSize: '15px',
			lineHeight: '24px'
		}),
		option: (_, { isDisabled, isFocused }) => {
			let backgroundColor = isFocused ? colors.overlaySecondary : colors.backgroundTertiary;
			backgroundColor = isDisabled ? colors.backgroundTertiary : backgroundColor;

			return {
				color: colors.foregroundPrimary,
				backgroundColor,
				margin: 0,
				padding: '8px 16px',
				cursor: isDisabled ? 'not-allowed' : 'pointer',
				opacity: isDisabled ? '0.1' : '1'
			};
		},
		input: (styles) => ({
			...styles,
			color: colors.foregroundPrimary,
			margin: 0,
			padding: 0
		}),
		dropdownIndicator: (styles, { isFocused }) => ({
			...styles,
			transform: isFocused ? '180deg' : '0deg'
		}),
		indicatorSeparator: () => ({
			display: 'none'
		}),
		menu: (styles) => ({
			...styles,
			backgroundColor: colors.backgroundTertiary,
			borderRadius: '8px'
		}),
		menuList: (styles) => ({
			...styles,
			padding: '8px 0'
		}),
		valueContainer: (styles) => ({ ...styles, padding: 0 }),
		placeholder: (styles) => ({ ...styles, margin: 0, color: colors.foregroundSecondary })
	};
}
