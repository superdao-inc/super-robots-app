import { z } from 'zod';

export const emailSchema = z.string().email();

export const isValidEmail = (email: string | undefined | null) => {
	return emailSchema.safeParse(email).success;
};
