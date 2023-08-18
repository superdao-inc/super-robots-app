import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserCodes } from './userCodes.model';
import { generateCode } from './userCodes.utils';
import { sleep } from '@sd/superdao-shared';

@Injectable()
export class UserCodesRepository {
	constructor(
		@InjectRepository(UserCodes) private readonly userCodesRepository: Repository<UserCodes>,
		@InjectDataSource() private dataSource: DataSource
	) {}

	async getUserCodeById(codeId: string) {
		return this.userCodesRepository.findOne({ where: { id: codeId } });
	}

	async getUserCodeByUserId(userId: string) {
		return this.userCodesRepository.findOne({ where: { owner: { id: userId } } });
	}

	async getUserCodeByCode(code: string) {
		return this.userCodesRepository.findOne({ where: { code } });
	}

	async getUserCodeByCodeWithUserData(code: string) {
		return this.userCodesRepository.findOne({ where: { code }, relations: ['owner'] });
	}

	async createCode(userId: string, activationsCount: number) {
		let code = generateCode();

		let codeResponse = await this.getUserCodeByCode(code);

		// regenerate if exists
		while (codeResponse !== null) {
			code = generateCode();

			codeResponse = await this.getUserCodeByCode(code);
		}

		let result = null;

		while (!result) {
			try {
				result = await this.dataSource.transaction('SERIALIZABLE', async (manager) => {
					const codeResponseByUser = await manager.findOne(UserCodes, { where: { owner: { id: userId } } });
					if (codeResponseByUser?.id) {
						return codeResponseByUser;
					}

					const saveResult = await manager.save(UserCodes, { code, activationsCount, owner: { id: userId } });

					return saveResult;
				});
			} catch (e) {
				await sleep(500);
			}
		}

		return result;
	}

	async addActivationsToUserCodes(userIds: string[]) {
		return this.userCodesRepository
			.createQueryBuilder()
			.update(UserCodes)
			.set({ activationsCount: () => '"activationsCount" + 5' })
			.where({ owner: { id: In(userIds) } })
			.execute();
	}
}
