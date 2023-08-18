import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

export const validateAndNormalizeEmail = (value: string | null) => {
	if (!value || !isEmail(value)) {
		throw new Error('Invalid email');
	}

	return normalizeEmail(value);
};
