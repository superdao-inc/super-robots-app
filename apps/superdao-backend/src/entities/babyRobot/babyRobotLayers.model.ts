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
import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities/user/user.model';
import { RobotLayerMap } from '@sd/superdao-shared';

@Entity({ name: 'baby_robot_layers' })
@ObjectType('BabyRobotLayers')
export class BabyRobotLayers extends BaseEntity {
	@PrimaryColumn({ type: 'varchar' })
	wallet: string;

	@OneToOne(() => User, (user) => user.walletAddress)
	@JoinColumn({ name: 'wallet', referencedColumnName: 'walletAddress' })
	user: User;

	// TODO: if product agree - save only random layers (keys)
	@Column({ type: 'json' })
	layers: RobotLayerMap;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;
}
