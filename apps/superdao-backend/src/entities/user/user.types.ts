import { registerEnumType } from '@nestjs/graphql';

export enum UserWalletType {
	SMART_WALLET = 'SMART_WALLET',
	METAMASK = 'METAMASK',
	WALLET_CONNECT = 'WALLET_CONNECT',
	MAGIC_LINK = 'MAGIC_LINK'
}
registerEnumType(UserWalletType, {
	name: 'UserWalletType',
	description: 'The type of wallet the user is using'
});
