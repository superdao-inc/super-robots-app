import { ethers } from 'ethers';
import { MAX_DECIMAL_TAIL_IN_MATIC_PRICE, MIN_VISIBLE_TOKEN_AMOUNT, MIN_VISIBLE_USD_AMOUNT } from 'src/constants';

const cutDecimalNumberString = (value: string, digitsAfterDot = 3) =>
	+value.slice(0, value.indexOf('.') + digitsAfterDot + 1);

/**
 * method for getting a prettiered number
 * @param {string} value number in string
 * @param {number} digitsAfterDot max size after dot for decimal numbers
 * @param {boolean} fixedTailSize when this state is true, method return all numbers after dot without last zeros
 * @returns prettierd decimal or natural number
 */
export const cutNumber = (value: string, digitsAfterDot = 3, fixedTailSize = true) => {
	if (fixedTailSize) {
		return cutDecimalNumberString(value, digitsAfterDot);
	}

	const decimalDigits = value.split('.')?.[1];
	if (!decimalDigits) return +value;

	let lastUnzeroNumberIndex = 0;

	for (let index = 0; index <= decimalDigits.length; index++) {
		const number = decimalDigits[index];

		if (+number !== 0) {
			lastUnzeroNumberIndex = index;
		}
	}

	return cutDecimalNumberString(value, lastUnzeroNumberIndex);
};

export const formatEthersPriceWithSymbol = (price: string, decimals: number, fixed = MAX_DECIMAL_TAIL_IN_MATIC_PRICE) =>
	cutNumber(ethers.utils.formatUnits(price, decimals), fixed);

export const formatUnitsValue = (unitsValue: string, decimals: number, maximumFractionDigits: number = 5) => {
	try {
		const value = Number(ethers.utils.formatUnits(unitsValue, decimals));

		const formattedValue: string = new Intl.NumberFormat('en-US', {
			style: 'decimal',
			maximumFractionDigits
		}).format(value);

		return value !== 0 && value < MIN_VISIBLE_TOKEN_AMOUNT ? `< ${MIN_VISIBLE_TOKEN_AMOUNT}` : formattedValue;
	} catch (error) {
		return '0';
	}
};

export const formatUsdValue = (value: number = 0, minimumFractionDigits?: number) => {
	try {
		const formattedValue: string = new Intl.NumberFormat('en-US', {
			style: 'decimal',
			maximumFractionDigits: 2,
			minimumFractionDigits
		}).format(value);

		if (formattedValue === '$NaN') {
			return `${value}`;
		}

		return value !== 0 && value < MIN_VISIBLE_USD_AMOUNT ? `< ${MIN_VISIBLE_USD_AMOUNT}` : formattedValue;
	} catch (error) {
		return '0';
	}
};

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, si = true, dp = 1) {
	const thresh = si ? 1000 : 1024;

	if (Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}

	const units = si
		? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	let u = -1;
	const r = 10 ** dp;

	do {
		bytes /= thresh;
		++u;
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

	return bytes.toFixed(dp) + ' ' + units[u];
}

export const formatToCompactNotation = (value: number = 0, maximumFractionDigits: number = 1) => {
	const formatter = Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits
	});
	return formatter.format(value).toLowerCase();
};
