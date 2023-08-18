import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@InputType('UserClicksStatisticInput')
export class UserClicksStatistic extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@Field(() => String)
	@Column({ type: 'varchar' })
	wallet: string;
}

@Entity({ name: 'user_clicks_statistic_customize' })
@ObjectType()
@InputType('UserClicksStatisticCustomizeInput')
export class UserClicksStatisticCustomize extends UserClicksStatistic {}

@Entity({ name: 'user_clicks_statistic_notify_me' })
@ObjectType()
@InputType('UserClicksStatisticNotifyMeInput')
export class UserClicksStatisticNotifyMe extends UserClicksStatistic {}

@Entity({ name: 'user_clicks_statistic_request_invites' })
@ObjectType()
@InputType('UserClicksStatisticRequestInvitesInput')
export class UserClicksStatisticRequestInvites extends UserClicksStatistic {}
