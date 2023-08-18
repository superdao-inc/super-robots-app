import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomItem } from './customItem.model';
import { CustomItemByUser } from './customItemByUser.model';
import { CustomItemByToken } from './customItemByToken.model';
import { CustomItemService } from './customItem.service';
import { CustomItemRepository } from './customItem.repo';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([CustomItem, CustomItemByUser, CustomItemByToken])],
	providers: [CustomItemService, CustomItemRepository],
	exports: [CustomItemService]
})
export class CustomItemModule {}
