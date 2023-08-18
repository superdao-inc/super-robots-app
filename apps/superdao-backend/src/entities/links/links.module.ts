import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './links.model';
import { LinksService } from './links.service';

@Module({
	imports: [TypeOrmModule.forFeature([Links])],
	providers: [LinksService],
	exports: [LinksService]
})
export class LinksModule {}
