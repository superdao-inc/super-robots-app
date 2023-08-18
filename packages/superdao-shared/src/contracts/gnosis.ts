import { providers, Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';

import { Gnosis__factory } from './generated';

// The hard coded value that Gnosis Safe contract's isValidSignature method returns if the message was signed
// https://github.com/gnosis/safe-contracts/blob/dec13f7cdab62056984343c4edfe40df5a1954dc6/contracts/handler/CompatibilityFallbackHandler.sol#L19
const GNOSIS_VALID_SIGNATURE_MAGIC_VALUE = '0x1626ba7e';
const GNOSIS_SAFE_SIGN_MESSAGE_EVENT_NAME = 'SignMsg';

export const createGnosisContract = (address: string, providerOrSigner: Provider | Signer) => {
	const contract = Gnosis__factory.connect(address, providerOrSigner);

	return {
		...contract,
		validateSignature: async (...args: Parameters<typeof contract.isValidSignature>) => {
			const magicValue = await contract.isValidSignature(...args);

			return magicValue === GNOSIS_VALID_SIGNATURE_MAGIC_VALUE;
		},
		onSign: (listener: providers.Listener) => {
			contract.on(GNOSIS_SAFE_SIGN_MESSAGE_EVENT_NAME, listener);

			return () => contract.removeListener(GNOSIS_SAFE_SIGN_MESSAGE_EVENT_NAME, listener);
		}
	};
};
