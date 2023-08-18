import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.model';
import { ActiveInvitations } from './activeInvitations.model';
import { UserCodes } from '../userCodes/userCodes.model';
import { ActiveInvitationsRepository } from './activeInvitations.repo';
import { ActiveInvitationsService } from './activeInvitations.service';
import { ActiveInvitationsResolver } from './activeInvitations.resolver';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([User, UserCodes, ActiveInvitations])],
	providers: [ActiveInvitationsService, ActiveInvitationsResolver, ActiveInvitationsRepository],
	exports: [ActiveInvitationsService]
})
export class ActiveInvitationsModule {}
