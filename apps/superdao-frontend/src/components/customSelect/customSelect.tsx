import { useMemo, useState } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { defaultAllOption, getValueForMultiSelect, useDefaultSelectAll } from './useDefaultSelectAll';
import {
	DefaultCrossIndicator,
	DefaultDropdownIndicator,
	DefaultMultiValue,
	DefaultOption,
	DefaultSingleValue
} from './defaultSelectComponents';

import { getDefaultColourStyles } from './defaultSelectStyles';
import { CustomSelectProps, DefaultSelectProps } from './types';

export function CustomSelect<T extends DefaultSelectProps>({
	value,
	options,
	allowSelectAll = false,
	allOption = defaultAllOption<T>(),
	isSearchable = false,
	isClearable = false,
	components,
	styles,
	menuIsOpen = false,
	innerRef,
	isMulti,
	cellsSize = 'md',
	withoutDisabledStyles,
	isMultiWithChips = false,
	allSelectedPlaceholderComponent,
	onChange,
	onMultiChange,
	isCreatable,
	createLabel,
	isValidNewOption,
	...props
}: CustomSelectProps<T> & {
	withoutDisabledStyles?: boolean;
}) {
	/**
	 * this state is here for styling DefaultDropdownIndicator
	 * */
	const [isOpen, setIsOpen] = useState(menuIsOpen);

	const handleMenuOpen = () => setIsOpen(true);
	const handleMenuClose = () => setIsOpen(false);

	const { selectedValue, computedOptions } = useDefaultSelectAll({
		value,
		allowSelectAll,
		isMulti,
		options,
		allOption
	});

	const computedStyles = useMemo(() => ({ ...getDefaultColourStyles<T>(), ...styles }), [styles]);
	const computedComponents = useMemo(
		() => ({
			Option: DefaultOption<T>(cellsSize, withoutDisabledStyles),
			DropdownIndicator: DefaultDropdownIndicator<T>(isOpen),
			ClearIndicator: DefaultCrossIndicator,
			SingleValue: DefaultSingleValue,
			...(!isMultiWithChips ? { MultiValue: DefaultMultiValue<T>(allSelectedPlaceholderComponent) } : {}),
			...components
		}),
		[cellsSize, withoutDisabledStyles, isOpen, isMultiWithChips, allSelectedPlaceholderComponent, components]
	);

	const handleChange = (value: MultiValue<T> | SingleValue<T>, actionMeta: ActionMeta<T>) => {
		const isAll = isMulti && value && Array.isArray(value);

		if (!isAll) {
			return onChange?.({ value: value as SingleValue<T>, name: props?.name });
		}

		const multiValue = getValueForMultiSelect({ value, actionMeta, options });

		return onMultiChange?.({
			value: multiValue,
			name: props?.name
		});
	};

	return (
		<>
			{isCreatable ? (
				<CreatableSelect
					ref={innerRef}
					id="creatable-select"
					instanceId="creatable-select"
					options={computedOptions}
					isClearable={isClearable}
					menuIsOpen={isOpen}
					isMulti={isMulti}
					closeMenuOnSelect={!isMulti}
					styles={computedStyles}
					components={computedComponents}
					onChange={handleChange}
					onMenuOpen={handleMenuOpen}
					onMenuClose={handleMenuClose}
					maxMenuHeight={190}
					hideSelectedOptions={false}
					value={selectedValue}
					isValidNewOption={isValidNewOption}
					formatCreateLabel={(input) => <>{`${createLabel} "${input}"`}</>}
					{...props}
				/>
			) : (
				<Select
					ref={innerRef}
					id="long-value-select"
					instanceId="long-value-select"
					options={computedOptions}
					isSearchable={isSearchable}
					isClearable={isClearable}
					menuIsOpen={isOpen}
					isMulti={isMulti}
					closeMenuOnSelect={!isMulti}
					styles={computedStyles}
					components={computedComponents}
					onChange={handleChange}
					onMenuOpen={handleMenuOpen}
					onMenuClose={handleMenuClose}
					maxMenuHeight={190}
					hideSelectedOptions={false}
					value={selectedValue}
					{...props}
				/>
			)}
		</>
	);
}
