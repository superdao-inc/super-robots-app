import { ReactElement, ReactNode } from 'react';
import { MultiValue, SingleValue, Props, ActionMeta, GroupBase, OptionsOrGroups, Options } from 'react-select';
import { Accessors } from 'react-select/dist/declarations/src/useCreatable';
import { CellSize } from '../cell';

export type DefaultSelectProps = {
	value: string | any;
	label: string | ReactNode;
	isDisabled?: boolean;
	description?: string;
	icon?: ReactNode;
	before?: ReactNode;
	controlIcon?: ReactNode;
};

export type CustomComponentType = (props: any) => ReactElement | null;

export type MultiChangeProps<T> = {
	value: MultiValue<T>;
	name?: string;
};

export type GetValueForMultiSelectProps<T> = {
	value: MultiValue<T>;
	actionMeta: ActionMeta<T>;
	options?: OptionsOrGroups<T, GroupBase<T>>;
};

export type CustomSelectProps<T> = Omit<Props<T>, 'onChange'> & {
	innerRef?: any;
	cellsSize?: CellSize;
	isMultiWithChips?: boolean;
	allSelectedPlaceholderComponent?: CustomComponentType;
	onChange?: (props: { value: SingleValue<T>; name?: string }) => void;
	onMultiChange?: (props: MultiChangeProps<T>) => void;
	allowSelectAll?: boolean;
	allOption?: T;
	isCreatable?: boolean;
	createLabel?: string;
	isValidNewOption?:
		| ((
				inputValue: string,
				value: Options<T>,
				options: OptionsOrGroups<T, GroupBase<T>>,
				accessors: Accessors<T>
		  ) => boolean)
		| undefined;
};
