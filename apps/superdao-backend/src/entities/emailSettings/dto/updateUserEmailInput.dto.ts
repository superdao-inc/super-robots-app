import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { sanitizeStringTransform } from '@sd/superdao-shared';

@InputType()
export class UpdateUserEmailInput {
	@Field(() => String)
	@Transform(sanitizeStringTransform)
	@IsEmail()
	email: string;

	@Field(() => String)
	userPageAnchor: string;
}

@InputType()
export class SendEmailVerificationMessageInput {
	@Field(() => String)
	userPageAnchor: string;
}
