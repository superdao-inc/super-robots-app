import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.model';
import { UserCodes } from './userCodes.model';
import { UserCodesService } from './userCodes.service';
import { UserCodesResolver } from './userCodes.resolver';
import { UserCodesRepository } from './userCodes.repo';
import { UserModule } from '../user/user.module';
import { ActiveInvitationsModule } from '../activeInvitations/activeInvitations.module';
import { UserCodeValidAddresses } from './userCodeValidAddresses.model';
import { UserCodeValidAddressesRepository } from './userCodeValidAddresses.repo';
import { UserClicksStatisticsModule } from '../userClicksStatistic/userClicksStatistic.module';

@Global()
@Module({
	imports: [
		UserModule,
		ActiveInvitationsModule,
		UserClicksStatisticsModule,
		TypeOrmModule.forFeature([User, UserCodes, UserCodeValidAddresses])
	],
	providers: [UserCodesService, UserCodesResolver, UserCodesRepository, UserCodeValidAddressesRepository],
	exports: [UserCodesService]
})
export class UserCodesModule {}
