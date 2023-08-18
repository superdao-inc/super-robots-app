import { ForbiddenException, Injectable } from '@nestjs/common';

import { UserClicksStatisticRepository } from './userClicksStatistic.repo';
import { UserService } from '../user/user.service';
import { NotFoundError } from 'src/exceptions';

@Injectable()
export class UserClicksStatisticsService {
	constructor(
		private readonly userClicksStatisticRepository: UserClicksStatisticRepository,
		private readonly userService: UserService
	) {}

	// customize
	async saveStatisticClickCustomize(userId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) {
			throw new NotFoundError('User with such id not found');
		}

		const result = await this.getIsStatisticClickCustomizeRegistered(userId);
		if (result) {
			throw new ForbiddenException('Statistic click already registered');
		}

		const response = await this.userClicksStatisticRepository.saveStatisticClickCustomize(user.walletAddress);

		return !!response;
	}

	async getIsStatisticClickCustomizeRegistered(userId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) {
			throw new NotFoundError('User with such id not found');
		}

		const response = await this.userClicksStatisticRepository.getIsStatisticClickCustomizeRegistered(
			user.walletAddress
		);

		return !!response;
	}

	// notify me
	async saveStatisticClickNotifyMe(userId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) {
			throw new NotFoundError('User with such id not found');
		}

		const result = await this.getIsStatisticClickNotifyMeRegistered(userId);
		if (result) {
			throw new ForbiddenException('Statistic click already registered');
		}

		const response = await this.userClicksStatisticRepository.saveStatisticClickNotifyMe(user.walletAddress);

		return !!response;
	}

	async getIsStatisticClickNotifyMeRegistered(userId: string) {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) {
			throw new NotFoundError('User with such id not found');
		}

		const response = await this.userClicksStatisticRepository.getIsStatisticClickNotifyMeRegistered(user.walletAddress);

		return !!response;
	}

	// request invites
	async saveStatisticClickRequestInvites(wallet: string) {
		return this.userClicksStatisticRepository.saveStatisticClickRequestInvites(wallet);
	}

	async getIsStatisticClickRequestInvitesRegistered(wallet: string) {
		return this.userClicksStatisticRepository.getIsStatisticClickRequestInvitesRegistered(wallet);
	}

	async getAllIsStatisticClickRequestInvitesRegistered() {
		return this.userClicksStatisticRepository.getAllIsStatisticClickRequestInvitesRegistered();
	}

	// refill
	async saveUserRequestedCodeRefillData(wallet: string) {
		return this.userClicksStatisticRepository.saveUserRequestedCodeRefillData(wallet);
	}

	async getUserRequestedCodeRefillData(wallet: string) {
		return this.userClicksStatisticRepository.getUserRequestedCodeRefillData(wallet);
	}
}
