import { Injectable } from '@nestjs/common';
import { ActiveInvitationsRepository } from './activeInvitations.repo';

@Injectable()
export class ActiveInvitationsService {
	constructor(private readonly activeInvitationsRepository: ActiveInvitationsRepository) {}

	async getaActiveInvitationsByOwnerId(ownerId: string) {
		return this.activeInvitationsRepository.getaActiveInvitationsByOwnerId(ownerId);
	}

	async getaActiveInvitationsByOwnerIdWithPagination(ownerId: string, offset: number, limit: number) {
		return this.activeInvitationsRepository.getaActiveInvitationsByOwnerIdWithPagination(ownerId, offset, limit);
	}

	async getaActiveInvitationsByCodeId(codeId: string) {
		return this.activeInvitationsRepository.getaActiveInvitationsByCodeId(codeId);
	}

	async getaActiveInvitationsByCodeIdWithInvitedUserData(codeId: string) {
		return this.activeInvitationsRepository.getaActiveInvitationsByCodeIdWithInvitedUserData(codeId);
	}

	async getActiveInvitationsByCodeIdWithInvitedUserDataForInvites(codeId: string) {
		return this.activeInvitationsRepository.getActiveInvitationsByCodeIdWithInvitedUserDataForInvites(codeId);
	}

	async registerCodeActivation(codeId: string, ownerId: string, invitedUserId: string) {
		return this.activeInvitationsRepository.registerCodeActivation(codeId, ownerId, invitedUserId);
	}
}
