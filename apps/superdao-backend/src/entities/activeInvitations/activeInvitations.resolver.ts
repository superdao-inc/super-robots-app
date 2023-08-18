import { Resolver } from '@nestjs/graphql';
import { ActiveInvitations } from './activeInvitations.model';

@Resolver(() => ActiveInvitations)
export class ActiveInvitationsResolver {
	// constructor(private readonly userCodesService: UserCodesService) {}
}
