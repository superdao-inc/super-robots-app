import { isAddress } from 'ethers/lib/utils';

export const isString = (maybeStr: any): maybeStr is string => {
	return typeof maybeStr === 'string';
};

export const isNotEmptyString = (maybeStr: unknown): maybeStr is string => {
	return isString(maybeStr) && maybeStr.length !== 0;
};

export const isUniqueStringList = (strings: string[]) => {
	return new Set(strings).size === strings.length;
};

const ENS_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;
export const isENS = (ens: string) => ENS_REGEX.test(ens);

export const isAddressesList = (strings: string[]) => {
	for (let i = 0; i < strings.length; i += 1) {
		if (!isAddress(strings[i]) && !isENS(strings[i])) {
			return false;
		}
	}

	return true;
};

export const isNotEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
	return value !== null && value !== undefined;
};
