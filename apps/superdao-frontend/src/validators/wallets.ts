import { z } from 'zod';

import { isAddress } from 'ethers/lib/utils';

export const walletSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1).max(100),
	description: z.string(),
	address: z.string().refine((value) => isAddress(value), {
		message: 'Invalid address'
	})
});

export const safeSchema = z.object({
	walletName: z.string().min(1).max(100),
	description: z.string(),
	owners: z.array(
		z.object({
			address: z.string()
		})
	),
	threshold: z.number().min(1)
});

export type WalletFields = z.infer<typeof walletSchema>;

export const createWalletRequest = walletSchema.omit({
	id: true
});

export type CreateWalletRequest = z.infer<typeof createWalletRequest>;
