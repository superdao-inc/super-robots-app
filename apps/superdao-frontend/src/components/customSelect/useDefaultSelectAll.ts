import { useMemo } from 'react';
import { MultiValue, PropsValue } from 'react-select';
import { CustomSelectProps, DefaultSelectProps, GetValueForMultiSelectProps } from './types';

export const defaultAllOption = <T extends DefaultSelectProps>() =>
	({
		value: 'SELECT_ALL',
		label: 'Select all'
	} as T);

export const getValueForMultiSelect = <T extends DefaultSelectProps>({
	value,
	actionMeta,
	options
}: GetValueForMultiSelectProps<T>) => {
	const { action, option } = actionMeta;

	if (action === 'select-option') {
		return option?.value === defaultAllOption<DefaultSelectProps>().value ? (options as MultiValue<T>) : value;
	}

	if (action === 'deselect-option') {
		return option?.value === defaultAllOption<DefaultSelectProps>().value ? [] : value;
	}

	return value;
};

export const useDefaultSelectAll = <T>({
	allOption,
	isMulti,
	allowSelectAll,
	options,
	value
}: Pick<CustomSelectProps<T>, 'allOption' | 'isMulti' | 'allowSelectAll' | 'options' | 'value'>) => {
	const isAllSelectedActive = isMulti && allowSelectAll;
	const computedOptions = useMemo(
		() => (isAllSelectedActive && allOption ? [allOption, ...(options ?? [])] : options),
		[options, isAllSelectedActive, allOption]
	);

	const selectedValue = useMemo(() => {
		if (isAllSelectedActive) {
			const allValuesSelected = ((value ?? []) as MultiValue<T>)?.length === options?.length;

			return allValuesSelected ? ([allOption, ...(options ?? [])] as PropsValue<T>) : value;
		}

		return value;
	}, [value, options, allOption, isAllSelectedActive]);

	return {
		selectedValue,
		computedOptions
	};
};
