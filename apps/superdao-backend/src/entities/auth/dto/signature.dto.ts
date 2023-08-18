import { Field, InputType } from '@nestjs/graphql';

import { IsAddress } from 'src/decorators/address.decorator';
import { UserWalletType } from 'src/entities/user/user.types';

@InputType()
export class SignatureDto {
	@Field()
	@IsAddress()
	walletAddress: string;

	@Field()
	nonce: string;

	@Field()
	signature: string;

	@Field(() => UserWalletType)
	walletType: UserWalletType;
}

@InputType()
export class SmartWalletSignatureDto {
	@Field()
	@IsAddress()
	walletAddress: string;

	@Field()
	nonce: string;

	@Field()
	signature: string;
}
