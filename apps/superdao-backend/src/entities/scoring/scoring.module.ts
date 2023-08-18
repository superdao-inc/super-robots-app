import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CacheModule } from 'src/services/cache/cache.module';
import { ScoringApiDataProviderService } from 'src/entities/scoring/scoring.service';

@Module({
	imports: [CacheModule, HttpModule],
	providers: [ScoringApiDataProviderService],
	exports: [ScoringApiDataProviderService]
})
export class ScoringModule {}
