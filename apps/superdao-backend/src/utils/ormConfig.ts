import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmLogger } from './ormLogger';
import { config } from 'src/config';

// TODO: create config for CI/CD purpose
export const options: PostgresConnectionOptions = {
	type: 'postgres',
	host: config.db.host,
	port: config.db.port,
	username: config.db.user,
	password: config.db.password,
	database: config.db.name,
	logging: config.env.isDev,
	synchronize: false,
	logger: new TypeOrmLogger()
};

export const cliOptions = {
	...options,
	migrations: ['./src/migrations/*.ts'],
	entities: ['./src/entities/**/*.model.ts']
};

export const distCliOptions = {
	...options,
	migrations: ['./dist/migrations/*.js'],
	entities: ['./dist/entities/**/*.model.js']
};
