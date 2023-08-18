import { Logger } from 'typeorm';
import { log } from './logger';
import { config } from 'src/config';

/* eslint-disable class-methods-use-this */

export class TypeOrmLogger implements Logger {
	log(level: 'log' | 'info' | 'warn', message: any) {
		log.debug(message, { level });
	}

	logMigration(message: string) {
		log.log(message);
	}

	logQuery(query: string, parameters?: any[]) {
		if (!config.env.isMigration) return;
		log.log(query, { parameters });
	}

	logQueryError(error: string, query: string, parameters?: any[]) {
		log.error(new Error(`SQL Error\n${error}`), { query, parameters });
	}

	logQuerySlow(time: number, query: string, parameters?: any[]) {
		log.warn(`SQL Slow query`, { time, query, parameters });
	}

	logSchemaBuild(message: string) {
		log.log(message);
	}
}
