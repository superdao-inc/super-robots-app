import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from 'src/entities/user/user.model';
import { EnsResolver } from 'src/services/the-graph/ens/ensResolver';
import { UserService } from './user.service';
import { log } from 'src/utils/logger';

type SubscriptionType = 'insert' | 'update';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	private readonly logger = log.createScope(UserSubscriber.name);

	constructor(private readonly userService: UserService, dataSource: DataSource) {
		dataSource.subscribers.push(this);
	}

	listenTo() {
		return User;
	}

	async afterInsert(event: InsertEvent<User>) {
		const walletAddress = event.entity.walletAddress;
		const ens = await this.getEns(walletAddress, 'insert');

		if (ens) {
			await event.manager.update(User, { walletAddress }, { ens });
			this.logger.log(`ENS updated for user ${walletAddress} (insert)`);

			await this.userService.invalidateUserByWallet(event.entity.walletAddress);
			await this.userService.invalidateUserByIdCache(event.entity.id);
		}
	}

	async afterUpdate(event: UpdateEvent<User>) {
		const walletAddress = event.entity?.walletAddress;
		const id = event.entity?.id;

		if (walletAddress) {
			const ens = await this.getEns(walletAddress, 'update');
			await event.manager.update(User, { walletAddress }, { ens });

			this.logger.log(`ENS updated for user ${walletAddress} (update)`);

			await this.userService.invalidateUserByWallet(walletAddress);
			if (id) await this.userService.invalidateUserByIdCache(id);
		}
	}

	private async getEns(walletAddress: string, subscriptionType: SubscriptionType) {
		try {
			return await EnsResolver.lookup(walletAddress);
		} catch (e) {
			this.logger.error(new Error('Error in subscription:'), { subscriptionType, walletAddress, e });
			return null;
		}
	}
}
