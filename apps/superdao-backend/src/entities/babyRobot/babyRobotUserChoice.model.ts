import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { RobotLayerMap } from '@sd/superdao-shared';

@Entity({ name: 'baby_robot_user_choice' })
@ObjectType('BabyRobotUserChoice')
export class BabyRobotUserChoice extends BaseEntity {
	@PrimaryColumn({ type: 'varchar' })
	tokenId: string;

	@Column({ type: 'json' })
	layers: RobotLayerMap;

	@CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updatedAt: Date;
}
