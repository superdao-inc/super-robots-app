import { Module } from '@nestjs/common';

import { ethers } from 'ethers';

// gnosis
import Safe from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';

import { CustomLogger } from '@dev/nestjs-common';
import { config, itx } from 'src/config';
import { GNOSIS_ADMIN_ADDRESS } from 'src/constants';
import { EthersService } from './ethers.service';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';

const { privateKey, airdropRewardPrivateKey } = config.ethers;

@Module({
	imports: [EmailModule],
	providers: [
		EthersService,
		{
			provide: 'ETHERS_WALLET',
			useFactory: () => {
				return new ethers.Wallet(privateKey, itx);
			}
		},
		{
			inject: ['GNOSIS_SAFE_SDK', EmailService, CustomLogger],
			provide: 'ETHERS_SERVICE_REWARD_AIRDROP',
			useFactory: (gnosis, emailService, logger: CustomLogger) => {
				const signer = new ethers.Wallet(airdropRewardPrivateKey, itx);

				return new EthersService(signer, gnosis, emailService, logger);
			}
		},
		{
			inject: ['ETHERS_WALLET'],
			provide: 'GNOSIS_SAFE_SDK',
			useFactory: async (wallet: ethers.Wallet) => {
				const ethAdapter = new EthersAdapter({
					ethers,
					signer: wallet
				});

				return await Safe.create({
					ethAdapter,
					safeAddress: GNOSIS_ADMIN_ADDRESS
				});
			}
		}
	],
	exports: [EthersService, 'ETHERS_SERVICE_REWARD_AIRDROP']
})
export class EthersModule {}
