import { Field, InputType } from '@nestjs/graphql';
import { IsAddress } from 'src/decorators/address.decorator';
import { emailValidationMiddleware } from 'src/gql/emailValidation.middleware';

@InputType()
export class MagicLinkNonceDto {
	@Field()
	@IsAddress()
	walletAddress: string;

	@Field({ middleware: [emailValidationMiddleware] })
	email: string;

	@Field(() => String, { nullable: true, defaultValue: '' })
	discord: string | null;

	@Field(() => String, { nullable: true, defaultValue: '' })
	twitter: string | null;

	@Field(() => String, { nullable: true, defaultValue: '' })
	facebook: string | null;
}
