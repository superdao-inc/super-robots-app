import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities/user/user.model';

@Entity({ name: 'baby_robot_customize_eligible' })
@ObjectType('BabyRobotCustomizeEligible')
export class BabyRobotCustomizeEligible extends BaseEntity {
	@PrimaryColumn({ type: 'varchar' })
	wallet: string;

	@OneToOne(() => User, (user) => user.walletAddress)
	@JoinColumn({ name: 'wallet', referencedColumnName: 'walletAddress' })
	user: User;

	@Field(() => Int)
	@Column({ type: 'int', default: 0 })
	maxActivationsCount: number;

	@Field(() => Int)
	@Column({ type: 'int', default: 0 })
	usedActivationsCount: number;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;
}
