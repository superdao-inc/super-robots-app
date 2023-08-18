import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { CustomLogger } from '@dev/nestjs-common';
import { sleep } from '@sd/superdao-shared';
import { config } from 'src/config';

const TTL = 24 * 60 * 60; // in seconds
const VALUE_LOG_LENGTH = 500;

const wrapLogValue = (value: string | null) => {
	if (value && value.length > VALUE_LOG_LENGTH) {
		const postfix = '<...>';
		return `${value.substring(0, VALUE_LOG_LENGTH)}${postfix}`;
	}

	return value;
};

const prefix = config.appEnv === 'prod' ? '' : 'stage:';

const withPrefix = (key: string) => `${prefix}${key}`;

@Injectable()
export class CacheService {
	constructor(@InjectRedis() private readonly redis: Redis, private logger: CustomLogger) {
		this.logger = logger.createScope(CacheService.name);
	}

	loadingLockValue = 'LOADING';

	currentTime = () => new Date().getTime();

	isCachedValue = (val: null | string): val is string => typeof val === 'string' && val !== this.loadingLockValue;

	async getDistributedOnce(key: string, getter: () => Promise<unknown>, CUSTOM_TTL: number) {
		// check if other nodes have not locked key
		const current = await this.get(key);

		try {
			if (current === null) {
				// set a flag in the redis that the job is in progress
				await this.redis.set(withPrefix(key), this.loadingLockValue, 'EX', 120); // TTL 2 min

				const value = await getter();

				await this.set(key, JSON.stringify(value), CUSTOM_TTL);

				return value;
			}
		} catch {
			await this.redis.del(withPrefix(key));
		}

		// if set, then wait for some time until the value appears
		if (current === this.loadingLockValue) {
			const endTime = new Date(this.currentTime() + 1000 * 60 * 2).getTime(); // 2 min

			// if not appeared after N time, then return null
			while (endTime > this.currentTime()) {
				const maybeData = await this.redis.get(withPrefix(key));
				if (maybeData === this.loadingLockValue) {
					sleep(500);
					continue;
				}
				return maybeData ? JSON.parse(maybeData) : maybeData;
			}

			return null;
		}

		return current ? JSON.parse(current) : current;
	}

	async ttl(key: string) {
		const value = await this.redis.ttl(withPrefix(key));
		this.logger.log(`Get ttl of cached value by key: ${withPrefix(key)}\nValue: ${wrapLogValue(`${value}`)}`);
		return value;
	}

	// for one-stage keys (collections:*daoAddress*)
	async get(key: string): Promise<string | null> {
		const value = await this.redis.get(withPrefix(key));
		this.logger.log(`Get cached value by key: ${withPrefix(key)}\nValue: ${wrapLogValue(value)}`);
		return value;
	}

	async set(key: string, value: string, customTTL?: number): Promise<void> {
		await this.redis.set(withPrefix(key), value, 'EX', customTTL ? customTTL : TTL);
		this.logger.log(`Set cached value with key: ${withPrefix(key)}\nCustomTTL: ${customTTL}`);
	}

	// use as hdelAll
	async del(key: string): Promise<number | void> {
		const value = await this.redis.del(withPrefix(key));
		this.logger.log(`Delete cached value by key: ${withPrefix(key)}`);
		return value;
	}

	async exists(key: string): Promise<number> {
		const value = await this.redis.exists(withPrefix(key));
		this.logger.log(`Get if key exists: ${withPrefix(key)}`);
		return value;
	}

	// if you need delAll - use redis hash functionality with hget, hset, hdel and so on...

	async getAndUpdate(
		key: string,
		dataManipulationFunc: () => Promise<string>,
		customTTL?: number,
		forceReload = false
	): Promise<string> {
		const cachedData = this.get(key)
			.then((data) => {
				if (data) return data;
				if (!forceReload) throw new Error(`[CacheService] Cached data not found for key: ${withPrefix(key)}`);
			})
			.catch((error: Error) => {
				this.logger.warn(error.message);
				throw error;
			});

		const updatedData = dataManipulationFunc()
			.then(async (data: string) => {
				await this.set(key, data, customTTL);
				return data;
			})
			.catch((error) => {
				this.logger.error(new Error('Error while trying to cache'), {
					key: withPrefix(key),
					error
				});
			});

		if (forceReload) return updatedData as Promise<string>;

		return Promise.any([cachedData, updatedData]) as Promise<string>;
	}

	// for non-one-stage keys (artworks:*daoAddress*:*collectionAddress*)
	// hash works MUCH faster than keys * patterns
	// https://www.notion.so/superdao/TechTalks-34d6b9fe6b0548a4a6e55cda838e8006#25a3b0dd5f6548b6877270565259668f
	async hget(key: string, field: string): Promise<string | null> {
		const value = await this.redis.hget(withPrefix(key), field);
		this.logger.log(`Hget cached value by key: ${withPrefix(key)}, field: ${field}\nValue: ${wrapLogValue(value)}`);
		return value;
	}

	async hset(key: string, field: string, value: string): Promise<void> {
		await this.redis.hset(withPrefix(key), field, value);
		this.logger.log(`Hset cached value with key: ${withPrefix(key)}, field: ${field}`);
	}

	async hdel(key: string, field: string): Promise<number | void> {
		const value = await this.redis.hdel(withPrefix(key), field);
		this.logger.log(`Hdel cached value by key: ${withPrefix(key)}, field: ${field}`);
		return value;
	}

	async hgetAndUpdate(
		key: string,
		field: string,
		dataManipulationFunc: () => Promise<string>,
		forceReload = false
	): Promise<string> {
		const cachedData = this.hget(key, field)
			.then((data) => {
				if (data) return data;
				if (!forceReload) throw new Error(`[CacheService] Cached data not found for key: ${withPrefix(key)}`);
			})
			.catch((error: Error) => {
				this.logger.warn(error.message);
				throw error;
			});

		const updatedData = dataManipulationFunc()
			.then(async (data: string) => {
				await this.hset(key, field, data);
				return data;
			})
			.catch((error) => {
				this.logger.error(new Error('Error while trying to cache'), {
					error
				});
			});

		if (forceReload) return updatedData as Promise<string>;

		return Promise.any([cachedData, updatedData]) as Promise<string>;
	}
}
