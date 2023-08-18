import { Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { config } from 'src/config';
import { getSdk } from './gql/robot.generated';

@Injectable()
export class BabyRobotGraphService {
	private readonly client: GraphQLClient;
	private readonly sdk: ReturnType<typeof getSdk>;

	constructor() {
		this.client = new GraphQLClient(config.robotGraph.url);
		this.sdk = getSdk(this.client);
	}

	async getTokensInCollectionForOwner(walletAddress: string) {
		return this.sdk.getTokensInCollectionForOwner({
			owner: walletAddress.toLowerCase(),
			collection: config.robots.erc721BabyRobotContractAddress.toLowerCase()
		});
	}

	async getOwnerByTokenId(tokenId: string) {
		return this.sdk.getOwnerByTokenId({
			tokenID: Number(tokenId),
			collection: config.robots.erc721BabyRobotContractAddress.toLowerCase()
		});
	}
}
