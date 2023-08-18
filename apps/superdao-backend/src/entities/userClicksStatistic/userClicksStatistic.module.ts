import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import {
	UserClicksStatistic,
	UserClicksStatisticCustomize,
	UserClicksStatisticNotifyMe,
	UserClicksStatisticRequestInvites
} from './userClicksStatistic.model';
import { UserClicksStatisticRepository } from './userClicksStatistic.repo';
import { UserClicksStatisticResolver } from './userClicksStatistic.resolver';
import { UserClicksStatisticsService } from './userClicksStatistic.service';
import { UserRequestedCodeRefill } from './userRequestedCodeRefill.model';

@Global()
@Module({
	imports: [
		UserModule,
		TypeOrmModule.forFeature([
			UserClicksStatistic,
			UserClicksStatisticCustomize,
			UserClicksStatisticNotifyMe,
			UserClicksStatisticRequestInvites,
			UserRequestedCodeRefill
		])
	],
	providers: [UserClicksStatisticsService, UserClicksStatisticResolver, UserClicksStatisticRepository],
	exports: [UserClicksStatisticsService]
})
export class UserClicksStatisticsModule {}
