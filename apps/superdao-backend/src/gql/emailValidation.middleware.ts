import { FieldMiddleware, NextFn } from '@nestjs/graphql';
import { validateAndNormalizeEmail } from 'src/utils/validation/validateAndNormalizeEmail';

/*
 * This middleware is used to validate and normalize email addresses
 */
export const emailValidationMiddleware: FieldMiddleware = async (_, next: NextFn<string | null>) => {
	const value = await next();

	return validateAndNormalizeEmail(value);
};
