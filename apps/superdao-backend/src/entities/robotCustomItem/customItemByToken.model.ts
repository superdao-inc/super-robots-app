import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { CustomItem } from './customItem.model';

@Entity({ name: 'custom_item_by_token' })
@ObjectType()
@InputType('CustomItemByTokenInput')
export class CustomItemByToken extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@Index()
	@Field()
	@Column({ type: 'varchar' })
	tokenId: string;

	@ManyToOne(() => CustomItem)
	@JoinColumn({ name: 'item', referencedColumnName: 'layerName' })
	customItem: CustomItem;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: false })
	isEnabled: boolean;
}
