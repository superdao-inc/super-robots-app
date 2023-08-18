import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CodeInvitationsInfoDto {
	@Field(() => String)
	code: string;

	@Field(() => Boolean)
	isCodeFlowAvailable: boolean;

	@Field(() => Int)
	remainingCodeActivations: number;

	@Field(() => Int)
	maxCodeActivations: number;
}

@ObjectType()
export class CodeInvitationsInfoWithOwnerDataDto extends CodeInvitationsInfoDto {
	@Field(() => String)
	codeOwner: string;
}

@InputType()
export class GetCodeInvitationsInfoByCodeInput {
	@Field(() => String)
	code: string;
}

@ObjectType()
export class AddActivationsToUserCodeResponse {
	@Field(() => Boolean)
	status: boolean;

	@Field(() => Boolean)
	isCodeRefilled: boolean;
}
