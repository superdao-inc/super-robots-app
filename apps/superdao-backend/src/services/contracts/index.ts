import { providers, utils } from 'ethers';
import { createGnosisContract } from '@sd/superdao-shared';
import { config } from 'src/config';

export class ContractsService {
	static async validateGnosisSignature(walletAddress: string, nonce: string, signature: string) {
		const provider = new providers.InfuraProvider(config.gnosis.network, config.infura.polygonProjectId);

		const gnosisSafeContract = createGnosisContract(walletAddress, provider);
		const messageHash = utils.hashMessage(nonce);

		return gnosisSafeContract.validateSignature(messageHash, signature).catch(() => false);
	}
}
