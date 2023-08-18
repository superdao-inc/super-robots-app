import SafeServiceClient, { OwnerResponse, SafeInfoResponse } from '@gnosis.pm/safe-service-client';
import { ethers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import Safe, { SafeTransactionOptionalProps, SafeAccountConfig, SafeFactory } from '@gnosis.pm/safe-core-sdk';
import { estimateTxGas } from '@gnosis.pm/safe-core-sdk/dist/src/utils/transactions/gas';

import { MetaTransactionData, OperationType } from '@gnosis.pm/safe-core-sdk-types';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import defaultTo from 'lodash/defaultTo';
import { getAddress } from '@sd/superdao-shared';
import { Chain } from '@sd/superdao-shared';

const EMPTY_DATA = '0x';

//TODO move networks service to shared and use here for mapping
const chainIds: {
	[key: number]: string;
} = {
	137: 'polygon',
	56: 'bsc'
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const compatibilityFallbackHandler = '0xf48f2b2d2a534e402487b3ee7c18c33aec0fe5e4';

const supportedNetworksIds = [1, 56, 137]; //TODO move networks service to shared and use here

const DEFAULT_SAFE_SERVICE_CLIENT_URL: string = 'https://safe-transaction.gnosis.io';

const getSafeServiceClientUrl = (chain: number) => `https://safe-transaction.${chainIds[chain]}.gnosis.io`;

const getEthAdapter = () => {
	const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any'); // TODO get provider from WalletProvider's context

	return new EthersAdapter({
		ethers,
		signer: provider.getSigner()
	});
};

const getSafeService = (chainId?: number) =>
	new SafeServiceClient({
		txServiceUrl: chainId && chainId !== 1 ? getSafeServiceClientUrl(chainId) : DEFAULT_SAFE_SERVICE_CLIENT_URL,
		ethAdapter: getEthAdapter()
	});

type TransferProps = {
	daoAddress: string;
	to: string;
	senderAddress: string;
	chainId: number;
	data: string;
	tokenAddress: string | null;
	amount?: string;
};

export type TxData = {
	hash: string;
	isExecuted: boolean;
};

export const estimateGas = async ({
	daoAddress,
	data,
	tokenAddress,
	amount,
	to
}: {
	daoAddress: string;
	data: string;
	tokenAddress: string | null;
	amount?: string;
	to?: string;
}) => {
	const ethAdapter = getEthAdapter();
	const safeSdk: Safe = await Safe.create({
		ethAdapter,
		safeAddress: daoAddress
	});

	const contract = safeSdk.getContractManager().safeContract;
	const isDataEmpty = data === EMPTY_DATA;

	const amountValue = isDataEmpty ? defaultTo<string>(amount, '0') : '0';
	const recipient = isDataEmpty ? defaultTo<string>(to, '') : tokenAddress || '';
	return estimateTxGas(contract, ethAdapter, recipient, amountValue, data, OperationType.DelegateCall);
};

export const sendFund = async ({
	daoAddress,
	senderAddress,
	data,
	chainId,
	tokenAddress,
	to,
	amount
}: TransferProps): Promise<TxData> => {
	const ethAdapter = getEthAdapter();

	const safeSdk: Safe = await Safe.create({
		ethAdapter,
		safeAddress: daoAddress
	});

	const safeService = getSafeService(chainId);

	const nonce = await safeService.getNextNonce(daoAddress);
	const isDataEmpty = data === EMPTY_DATA;

	const txData: MetaTransactionData = {
		to: isDataEmpty ? to : getAddress(tokenAddress) || '',
		value: isDataEmpty ? defaultTo<string>(amount, '0') : '0',
		data
	};

	const options: SafeTransactionOptionalProps = {
		nonce
	};

	const tx = await safeSdk.createTransaction([txData], options);

	await safeSdk.signTransaction(tx);

	const safeTxHash = await safeSdk.getTransactionHash(tx);

	await safeService.proposeTransaction({
		safeAddress: daoAddress,
		safeTransaction: tx,
		safeTxHash,
		senderAddress
	});

	const safeTxData = await safeService.getTransaction(safeTxHash);

	const safeInfo = await safeService.getSafeInfo(getAddress(daoAddress) || '');

	if (safeInfo.threshold === safeTxData?.confirmations?.length) {
		const executeTxResponse = await safeSdk.executeTransaction(tx);
		const receipt = executeTxResponse.transactionResponse && (await executeTxResponse.transactionResponse.wait());

		return { hash: executeTxResponse.hash, isExecuted: receipt?.status === 1 };
	}
	return { hash: safeTxHash, isExecuted: safeTxData.isExecuted };
};

export const getSafesAddresses = async (ownerAddress: string, chainId?: number) => {
	const safeService = getSafeService(chainId);
	const { safes }: OwnerResponse = await safeService.getSafesByOwner(getAddress(ownerAddress) || '');
	return safes;
};

const wait = (delay: number) => {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

const getSafeInfo = async (
	safeAddress: string,
	chainId?: number,
	delay: number = 2000,
	tries: number = 3
): Promise<SafeInfoResponse> => {
	const safeService = getSafeService(chainId);

	const onError = (err: any) => {
		const triesLeft = tries - 1;

		if (!triesLeft) {
			throw err;
		}
		return wait(delay).then(() => getSafeInfo(safeAddress, chainId, delay, triesLeft));
	};
	try {
		return safeService.getSafeInfo(getAddress(safeAddress) || '');
	} catch (e) {
		return onError(e);
	}
};

export const getSafes = async (ownerAddress: string, excludeAddresses: (string | null)[], chainId?: number) => {
	const safes = await getSafesAddresses(ownerAddress, chainId);
	const notAddedSafes = isEmpty(excludeAddresses)
		? safes
		: safes.filter((address) => !excludeAddresses.includes(getAddress(address)));

	const safesInfo = await Promise.all(
		notAddedSafes.map(async (safeAddress) => {
			try {
				const { address, threshold, owners }: SafeInfoResponse = await getSafeInfo(safeAddress, chainId);
				return { address, ownersCount: owners.length, confirmators: threshold, chainId };
			} catch (e) {
				throw e;
			}
		})
	);

	return safesInfo;
};

export const getAllChainSafes = async (ownerAddress: string, excludeAddresses: (string | null)[]) => {
	const responses = await Promise.all(
		supportedNetworksIds.map(async (id) => {
			try {
				return getSafes(ownerAddress, excludeAddresses, id);
			} catch (e) {
				throw e;
			}
		})
	);
	return flatten(responses);
};

export const deployNewSafe = async ({ owners, threshold }: { owners: string[]; threshold: number }) => {
	const safeAccountConfig: SafeAccountConfig = {
		owners,
		threshold,
		fallbackHandler: compatibilityFallbackHandler
	};

	let txHash = null;

	const callback = (hash: string): void => {
		txHash = hash;
	};

	const ethAdapter = getEthAdapter();
	const chainId = await ethAdapter.getChainId();
	if (chainId !== Chain.Polygon) throw new Error('Wrong network');

	const safeFactory = await SafeFactory.create({ ethAdapter });

	try {
		const safeSdk = await safeFactory.deploySafe({ safeAccountConfig, callback });

		return { txHash, safeAddress: safeSdk.getAddress() };
	} catch (e) {
		if (!txHash) throw e;

		// sometimes covalent can't find tx by hash without a delay
		await sleep(7000);
		return { txHash, safeAddress: null };
	}
};
