import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'custom_item' })
@ObjectType()
@InputType('CustomItemInput')
export class CustomItem extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@Field(() => String)
	@Column({ type: 'varchar' })
	layerType: string;

	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	layerName: string;
}
