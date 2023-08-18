import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum RobotMintAndWaitlistStatus {
	IN_GENERATING_QUEUE = 'IN_GENERATING_QUEUE',
	IN_WAITLIST = 'IN_WAITLIST',
	IN_QUEUE = 'IN_QUEUE',
	STARTED = 'STARTED',
	CLAIMED = 'CLAIMED'
}

registerEnumType(RobotMintAndWaitlistStatus, {
	name: 'RobotMintAndWaitlistStatus'
});

export enum BabyRobotMintResponseStatus {
	ERROR = 'ERROR',
	SUCCESS = 'SUCCESS',
	ALREADY_MINTED = 'ALREADY_MINTED',
	ALREADY_WAITLISTED = 'ALREADY_WAITLISTED',
	EMAIL_MISSING = 'EMAIL_MISSING',
	IP_EXISTS = 'IP_EXISTS'
}

registerEnumType(BabyRobotMintResponseStatus, {
	name: 'BabyRobotMintResponseStatus'
});

@ObjectType()
export class MintBabyRobotResponse {
	@Field(() => BabyRobotMintResponseStatus)
	status: BabyRobotMintResponseStatus;
}

export enum UpdateRobotLayersResponseStatus {
	FAIL = 'FAIL',
	SUCCESS = 'SUCCESS',
	ALREADY_UPDATING = 'ALREADY_UPDATING',
	SANITIZE_FAIL = 'ALREADY_WAITLISTED'
}

registerEnumType(UpdateRobotLayersResponseStatus, {
	name: 'UpdateRobotLayersResponseStatus'
});

@ObjectType()
export class UpdateRobotLayersResponse {
	@Field(() => UpdateRobotLayersResponseStatus)
	status: UpdateRobotLayersResponseStatus;
}

@ObjectType()
export class IsRobotUpdatingResponse {
	@Field(() => Boolean)
	status: boolean;
}
