import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { UserCodeValidAddresses } from './userCodeValidAddresses.model';

@Injectable()
export class UserCodeValidAddressesRepository {
	constructor(
		@InjectRepository(UserCodeValidAddresses)
		private readonly userCodeValidAddressesRepository: Repository<UserCodeValidAddresses>
	) {}

	async getUserWalletValidForCodeFlowByWallet(wallet: string) {
		return this.userCodeValidAddressesRepository.findOne({ where: { user: { walletAddress: wallet } } });
	}

	async insertUserWalletValidForCodeFlow(wallet: string) {
		return this.userCodeValidAddressesRepository.save({ user: { walletAddress: wallet } });
	}
}
