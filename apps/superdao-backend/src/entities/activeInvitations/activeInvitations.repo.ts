import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ActiveInvitations } from './activeInvitations.model';

@Injectable()
export class ActiveInvitationsRepository {
	constructor(
		@InjectRepository(ActiveInvitations) private activeInvitationsRepository: Repository<ActiveInvitations>
	) {}

	async getaActiveInvitationsByOwnerId(ownerId: string) {
		return this.activeInvitationsRepository.find({ where: { owner: { id: ownerId } }, relations: ['invitedUser'] });
	}

	async getaActiveInvitationsByOwnerIdWithPagination(ownerId: string, offset: number, limit: number) {
		return this.activeInvitationsRepository.findAndCount({
			where: { owner: { id: ownerId } },
			relations: ['invitedUser'],
			take: limit,
			skip: offset
		});
	}

	async getaActiveInvitationsByCodeId(codeId: string) {
		return this.activeInvitationsRepository.find({ where: { code: { id: codeId } } });
	}

	async getaActiveInvitationsByCodeIdWithInvitedUserData(codeId: string) {
		return this.activeInvitationsRepository.find({ where: { code: { id: codeId } }, relations: ['invitedUser'] });
	}

	async getActiveInvitationsByCodeIdWithInvitedUserDataForInvites(codeId: string) {
		return this.activeInvitationsRepository.find({
			where: { code: { id: codeId }, createdAt: MoreThan(new Date('2023-06-27 18:00:00')) },
			relations: ['invitedUser']
		});
	}

	async registerCodeActivation(codeId: string, ownerId: string, invitedUserId: string) {
		return this.activeInvitationsRepository.save({
			code: { id: codeId },
			owner: { id: ownerId },
			invitedUser: { id: invitedUserId }
		});
	}
}
