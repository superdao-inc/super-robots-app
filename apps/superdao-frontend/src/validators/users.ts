import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SLUG_REGEX, emailSchema } from '@sd/superdao-shared';

export const userSchema = z.object({
	id: z.string(),
	walletAddress: z.string(),
	nonce: z.string(),
	displayName: z.string().max(100).nullable(),
	bio: z.string().nullable(),
	email: emailSchema.nullable().or(z.literal('')),
	slug: z.string().min(1).max(100).regex(SLUG_REGEX, 'Invalid shortname').nullable(),
	avatar: z.string().nullish(),
	cover: z.string().nullish(),
	site: z.string().nullable().or(z.literal('')), // TODO add validation
	twitter: z.string().nullable().or(z.literal('')), // TODO add validation
	instagram: z.string().nullable().or(z.literal('')), // TODO add validation
	telegram: z.string().nullable().or(z.literal('')), // TODO add validation
	discord: z.string().nullable().or(z.literal('')) // TODO add validation
});

export const userResolver = zodResolver(userSchema);
export const updateEmailResolver = zodResolver(z.object({ email: emailSchema }));

const updateUserRequest = userSchema.omit({
	email: true,
	walletAddress: true,
	nonce: true
});

export const updateUserResolver = zodResolver(updateUserRequest);
export type UpdateUserRequest = z.infer<typeof updateUserRequest>;

export const banMemberRequest = z.object({
	userId: z.string(),
	transactionHash: z.string(),
	daoAddress: z.string()
});
export type BanMemberRequest = z.infer<typeof banMemberRequest>;
