import { BaseEntity, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities/user/user.model';

// TODO: deprecated, delete after backpack is released
@Entity({ name: 'baby_robot_feedback_form' })
@ObjectType('BabyRobotFeedbackForm')
export class BabyRobotFeedbackForm extends BaseEntity {
	@PrimaryColumn({ type: 'varchar' })
	wallet: string;

	@OneToOne(() => User, (user) => user.walletAddress)
	@JoinColumn({ name: 'wallet', referencedColumnName: 'walletAddress' })
	user: User;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;
}
