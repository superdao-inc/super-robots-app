import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

import { v4 as uuidv4 } from 'uuid';
import { MagicLinkNonceDto } from 'src/entities/auth/dto/magicLinkNonce.dto';
import { getReadableNonce } from 'src/entities/auth/utils';

import { Links } from 'src/entities/links/links.model';

// User
import { UserWalletType } from 'src/entities/user/user.types';
import { UserService } from 'src/entities/user/user.service';
import { User } from 'src/entities/user/user.model';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
		@InjectRepository(Links) private linksRepository: Repository<Links>,
		private readonly userService: UserService
	) {}

	async authMagicLinkNonce(magicLinkNonceDto: MagicLinkNonceDto): Promise<string> {
		const { walletAddress: userWallet, email, discord, facebook, twitter } = magicLinkNonceDto;

		const walletAddress = userWallet.toLowerCase();

		const nonce = getReadableNonce(nanoid());
		const user = await this.userService.findByWalletAddress(walletAddress);

		if (!user) {
			const id = uuidv4();
			const newUser = new User();
			newUser.id = id;
			newUser.walletAddress = walletAddress;
			newUser.nonce = nonce;
			newUser.slug = id;
			newUser.email = email;
			newUser.emailVerified = !!email;
			newUser.walletType = UserWalletType.MAGIC_LINK;

			const links = new Links();
			links.entityId = id;
			links.discord = discord;
			links.facebook = facebook;
			links.twitter = twitter;

			newUser.links = links;

			await this.usersRepository.save(newUser);

			await this.userService.invalidateUserByWallet(newUser.walletAddress);
			await this.userService.invalidateUserByIdCache(newUser.id);

			return nonce;
		}

		user.walletType = UserWalletType.MAGIC_LINK;
		user.nonce = nonce;
		await user.save();

		let links = await this.linksRepository.findOneBy({ entityId: user.id });
		if (!links) links = await this.linksRepository.save({ entityId: user.id });

		links.discord ??= discord;
		links.facebook ??= facebook;
		links.twitter ??= twitter;
		await links.save();

		await this.userService.invalidateUserByWallet(user.walletAddress);
		await this.userService.invalidateUserByIdCache(user.id);

		return nonce;
	}
}
