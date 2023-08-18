import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
	BaseEntity,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { User } from '../user/user.model';

@Entity({ name: 'user_code_valid_addresses' })
@ObjectType()
@InputType('UserCodeValidAddressesInput')
export class UserCodeValidAddresses extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => User, (user) => user.walletAddress)
	@JoinColumn({ name: 'wallet', referencedColumnName: 'walletAddress' })
	user: User;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;
}
