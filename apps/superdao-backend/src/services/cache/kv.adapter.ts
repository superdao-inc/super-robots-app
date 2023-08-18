import { KeyValueCache } from 'apollo-server-core';
import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.service';

@Injectable()
export class ApolloKeyValueCacheAdapter implements KeyValueCache {
	public constructor(private readonly cacheService: CacheService) {}

	async get(key: string): Promise<string | undefined> {
		return (await this.cacheService.get(key)) || undefined;
	}

	async set(key: string, value: string, options?: { ttl?: number | null }): Promise<void> {
		await this.cacheService.set(key, value, options?.ttl || undefined);
	}

	async delete(key: string): Promise<boolean> {
		return !!(await this.cacheService.del(key));
	}
}
