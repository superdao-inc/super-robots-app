import { Field, InputType } from '@nestjs/graphql';
import { IsAddress } from 'src/decorators/address.decorator';

@InputType()
export class NonceDto {
	@Field()
	@IsAddress()
	walletAddress: string;
}
