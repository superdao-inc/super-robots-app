import { isNotEmptyString } from './checkers';

export const getDefinedValues = <Item, Val>(items: Item[], locator: (item: Item) => Val) => {
	return items.map(locator).filter(isNotEmptyString) as NonNullable<Val>[];
};
