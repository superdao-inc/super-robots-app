import { DataSource } from 'typeorm';
import { log } from './logger';
import { cliOptions } from './ormConfig';

type InitDBOptions = {
	host: string;
	username: string;
	password: string;
	database: string;
	port: number;
};

export const initDB = async (options?: InitDBOptions) => {
	const dataSourceOptions = {
		...cliOptions,
		...(options || {})
	};
	const dataSource = new DataSource(dataSourceOptions);
	await ensureConnection(dataSource);
	const migrationsStatus = await dataSource.showMigrations();

	if (migrationsStatus) {
		log.error(new Error('There are pending migrations'));
		process.exit(1);
	}

	return dataSource;
};

async function updateConnectionEntities(dataSource: DataSource) {
	if (dataSource.options.synchronize) {
		await dataSource.synchronize();
	}
}

export async function ensureConnection(dataSource: DataSource) {
	if (!dataSource.isInitialized) {
		await dataSource.initialize();
	}

	if (process.env.NODE_ENV !== 'production') {
		if (dataSource.options.synchronize) {
			await dataSource.synchronize();
		}

		await updateConnectionEntities(dataSource);
	}
}
