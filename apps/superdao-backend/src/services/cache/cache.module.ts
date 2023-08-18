import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ApolloKeyValueCacheAdapter } from 'src/services/cache/kv.adapter';

@Global()
@Module({
	providers: [CacheService, ApolloKeyValueCacheAdapter],
	exports: [CacheService, ApolloKeyValueCacheAdapter]
})
export class CacheModule {}
