import { Injectable } from '@nestjs/common';

import { CustomItemRepository } from './customItem.repo';

@Injectable()
export class CustomItemService {
	constructor(private readonly customItemRepository: CustomItemRepository) {}

	async getUserCustomItemsByUserId(userId: string) {
		return this.customItemRepository.getUserCustomItemsByUserId(userId);
	}

	async getUserCustomItemsByIds(userId: string, ids: string[]) {
		return this.customItemRepository.getUserCustomItemsByIds(userId, ids);
	}

	async getTokenCustomItemsByTokenId(tokenId: string) {
		return this.customItemRepository.getTokenCustomItemsByTokenId(tokenId);
	}

	async offItems(tokenId: string, toOffIds: string[]) {
		return this.customItemRepository.offItems(tokenId, toOffIds);
	}

	async onItems(tokenId: string, toOnIds: string[]) {
		return this.customItemRepository.onItems(tokenId, toOnIds);
	}

	async transferItems(userId: string, tokenId: string, toTransferIds: string[]) {
		const items = await this.getUserCustomItemsByIds(userId, toTransferIds);

		return this.customItemRepository.runTransferItemsTransaction(tokenId, items);
	}

	async getActiveCustomTokenItems(tokenId: string) {
		return this.customItemRepository.getActiveCustomTokenItems(tokenId);
	}
}
