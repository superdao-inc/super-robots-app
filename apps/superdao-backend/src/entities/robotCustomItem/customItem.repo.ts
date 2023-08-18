import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CustomItemByUser } from './customItemByUser.model';
import { CustomItemByToken } from './customItemByToken.model';

@Injectable()
export class CustomItemRepository {
	constructor(
		@InjectRepository(CustomItemByUser) private readonly customItemByUserRepository: Repository<CustomItemByUser>,
		@InjectRepository(CustomItemByToken) private readonly customItemByTokenRepository: Repository<CustomItemByToken>,
		@InjectDataSource() private dataSource: DataSource
	) {}

	async getUserCustomItemsByUserId(userId: string) {
		return this.customItemByUserRepository.find({ where: { user: { id: userId } }, relations: ['customItem'] });
	}

	async getUserCustomItemsByIds(userId: string, ids: string[]) {
		return this.customItemByUserRepository.find({
			where: { user: { id: userId }, id: In(ids) },
			relations: ['customItem']
		});
	}

	async getTokenCustomItemsByTokenId(tokenId: string) {
		return this.customItemByTokenRepository.find({ where: { tokenId }, relations: ['customItem'] });
	}

	async offItems(tokenId: string, toOffIds: string[]) {
		return this.customItemByTokenRepository.update({ id: In(toOffIds), tokenId }, { isEnabled: false });
	}

	async onItems(tokenId: string, toOnIds: string[]) {
		return this.customItemByTokenRepository.update({ id: In(toOnIds), tokenId }, { isEnabled: true });
	}

	async getActiveCustomTokenItems(tokenId: string) {
		return this.customItemByTokenRepository.find({ where: { tokenId, isEnabled: true }, relations: ['customItem'] });
	}

	async runTransferItemsTransaction(tokenId: string, items: CustomItemByUser[]) {
		await this.dataSource.transaction(async (manager) => {
			await manager.delete<CustomItemByUser>(CustomItemByUser, { id: In(items.map((item) => item.id)) });

			const entries = items.map((item) => {
				const customItemByToken = new CustomItemByToken();

				customItemByToken.isEnabled = true;
				customItemByToken.tokenId = tokenId;

				customItemByToken.customItem = item.customItem;

				return customItemByToken;
			});

			const result = await manager.save(CustomItemByToken, entries);

			return result;
		});
	}
}
