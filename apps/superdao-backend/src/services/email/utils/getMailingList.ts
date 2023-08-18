import { DeepPartial } from 'typeorm';

import { User } from 'src/entities/user/user.model';
import { shrinkWallet } from '@sd/superdao-shared';

export const getMailingListWithName = (users: DeepPartial<User>[]) => {
	const variables = users.reduce<Record<string, { name: string }>>((acc, user) => {
		if (user?.email) {
			acc[user.email] = {
				name: (user.displayName || user.ens || user.walletAddress) ?? ''
			};
		}
		return acc;
	}, {});

	const emails = Object.keys(variables);

	return { emails, variables };
};

export const getMailingListWithWalletAddress = (users: DeepPartial<User>[]) => {
	const variables = users.reduce<Record<string, { walletAddress: string }>>((acc, user) => {
		if (user?.email) {
			acc[user.email] = {
				walletAddress: shrinkWallet(user.walletAddress ?? '')
			};
		}
		return acc;
	}, {});

	const emails = Object.keys(variables);

	return { emails, variables };
};

export const getMailingListWithId = (users: DeepPartial<User>[]) => {
	const variables = users.reduce<Record<string, { id: string }>>((acc, user) => {
		if (user?.email) {
			acc[user.email] = {
				id: user.id ?? ''
			};
		}
		return acc;
	}, {});

	const emails = Object.keys(variables);

	return { emails, variables };
};
