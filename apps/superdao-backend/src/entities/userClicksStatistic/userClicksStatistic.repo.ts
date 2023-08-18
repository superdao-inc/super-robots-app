import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import {
	UserClicksStatisticCustomize,
	UserClicksStatisticNotifyMe,
	UserClicksStatisticRequestInvites
} from './userClicksStatistic.model';
import { UserRequestedCodeRefill } from './userRequestedCodeRefill.model';

@Injectable()
export class UserClicksStatisticRepository {
	constructor(
		@InjectRepository(UserClicksStatisticCustomize)
		private readonly userClicksStatisticCustomizeRepository: Repository<UserClicksStatisticCustomize>,
		@InjectRepository(UserClicksStatisticNotifyMe)
		private readonly userClicksStatisticNotifyMeRepository: Repository<UserClicksStatisticNotifyMe>,
		@InjectRepository(UserClicksStatisticRequestInvites)
		private readonly userClicksStatisticRequestInvitesRepository: Repository<UserClicksStatisticRequestInvites>,
		@InjectRepository(UserRequestedCodeRefill)
		private readonly userRequestedCodeRefillRepository: Repository<UserRequestedCodeRefill>
	) {}

	// customize
	async saveStatisticClickCustomize(wallet: string) {
		return this.userClicksStatisticCustomizeRepository.save({ wallet });
	}

	async getIsStatisticClickCustomizeRegistered(wallet: string) {
		return this.userClicksStatisticCustomizeRepository.findOne({ where: { wallet } });
	}

	// notify me
	async saveStatisticClickNotifyMe(wallet: string) {
		return this.userClicksStatisticNotifyMeRepository.save({ wallet });
	}

	async getIsStatisticClickNotifyMeRegistered(wallet: string) {
		return this.userClicksStatisticNotifyMeRepository.findOne({ where: { wallet } });
	}

	// request invites
	async saveStatisticClickRequestInvites(wallet: string) {
		return this.userClicksStatisticRequestInvitesRepository.save({ wallet });
	}

	async getIsStatisticClickRequestInvitesRegistered(wallet: string) {
		return this.userClicksStatisticRequestInvitesRepository.findOne({ where: { wallet } });
	}

	async getAllIsStatisticClickRequestInvitesRegistered() {
		return this.userClicksStatisticRequestInvitesRepository.find();
	}

	// refill
	async saveUserRequestedCodeRefillData(wallet: string) {
		return this.userRequestedCodeRefillRepository.save({ wallet });
	}

	async getUserRequestedCodeRefillData(wallet: string) {
		return this.userRequestedCodeRefillRepository.findOne({ where: { wallet } });
	}
}
