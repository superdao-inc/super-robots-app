import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	NotFoundException,
	Post,
	Query,
	Req
} from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import express from 'express';
import crypto from 'crypto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
// import csvtojson from 'csvtojson';
import { EnsResolver } from 'src/services/the-graph/ens/ensResolver';
import { SocketService } from 'src/services/socket/socket.service';
import { User } from 'src/entities/user/user.model';
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// import path from 'path';
// import { UserService } from './entities/user/user.service';

@Controller()
export class AppController {
	constructor(
		private readonly configService: ConfigService,
		@InjectRedis() private readonly redis: Redis,
		@InjectDataSource() private readonly dataSource: DataSource,
		private readonly socketService: SocketService
	) {}

	// TODO:
	// 5+ invites - add to baby_robot_customize_eligible table
	// 1+ invites - add to baby_robot_feedback_form table

	@Get('test/update')
	async testUpdate() {
		// return this.babyRobotService.registerTokenUpdate({ tokenId: '1' });
	}

	// You need to run it at local machine to detect target.csv has no duplicates
	// @Get('/script/robots/addEligibleWallets')
	// async addEligibleWallets() {
	// 	const csvFilePath = path.join(__dirname, './target.csv');

	// 	const json = await csvtojson({ delimiter: ';' }).fromFile(csvFilePath);

	// 	const jsonLength = json.length;

	// 	const writer = await createCsvWriter({
	// 		path: path.join(__dirname, './target_processed.csv'),
	// 		header: [
	// 			{ id: 'wallet', title: 'wallet' },
	// 			{ id: 'email', title: 'email' }
	// 		]
	// 	});

	// 	const usersToAdd = [];

	// 	const notFoundUsers = [];

	// 	let knownWallets: string[] = [];

	// 	for (let i = 0; i < jsonLength; i++) {
	// 		const entry = json[i];

	// 		const wallet = entry['Wallet'].toLowerCase();
	// 		const email = entry['email'];

	// 		if (knownWallets.includes(wallet)) {
	// 			// eslint-disable-next-line no-console
	// 			console.log(`Users check duplicate wallet: ${i + 1} / ${jsonLength} : ${wallet}`);
	// 			continue;
	// 		}

	// 		knownWallets.push(wallet);

	// 		const user = await this.userService.findByWalletAddress(wallet);
	// 		if (!user) {
	// 			notFoundUsers.push({ walletAddress: wallet, slug: wallet, email, emailVerified: true });
	// 		}

	// 		// eslint-disable-next-line no-console
	// 		console.log(`Users check: ${i + 1} / ${jsonLength}`);
	// 	}

	// 	// eslint-disable-next-line no-console
	// 	console.log(`Save users started: ${notFoundUsers.length} items`);
	// 	await this.userService.createMany(notFoundUsers);
	// 	// eslint-disable-next-line no-console
	// 	console.log(`Save users ended`);

	// 	knownWallets = [];

	// 	for (let i = 0; i < jsonLength; i++) {
	// 		const entry = json[i];

	// 		const wallet = entry['Wallet'].toLowerCase();
	// 		const email = entry['email'];

	// 		if (knownWallets.includes(wallet)) {
	// 			// eslint-disable-next-line no-console
	// 			console.log(`Eligible check duplicate wallet: ${i + 1} / ${jsonLength} : ${wallet}`);
	// 			continue;
	// 		}

	// 		knownWallets.push(wallet);

	// 		const user = await this.userService.findByWalletAddress(wallet);
	// 		if (!user) {
	// 			// eslint-disable-next-line no-console
	// 			console.log(`USER NOT FOUND: THIS CAN NOT BE TRUE`);
	// 			notFoundUsers.push({ walletAddress: wallet, slug: wallet, email, emailVerified: true });
	// 			continue;
	// 		}

	// 		// eslint-disable-next-line no-console
	// 		console.log(`Eligible check: ${i + 1} / ${jsonLength}`);

	// 		const isUserEligible = await this.babyRobotService.isUserEligibleForMint(user.id);
	// 		if (isUserEligible.status) {
	// 			continue;
	// 		}

	// 		usersToAdd.push({ wallet, email });
	// 	}

	// 	// eslint-disable-next-line no-console
	// 	console.log(`Save eligible started: ${usersToAdd.length} items`);
	// 	await this.babyRobotService.saveRobotMintEligible(usersToAdd.map((entry) => entry.wallet));
	// 	// eslint-disable-next-line no-console
	// 	console.log(`Save eligible ended`);

	// 	await writer.writeRecords(usersToAdd);
	// }

	@Get('/robots/setBaseURI')
	async setBaseURI() {
		// const contract = new Contract(config.robots.erc721BabyRobotContractAddress, erc721BabyRobotMintAbi, provider);
		//
		// const BASE_URI = 'https://robots-review-159.k8s-ext.superdao.dev/api/erc721/robots/';
		// const txData = await contract.populateTransaction['setBaseURI'](BASE_URI);
		//
		// const gas = await feeService.getGas(); // <- get actual gas
		//
		// const tx = await this.ethersService.signer.sendTransaction({
		// 	...txData,
		// 	maxFeePerGas: gas.maxFeePerGas,
		// 	maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
		// 	gasLimit: gas.gasLimit
		// }); // <- send transaction with actual gas
		//
		// return `https://polygonscan.com/tx/${tx.hash}`;
	}

	@Get('/robots/abi/examples')
	async robotsAbiExamples() {
		/** 
			const contract = new Contract(config.robots.erc721BabyRobotContractAddress, erc721BabyRobotMintAbi, provider);

			const tokenUri = await contract.tokenURI(21); // <- get token uri by tokenId
			const ownerOf = await contract.ownerOf(21); // <- get owner of token by tokenId
			const owner = await contract.owner(); // <- get contract owner

			const txMetadataUpdateBatchData = await contract.populateTransaction['metadataUpdateBatch'](1, 60); // <- generate tx data for updating metadata for tokenIds 1-60

			const txMintData = await contract.populateTransaction['mint'](['0x0', '0x0']); // <- generate tx data for minting tokenIds for wallets in array

			const txBurnData = await contract.populateTransaction['burn'](60); // <- generate tx data for sending tokenId to null address (burn it)

			const gas = await feeService.getGas(); // <- get actual gas

			const tx = await this.ethersService.signer.sendTransaction({
				...txBurnData,
				maxFeePerGas: gas.maxFeePerGas,
				maxPriorityFeePerGas: gas.maxPriorityFeePerGas,
				gasLimit: gas.gasLimit
			}); // <- send transaction with actual gas

			return `https://polygonscan.com/tx/${tx.hash}`;
		*/
	}

	@HttpCode(200)
	@Post('test/websocket')
	async testWebsocket(@Body() body: any) {
		if (this.configService.get('appEnv') === 'prod') {
			throw new NotFoundException();
		}

		const { userId, topic, content } = body;
		this.socketService.sendPrivateMessage(userId, topic, content);
		return { status: 'ok' };
	}

	@HttpCode(200)
	@Get('test/user/subscriber')
	async testUserSubscriber() {
		if (this.configService.get('appEnv') === 'prod') {
			throw new NotFoundException();
		}

		await this.dataSource.manager.update(
			User,
			{ id: '3d742d01-e885-405b-bcf0-68fd558d9e43' },
			{
				walletAddress: crypto.randomBytes(8).toString('hex'),
				cover: 'qqqqqqqqqqqqq'
			}
		);

		return { status: 'ok' };
	}

	@Get('/redis/get')
	async getRedisKey(@Query('key') key: string) {
		if (this.configService.get('appEnv') === 'prod') {
			throw new ForbiddenException('Not allowed');
		}

		return this.redis.get(key) || 'Entry does not exists';
	}

	@Post('/redis/set')
	async setRedisKey(@Query('key') key: string, @Query('value') value: string) {
		if (this.configService.get('appEnv') === 'prod') {
			throw new ForbiddenException('Not allowed');
		}

		await this.redis.set(key, value);
	}

	@Delete('/redis/delete')
	async deleteRedisKey(@Query('key') key: string) {
		if (this.configService.get('appEnv') === 'prod') {
			throw new ForbiddenException('Not allowed');
		}

		await this.redis.del(key);
	}

	@HttpCode(200)
	@Post('/auth/exchange-cookie')
	async exchangeCookie(@Req() req: express.Request) {
		if (this.configService.get('appEnv') === 'prod') {
			throw new ForbiddenException('Not allowed');
		}

		return {
			session: req.session
		};
	}

	@Get('health')
	async health() {
		return { status: 'ok' };
	}

	@Post('fail')
	async fail() {
		if (this.configService.get('appEnv') === 'prod') {
			throw new NotFoundException();
		}

		throw new Error('Test error');
	}

	@Post('test/ens')
	async resolverEns(@Body() body: any) {
		if (this.configService.get('appEnv') === 'prod') {
			throw new NotFoundException();
		}

		const result = await Promise.all(
			body.map(async (item: any) => {
				const { walletAddress } = item;

				const resolvedAddress = await EnsResolver.resolve(walletAddress);

				return {
					...item,
					walletAddress: resolvedAddress
				};
			})
		);

		return result;
	}
}
