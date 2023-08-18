import { ObjectType, Field, ArgsType, InputType, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserEmailResponse {
	@Field(() => String, { nullable: true })
	error: string | null;

	/**
	 * Timestamp before which a new message cannot be sent
	 */
	@Field(() => Number, { nullable: true })
	nextAttemptToSendEmail: number | null;
}

export enum OTPValidationStatus {
	EXPIRED = 'EXPIRED',
	FAIL = 'FAIL',
	SUCCESS = 'SUCCESS'
}

registerEnumType(OTPValidationStatus, {
	name: 'OTPValidationStatus'
});

@ObjectType()
export class CheckUserOTPEmailResponse {
	/**
	 * Timestamp before which a new message cannot be sent
	 */
	@Field(() => Number)
	otpTimestamp: number;

	@Field(() => Number)
	resendTimestamp: number;
}

@ObjectType()
export class ValidateUserOTPEmailResponse {
	@Field(() => OTPValidationStatus)
	status: OTPValidationStatus;
}

@ArgsType()
@ObjectType('ValidateUserOTPEmailInput')
@InputType('ValidateUserOTPEmailInput')
export class ValidateUserOTPEmailInput {
	@Field(() => String)
	otp: string;
}
