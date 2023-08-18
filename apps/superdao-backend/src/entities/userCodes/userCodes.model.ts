import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActiveInvitations } from '../activeInvitations/activeInvitations.model';
import { User } from '../user/user.model';

@Entity({ name: 'user_codes' })
@ObjectType()
@InputType('UserCodesInput')
export class UserCodes extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@Field(() => String)
	@Column({ type: 'varchar' })
	code: string;

	@Field(() => Int)
	@Column({ type: 'int' })
	activationsCount: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.userCodes)
	owner: User;

	@OneToMany(() => ActiveInvitations, (activeInvitations) => activeInvitations.code)
	activeInvitations: ActiveInvitations[];
}
