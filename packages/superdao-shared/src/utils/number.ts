import round from 'lodash/round';

export const getRandomIntFromInterval = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * Round currency with many decimal digits to readable format.
 *
 * @example 1.12567 -> 1.13
 * @example 0.000012567 -> 0.000013
 */
export const roundCryptoCurrency = (value: number) => {
	if (value === 0) return 0;
	if (Math.trunc(value) !== 0) {
		// has int part
		return round(value, 2);
	}

	const decimalPart = value.toString().split('.')[1];
	let i = 0; // First non-zero digit index == leading zeros count
	for (i; i < decimalPart.length; i++) {
		if (decimalPart[i] !== '0') break;
	}

	// Round to first two non-zero decimal digits
	return round(value, i + 2);
};
