import { Injectable } from '@nestjs/common';

import { CustomLogger } from '@dev/nestjs-common';
import { UserCodesRepository } from './userCodes.repo';
import { UserService } from '../user/user.service';
import {
	AddActivationsToUserCodeResponse,
	CodeInvitationsInfoDto,
	CodeInvitationsInfoWithOwnerDataDto
} from './userCodes.dto';
import { ActiveInvitationsService } from '../activeInvitations/activeInvitations.service';
import { UserCodeValidAddressesRepository } from './userCodeValidAddresses.repo';
import { UserClicksStatisticsService } from '../userClicksStatistic/userClicksStatistic.service';
import { featureToggles } from 'src/services/featureToggles';

const DEFAULT_ACTIVATIONS_COUNT = 10;
const DEFAULT_INFLUENCER_ACTIVATIONS_COUNT = 1000;

@Injectable()
export class UserCodesService {
	constructor(
		private readonly userCodesRepository: UserCodesRepository,
		private readonly userClicksStatisticService: UserClicksStatisticsService,
		private readonly userCodeValidAddressesRepository: UserCodeValidAddressesRepository,
		private readonly userService: UserService,
		private readonly activeInvitationsService: ActiveInvitationsService,
		private logger: CustomLogger
	) {
		this.logger = logger.createScope(UserCodesService.name);
	}

	async getUserCodeById(codeId: string) {
		return this.userCodesRepository.getUserCodeById(codeId);
	}

	async getUserCodeByCodeWithUserData(code: string) {
		return this.userCodesRepository.getUserCodeByCodeWithUserData(code);
	}

	async getUserCodeByUserId(userId: string) {
		return this.userCodesRepository.getUserCodeByUserId(userId);
	}

	async createCode(userId: string) {
		const isUserInfluencer = await this.isUserInfluencer(userId);

		return this.userCodesRepository.createCode(
			userId,
			isUserInfluencer ? DEFAULT_INFLUENCER_ACTIVATIONS_COUNT : DEFAULT_ACTIVATIONS_COUNT
		);
	}

	async getAndGenerateIfNotExistsUserCodeByUserId(userId: string) {
		let code = await this.getUserCodeByUserId(userId);

		if (!code) {
			code = await this.createCode(userId);
		}

		return code;
	}

	async insertUserWalletValidForCodeFlow(wallet: string) {
		return this.userCodeValidAddressesRepository.insertUserWalletValidForCodeFlow(wallet);
	}

	async getCodeInvitationsInfo(userId: string): Promise<CodeInvitationsInfoDto | null> {
		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) return null;

		const validEntry = await this.userCodeValidAddressesRepository.getUserWalletValidForCodeFlowByWallet(
			user.walletAddress
		);

		if (!validEntry) {
			return {
				isCodeFlowAvailable: false,
				code: '',
				remainingCodeActivations: 0,
				maxCodeActivations: 0
			};
		}

		const codeResponse = await this.getAndGenerateIfNotExistsUserCodeByUserId(userId);

		const codeActivationsResponse = await this.activeInvitationsService.getaActiveInvitationsByCodeId(codeResponse.id);

		return {
			isCodeFlowAvailable: true,
			code: codeResponse.code,
			maxCodeActivations: codeResponse.activationsCount,
			remainingCodeActivations: codeResponse.activationsCount - codeActivationsResponse.length
		};
	}

	async getCodeInvitationsInfoByCode(code: string): Promise<CodeInvitationsInfoWithOwnerDataDto | null> {
		const codeResponse = await this.getUserCodeByCodeWithUserData(code);
		if (!codeResponse) return null;

		const codeActivationsResponse = await this.activeInvitationsService.getaActiveInvitationsByCodeId(codeResponse.id);

		return {
			isCodeFlowAvailable: true,
			code: codeResponse.code,
			codeOwner: codeResponse.owner.walletAddress,
			maxCodeActivations: codeResponse.activationsCount,
			remainingCodeActivations: codeResponse.activationsCount - codeActivationsResponse.length
		};
	}

	async getCodeInvitationsInfoByCodeWithActivationsData(code: string) {
		const codeResponse = await this.getUserCodeByCodeWithUserData(code);
		if (!codeResponse) return null;

		const codeActivationsResponse =
			await this.activeInvitationsService.getaActiveInvitationsByCodeIdWithInvitedUserData(codeResponse.id);

		return {
			isCodeFlowAvailable: true,
			code: codeResponse.code,
			codeId: codeResponse.id,
			codeOwner: codeResponse.owner.walletAddress,
			codeOwnerId: codeResponse.owner.id,
			maxCodeActivations: codeResponse.activationsCount,
			remainingCodeActivations: codeResponse.activationsCount - codeActivationsResponse.length,
			codeActivationsResponse
		};
	}

	async getCodeInvitationsInfoByCodeWithActivationsDataForInvites(code: string) {
		const codeResponse = await this.getUserCodeByCodeWithUserData(code);
		if (!codeResponse) return null;

		const codeActivationsResponse =
			await this.activeInvitationsService.getActiveInvitationsByCodeIdWithInvitedUserDataForInvites(codeResponse.id);

		return {
			codeActivationsResponse
		};
	}

	async addActivationsToUserCodes(userIds: string[]) {
		await this.userCodesRepository.addActivationsToUserCodes(userIds);
	}

	async addActivationsToUserCode(userId: string): Promise<AddActivationsToUserCodeResponse> {
		try {
			const user = await this.userService.getUserByIdWithCache(userId);
			if (!user) {
				this.logger.error(new Error('Attempt to refill code for user that was not found'), { userId });

				return { status: false, isCodeRefilled: false };
			}

			const code = await this.getUserCodeByUserId(userId);
			if (!code) {
				this.logger.error(new Error('Attempt to refill code for user that has no codes available'), { userId });

				return { status: false, isCodeRefilled: false };
			}

			const codeActivationsResponse = await this.activeInvitationsService.getaActiveInvitationsByCodeId(code.id);
			if (codeActivationsResponse.length < code.activationsCount) {
				this.logger.error(new Error('Attempt to refill code for user that has active invitations available'), {
					userId,
					code: code.code,
					codeId: code.id
				});

				return { status: false, isCodeRefilled: false };
			}

			const userRequestedCodeRefillData = await this.userClicksStatisticService.getUserRequestedCodeRefillData(
				user.walletAddress
			);
			if (!userRequestedCodeRefillData?.id) {
				await this.userClicksStatisticService.saveUserRequestedCodeRefillData(user.walletAddress);

				const isUserInfluencer = await this.isUserInfluencer(userId);

				const refillCount = isUserInfluencer ? DEFAULT_INFLUENCER_ACTIVATIONS_COUNT : DEFAULT_ACTIVATIONS_COUNT;

				code.activationsCount = code.activationsCount + refillCount;

				await code.save();

				return { status: true, isCodeRefilled: true };
			}

			const isStatisticClickRequestInvitesRegistered =
				await this.userClicksStatisticService.getIsStatisticClickRequestInvitesRegistered(user.walletAddress);
			if (!isStatisticClickRequestInvitesRegistered?.id) {
				await this.userClicksStatisticService.saveStatisticClickRequestInvites(user.walletAddress);
			}

			if (featureToggles.isEnabled('robot_infinite_code_refill')) {
				const isUserInfluencer = await this.isUserInfluencer(userId);

				const refillCount = isUserInfluencer ? DEFAULT_INFLUENCER_ACTIVATIONS_COUNT : DEFAULT_ACTIVATIONS_COUNT;

				code.activationsCount = code.activationsCount + refillCount;

				await code.save();

				return { status: true, isCodeRefilled: true };
			}

			return { status: true, isCodeRefilled: false };
		} catch (e) {
			this.logger.error(new Error('Error during refill code'), { userId, e });

			return { status: false, isCodeRefilled: false };
		}
	}

	async getCanUserRefillCode(userId: string) {
		if (featureToggles.isEnabled('robot_infinite_code_refill')) {
			return true;
		}

		const user = await this.userService.getUserByIdWithCache(userId);
		if (!user) {
			this.logger.error(new Error('Attempt to refill code for user that was not found'), { userId });

			return false;
		}

		const isStatisticClickRequestInvitesRegistered =
			await this.userClicksStatisticService.getIsStatisticClickRequestInvitesRegistered(user.walletAddress);

		return !isStatisticClickRequestInvitesRegistered?.id;
	}

	async isUserInfluencer(_userId: string) {
		return false;
	}
}
