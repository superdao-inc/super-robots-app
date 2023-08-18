import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'baby_robots' })
@ObjectType('BabyRobots')
export class BabyRobot extends BaseEntity {
	@PrimaryColumn({ type: 'varchar' })
	@Field(() => String)
	slug: string;

	@Field(() => String)
	@Column({ type: 'varchar' })
	ipfsImage: string;

	@Field(() => String)
	@Column({ type: 'varchar' })
	kernelAddress: string;

	@Field(() => String)
	@Column({ type: 'varchar' })
	collectionAddress: string;

	@Field(() => String)
	@Column({ type: 'varchar' })
	tierId: string;
}
