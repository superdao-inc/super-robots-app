import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities/user/user.model';
import { RobotMintAndWaitlistStatus } from './babyRobot.types';

@Entity({ name: 'baby_robot_mint' })
@ObjectType('BabyRobotMint')
export class BabyRobotMint extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', nullable: true, default: null })
	transactionHash: string | null;

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', nullable: true, default: null })
	tokenId: string | null;

	@Field(() => String)
	@Column({ type: 'varchar' })
	imageNameSha: string;

	@Field(() => RobotMintAndWaitlistStatus)
	@Column({ type: 'enum', enum: RobotMintAndWaitlistStatus, default: RobotMintAndWaitlistStatus.IN_QUEUE })
	status: RobotMintAndWaitlistStatus;

	@Field()
	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@Field(() => Date, { nullable: true })
	@Column({ nullable: true, type: 'timestamptz' })
	burnedAt: Date | null;
}
