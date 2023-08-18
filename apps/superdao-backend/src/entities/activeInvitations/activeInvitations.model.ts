import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.model';
import { UserCodes } from '../userCodes/userCodes.model';

@Entity({ name: 'active_invitations' })
@ObjectType()
@InputType('ActiveInvitationsInput')
export class ActiveInvitations extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field()
	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.id)
	owner: User;

	@Field(() => User)
	@OneToOne(() => User)
	@JoinColumn()
	invitedUser: User;

	@Field(() => UserCodes)
	@ManyToOne(() => UserCodes, (userCodes) => userCodes.activeInvitations)
	code: UserCodes;
}
