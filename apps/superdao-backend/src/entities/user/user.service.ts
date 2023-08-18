import { DeepPartial, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import toLower from 'lodash/toLower';

import { PaginationWithSearch } from 'src/gql/pagination';

import { normalizeSearchQuery } from 'src/utils/normalizeSearchQuery';
import { User } from './user.model';
import { Links } from '../links/links.model';
import { CacheService, getUserByIdKey, getUserByWalletKey } from 'src/services/cache';

const CUSTOM_TTL = 30 * 60; // 30 minutes in seconds

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Links) private linksRepository: Repository<Links>,
		private readonly cacheService: CacheService
	) {}

	findByWalletAddress(walletAddress: string) {
		return this.userRepository
			.createQueryBuilder('user')
			.where('LOWER(user.walletAddress) = LOWER(:walletAddress)', { walletAddress })
			.leftJoinAndSelect('user.links', 'links')
			.getOne();
	}

	findByWalletAddressCitext(walletAddress: string) {
		return this.userRepository
			.createQueryBuilder('user')
			.where('user.walletAddress = :walletAddress', { walletAddress })
			.leftJoinAndSelect('user.links', 'links')
			.getOne();
	}

	async findByWalletAddressCitextAndCache(walletAddress: string): Promise<User | null> {
		const cachedUser = await this.cacheService.get(getUserByWalletKey(walletAddress));

		if (cachedUser !== null) {
			const parsedUser = JSON.parse(cachedUser);

			return User.create({ ...parsedUser, createdAt: new Date(parsedUser.createdAt) });
		}

		const user = await this.findByWalletAddressCitext(walletAddress);

		if (user) await this.cacheService.set(getUserByWalletKey(walletAddress), JSON.stringify(user), CUSTOM_TTL);

		return user;
	}

	async invalidateUserByWallet(walletAddress: string) {
		await this.cacheService.del(getUserByWalletKey(walletAddress));
	}

	findByEns(ens: string) {
		return this.userRepository
			.createQueryBuilder('user')
			.where('LOWER(user.ens) = LOWER(:ens)', { ens })
			.leftJoinAndSelect('user.links', 'links')
			.getOne();
	}

	async findManyByWalletAddresses(walletAddresses: string[]): Promise<User[]> {
		if (!walletAddresses.length) return [];

		const users = await this.userRepository
			.createQueryBuilder('user')
			.where('LOWER(user.walletAddress) IN (:...walletAddresses)', {
				walletAddresses: walletAddresses.map(toLower)
			})
			.select('user.id', 'id')
			.addSelect('user.displayName', 'displayName')
			.addSelect('user.ens', 'ens')
			.addSelect('user.avatar', 'avatar')
			.addSelect('user.email', 'email')
			.addSelect('LOWER(user.walletAddress)', 'walletAddress')
			.addSelect('user.email', 'email')
			// FIXME: remove after QA
			.addSelect('user.isSupervisor', 'isSupervisor')
			.getRawMany();

		return users;
	}

	async findBySlug(slug: string) {
		return this.userRepository.findOneBy({ slug });
	}

	async getUserNfts(idOrSlug: string) {
		return this.userRepository
			.createQueryBuilder('user')
			.where('user.slug = :idOrSlug', { idOrSlug })
			.orWhere('CAST(user.id AS VARCHAR) = :idOrSlug', { idOrSlug })
			.leftJoinAndSelect('user.nfts', 'nfts')
			.innerJoinAndSelect('nfts.collection', 'collection')
			.innerJoinAndSelect('nfts.dao', 'dao')
			.orderBy('nfts.mintedAt', 'DESC')
			.getOne();
	}

	async createMany(users: DeepPartial<User>[]) {
		const parsedUsers = users.map((u) => ({ ...u, walletAddress: u.walletAddress?.toLowerCase() }));

		const savedUsers = await Promise.all(
			parsedUsers.map(async (parsedUser) => {
				try {
					const insertedUser = await this.userRepository.save(parsedUser);

					const links = await this.linksRepository.save({ entityId: insertedUser.id });

					await this.userRepository.update({ id: insertedUser.id }, { links });
				} catch (error) {}
			})
		);

		return savedUsers;
	}

	async updateCookieDecision(decision: boolean, user: User) {
		user.hasCookieDecision = true;
		user.agreedWithCookie = decision;

		await user.save();
	}

	async getAllUsers(request: PaginationWithSearch) {
		const { offset = 0, limit = 20, search = '' } = request;

		const queryBuilder = this.userRepository.createQueryBuilder('user');

		queryBuilder.offset(offset);
		queryBuilder.limit(limit);

		const normalizedSearch = normalizeSearchQuery(search);

		if (normalizedSearch) {
			queryBuilder.where('user.displayName ilike :nameSearch', { nameSearch: `%${normalizedSearch}%` });
			queryBuilder.orWhere('user.email ilike :emailSearch', { emailSearch: `%${normalizedSearch}%` });
		}

		queryBuilder.leftJoinAndSelect('user.links', 'links');

		queryBuilder
			.groupBy('user.id')
			.addGroupBy('user.displayName')
			.addGroupBy('user.slug')
			.addGroupBy('user.avatar')
			.addGroupBy('user.links')
			.addGroupBy('links.id');

		const count = await queryBuilder.getCount();
		const daos = await queryBuilder.getMany();

		return {
			count,
			items: daos
		};
	}

	async getCountOfExistingWallets(wallets: string[]) {
		if (!wallets.length) return 0;

		return this.userRepository
			.createQueryBuilder('user')
			.where('LOWER(user.walletAddress) IN (:...wallets)', { wallets: wallets.map(toLower) })
			.getCount();
	}

	async getUserById(id: string) {
		return this.userRepository.findOneBy({ id });
	}

	async getUserByIdWithCache(id: string): Promise<User | null> {
		const cachedUser = await this.cacheService.get(getUserByIdKey(id));

		if (cachedUser !== null) {
			const parsedUser = JSON.parse(cachedUser);

			return User.create({ ...parsedUser, createdAt: new Date(parsedUser.createdAt) });
		}

		const user = await this.getUserById(id);

		if (user) await this.cacheService.set(getUserByIdKey(id), JSON.stringify(user), CUSTOM_TTL);

		return user;
	}

	async invalidateUserByIdCache(id: string) {
		await this.cacheService.del(getUserByIdKey(id));
	}

	async updateEmail(userId: string, email: string) {
		await this.userRepository.update({ id: userId }, { email });
	}
}
