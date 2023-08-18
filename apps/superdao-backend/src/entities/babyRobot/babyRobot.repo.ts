import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Erc721MintFinilizeData, Erc721MintStartData } from 'src/services/erc721MintWorker/erc721MintWorker.types';
import { RobotMintAndWaitlistStatus } from './babyRobot.types';
import { BabyRobotMint } from './babyRobotMint.model';
import { BabyRobotLayers } from './babyRobotLayers.model';
import { RobotLayerMap } from '@sd/superdao-shared';
import { BabyRobotMintEligible } from './babyRobotMintEligible.model';
import { BabyRobotUserChoice } from './babyRobotUserChoice.model';
import { BabyRobotCustomizeEligible } from './babyRobotCustomizeEligible.model';

@Injectable()
export class BabyRobotRepository {
	constructor(
		@InjectRepository(BabyRobotMint) private babyRobotMintRepository: Repository<BabyRobotMint>,
		@InjectRepository(BabyRobotLayers) private babyRobotLayers: Repository<BabyRobotLayers>,
		@InjectRepository(BabyRobotMintEligible) private babyRobotMintEligible: Repository<BabyRobotMintEligible>,
		@InjectRepository(BabyRobotUserChoice) private babyRobotUserChoice: Repository<BabyRobotUserChoice>,
		@InjectRepository(BabyRobotCustomizeEligible)
		private babyRobotCustomizeEligible: Repository<BabyRobotCustomizeEligible>
	) {}

	async getRobotMintByUserId(userId: string) {
		return this.babyRobotMintRepository.findOne({ where: { user: { id: userId } } });
	}

	async getRobotMintsByUserIds(userIds: string[]) {
		return this.babyRobotMintRepository.find({ where: { user: { id: In(userIds) } }, relations: ['user'] });
	}

	async getRobotMintByTokenId(tokenId: string) {
		return this.babyRobotMintRepository.findOne({ where: { tokenId }, relations: { user: true } });
	}

	async waitlistRobot(userId: string, id?: string) {
		const isInDatabasePrefix = id ? { id } : {};

		return this.babyRobotMintRepository.save({
			...isInDatabasePrefix,
			user: { id: userId },
			status: RobotMintAndWaitlistStatus.IN_WAITLIST,
			imageNameSha: ''
		});
	}

	async mintRobot(userId: string, imageNameSha: string, id?: string) {
		const isInDatabasePrefix = id ? { id } : {};

		return this.babyRobotMintRepository.save({
			...isInDatabasePrefix,
			user: { id: userId },
			imageNameSha,
			status: RobotMintAndWaitlistStatus.IN_QUEUE
		});
	}

	async mintRobotAfterGenerating(mintId: string, userId: string, imageNameSha: string) {
		return this.babyRobotMintRepository.save({
			id: mintId,
			user: { id: userId },
			imageNameSha,
			status: RobotMintAndWaitlistStatus.IN_QUEUE
		});
	}

	async generateRobot(userId: string, imageNameSha: string, id?: string) {
		const isInDatabasePrefix = id ? { id } : {};

		return this.babyRobotMintRepository.save({
			...isInDatabasePrefix,
			user: { id: userId },
			imageNameSha,
			status: RobotMintAndWaitlistStatus.IN_GENERATING_QUEUE
		});
	}

	async finalizeMintBabyRobot(data: { robotMintId: string }[]) {
		return this.babyRobotMintRepository.save(
			data.map((entry) => ({ status: RobotMintAndWaitlistStatus.CLAIMED, id: entry.robotMintId }))
		);
	}

	async startErc721MintBabyRobot(data: Erc721MintStartData[]) {
		return this.babyRobotMintRepository.save(
			data.map((entry) => ({
				status: RobotMintAndWaitlistStatus.STARTED,
				id: entry.mintId,
				transactionHash: entry.transactionHash ?? null
			}))
		);
	}

	async finalizeErc721MintBabyRobot(data: Erc721MintFinilizeData[]) {
		return this.babyRobotMintRepository.save(
			data.map((entry) => ({
				status: RobotMintAndWaitlistStatus.CLAIMED,
				id: entry.mintId,
				tokenId: entry.tokenId ?? null
			}))
		);
	}

	async getBabyRobotsMintCount() {
		return this.babyRobotMintRepository.count({ where: { status: Not(RobotMintAndWaitlistStatus.IN_WAITLIST) } }); // filter by status if need only finilized
	}

	// layers

	async getRobotLayers(wallet: string) {
		return this.babyRobotLayers.findOne({ where: { wallet } });
	}

	async saveRobotLayers(wallet: string, layers: RobotLayerMap) {
		return this.babyRobotLayers.save({ wallet, layers });
	}

	// mint eligible

	async isUserEligibleForMint(userId: string) {
		return this.babyRobotMintEligible.findOne({ where: { user: { id: userId } } });
	}

	async saveRobotMintEligible(wallets: string[]) {
		return this.babyRobotMintEligible.save(
			wallets.map((wallet) => ({
				wallet
			}))
		);
	}

	// user choice

	async getUserChoice(tokenId: string) {
		return this.babyRobotUserChoice.findOne({ where: { tokenId } });
	}

	async saveUserChoice(tokenId: string, layers: RobotLayerMap) {
		return this.babyRobotUserChoice.save({ tokenId, layers });
	}

	// customize eligible

	async isUserEligibleForCustomize(userId: string) {
		return this.babyRobotCustomizeEligible.findOne({ where: { user: { id: userId } } });
	}

	async saveRobotCustomizeEligible(wallets: string[]) {
		return this.babyRobotCustomizeEligible.save(
			wallets.map((wallet) => ({
				wallet,
				maxActivationsCount: 1
			}))
		);
	}

	async increaseCustomizeEligibleMaxAttempts(wallet: string) {
		return this.babyRobotCustomizeEligible
			.createQueryBuilder()
			.update(BabyRobotCustomizeEligible)
			.set({ maxActivationsCount: () => '"maxActivationsCount" + 1' })
			.where({ wallet })
			.execute();
	}

	async increaseCustomizeEligibleUsedAttempts(wallet: string) {
		return this.babyRobotCustomizeEligible
			.createQueryBuilder()
			.update(BabyRobotCustomizeEligible)
			.set({ usedActivationsCount: () => '"usedActivationsCount" + 1' })
			.where({ wallet })
			.execute();
	}
}
