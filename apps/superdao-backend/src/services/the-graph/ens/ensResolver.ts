import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client/core';
import zipObject from 'lodash/zipObject';
import fill from 'lodash/fill';
import fromPairs from 'lodash/fromPairs';

import { log } from 'src/utils/logger';

import { fetchWithTimeout } from '../utils';
import { isENS } from '@sd/superdao-shared';

const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens', fetch: fetchWithTimeout }),
	cache: new InMemoryCache()
});

interface Account {
	id: string;
	domains: [
		{
			name: string;
		}
	];
}

/*
 * WP-110: The Subgraph to resolve ENS names
 * subgraph – https://thegraph.com/hosted-service/subgraph/ensdomains/ens
 * github – https://github.com/ensdomains/ens-subgraph
 */
export class EnsResolver {
	static async resolve(name: string): Promise<string | null> {
		if (!isENS(name)) {
			return name;
		}
		const ensDomain = name.toLowerCase();
		try {
			const response = await client.query({
				query: gql`
					query ensQuery($name: String!) {
						domains(where: { name: $name }) {
							owner {
								id
							}
						}
					}
				`,
				variables: { name: ensDomain }
			});
			const { data } = response ?? {};
			const { domains } = data ?? {};

			return domains?.[0]?.owner?.id ?? null;
		} catch (e) {
			log.error(new Error('EnsResolver.resolve'), { name, e });
			return null;
		}
	}

	// Docs: https://docs.ens.domains/dapp-developer-guide/ens-as-nft#deriving-ens-name-from-tokenid
	static async lookup(walletAddress: string): Promise<string | null> {
		try {
			const response = await client.query({
				query: gql`
					query ensQuery($walletAddress: String!) {
						account(id: $walletAddress) {
							domains(first: 1) {
								name
							}
						}
					}
				`,
				variables: { walletAddress: walletAddress.toLowerCase() }
			});
			const { data } = response ?? {};

			return data?.account?.domains?.[0]?.name ?? null;
		} catch (e) {
			log.error(new Error('EnsResolver.lookup'), { walletAddress, e });
			return null;
		}
	}

	/** Method for resolving multiple ENS entries at once.
	 * @param walletAddresses Usually it would be 1000 addresses
	 * @returns Object whose entries are found ens domain or null keyed by appropriate wallet address.
	 */
	static async lookupBatch(walletAddresses: string[]): Promise<{ [walletAddress: string]: string | null }> {
		try {
			const response = await client.query<{ accounts: Account[] }>({
				query: gql`
					query ensQuery($walletAddresses: [String!]!) {
						accounts(where: { id_in: $walletAddresses }) {
							id
							domains(first: 1) {
								name
							}
						}
					}
				`,
				variables: { walletAddresses }
			});

			const { data } = response ?? {};
			const accounts = data.accounts || [];

			const nullEnsEntries = zipObject(walletAddresses, fill(Array(walletAddresses.length), null));
			const foundEnsEntries = fromPairs(accounts.map(({ id, domains: [{ name }] }) => [id, name]));
			return { ...nullEnsEntries, ...foundEnsEntries };
		} catch (e) {
			log.error(new Error('EnsResolver.lookupBatch'), { e });
			return {};
		}
	}
}
