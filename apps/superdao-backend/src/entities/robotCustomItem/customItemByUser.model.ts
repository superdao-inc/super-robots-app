import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.model';
import { CustomItem } from './customItem.model';

@Entity({ name: 'custom_item_by_user' })
@ObjectType()
@InputType('CustomItemByUserInput')
export class CustomItemByUser extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'wallet', referencedColumnName: 'walletAddress' })
	user: User;

	@ManyToOne(() => CustomItem)
	@JoinColumn({ name: 'item', referencedColumnName: 'layerName' })
	customItem: CustomItem;
}
