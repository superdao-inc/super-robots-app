import { createConnection, getConnection } from 'typeorm';
import { cliOptions } from 'src/utils/ormConfig';

export const mockConnection = {
	dataSource: {
		...cliOptions,
		name: 'test',
		database: 'superdao_test__',
		logging: false,
		synchronize: true
	},

	async create() {
		return await createConnection(this.dataSource);
	},

	get() {
		return getConnection('test');
	},

	async close() {
		await this.get().close();
	},

	async clear() {
		const connection = this.get();
		const entities = connection.entityMetadatas;

		await Promise.all(
			entities.map(async (e) => {
				const repo = connection.getRepository(e.name);
				await repo.query(`DELETE FROM ${e.tableName}`);
			})
		);
	}
};
