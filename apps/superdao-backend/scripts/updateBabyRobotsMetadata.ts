import { Contract, ethers } from 'ethers';
import { config, provider, itx } from 'src/config';
import { feeService } from 'src/services/feeService';
import { erc721BabyRobotMintAbi } from 'src/services/erc721MintWorker/erc721MintWorker.constants';

// this script will update metadata for token from min to max for contractAddress collection on opensea

(async () => {
	const startDate = Date.now();

	console.log(`start: `, startDate);

	const min = 0;
	const max = 100;

	const batchSize = 20;

	let current = min;

	const contract = new Contract(config.robots.erc721BabyRobotContractAddress, erc721BabyRobotMintAbi, provider);

	const signer = new ethers.Wallet(config.ethers.airdropRewardPrivateKey, itx);

	while (current <= max) {
		const currentMax = Math.min(current + batchSize, max);

		console.log(`started: ${current} - ${currentMax}`);
		
		const txMetadataUpdateBatchData = await contract.populateTransaction['metadataUpdateBatch'](current, currentMax);

		const gas = await feeService.getGas();

		const tx = await signer.sendTransaction({
			...txMetadataUpdateBatchData,
			maxFeePerGas: gas.maxFeePerGas,
			maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
			gasLimit: gas.gasLimit
		}); 

		console.log(`processing: ${current} - ${currentMax}, tx: https://polygonscan.com/tx/${tx.hash}`);

		const txReceipt = await tx.wait(1);

		console.log(`finished: ${current} - ${currentMax}, status: ${txReceipt.status}`);

		current = currentMax;
	}

	const endDate = Date.now();

	console.log(`end: `, endDate, endDate - startDate);
})();
