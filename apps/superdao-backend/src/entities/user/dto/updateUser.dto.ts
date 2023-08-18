import { IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
	@Field(() => String)
	@IsUUID()
	id: string;

	@Field(() => Boolean, { nullable: true })
	hasBetaAccess: boolean;

	@Field(() => String, { nullable: true })
	displayName: string | null;

	@Field(() => String, { nullable: true })
	slug: string | null;

	@Field(() => String, { nullable: true })
	bio: string | null;

	@Field(() => String, { nullable: true })
	avatar: string | null;

	@Field(() => String, { nullable: true })
	cover: string | null;

	@Field(() => String, { nullable: true })
	twitter: string | null;

	@Field(() => String, { nullable: true })
	site: string | null;

	@Field(() => String, { nullable: true })
	instagram: string | null;

	@Field(() => String, { nullable: true })
	telegram: string | null;

	@Field(() => String, { nullable: true })
	discord: string | null;
}
