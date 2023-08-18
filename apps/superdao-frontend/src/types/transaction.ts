/* eslint-disable import/no-extraneous-dependencies */
import { AccessList } from '@ethersproject/transactions';

export type JsonBignumber = { type: 'BigNumber'; hex: string };

export type ExtendedTransaction = {
	hash?: string;

	to?: string;
	from?: string;
	nonce: number;

	gasLimit: JsonBignumber;
	gasPrice?: JsonBignumber;

	data: string;
	value: JsonBignumber;
	chainId: number;

	r?: string;
	s?: string;
	v?: number;

	// Typed-Transaction features
	type?: number | null;

	// EIP-2930; Type 1 & EIP-1559; Type 2
	accessList?: AccessList;

	// EIP-1559; Type 2
	maxPriorityFeePerGas?: JsonBignumber;
	maxFeePerGas?: JsonBignumber;
};

export type TransactionResponse = { transaction: ExtendedTransaction };
