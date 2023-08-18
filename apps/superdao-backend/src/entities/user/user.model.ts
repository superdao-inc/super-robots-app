import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
	BaseEntity,
	Column,
	Entity,
	getRepository,
	Index,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Links } from '../links/links.model';
import { UserWalletType } from 'src/entities/user/user.types';
import { UserCodes } from '../userCodes/userCodes.model';
import { ActiveInvitations } from '../activeInvitations/activeInvitations.model';
import { CustomItemByUser } from '../robotCustomItem/customItemByUser.model';

@Entity({ name: 'users' })
@ObjectType()
@InputType('UserInput')
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	walletAddress: string;

	@Field(() => UserWalletType)
	@Column({ type: 'enum', enum: UserWalletType, default: UserWalletType.METAMASK })
	walletType: UserWalletType;

	@Field()
	@Column({ type: 'timestamptz', default: () => 'NOW()' })
	createdAt: Date;

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', nullable: true })
	ens: string | null;

	@Field(() => String)
	@Column({ type: 'varchar', default: '' })
	nonce: string;

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', nullable: true })
	displayName: string | null;

	@Index({ unique: true })
	@Field(() => String)
	@Column({ type: 'varchar', unique: true })
	slug: string;

	@Field(() => String, { nullable: true })
	@Column({ type: 'text', nullable: true })
	bio: string | null;

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', nullable: true })
	email: string | null;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: false })
	emailVerified: boolean;

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', nullable: true, default: null })
	avatar: string | null;

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', nullable: true, default: null })
	cover: string | null;

	@Field(() => Links)
	@OneToOne(() => Links, { eager: true, cascade: true })
	@JoinColumn()
	links: Links;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: false })
	hasBetaAccess: boolean;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: false })
	isClaimed: boolean;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: false })
	isSupervisor: boolean;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: false })
	hasCookieDecision: boolean;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: false })
	agreedWithCookie: boolean;

	@OneToMany(() => UserCodes, (userCodes) => userCodes.owner)
	userCodes: UserCodes[];

	@OneToMany(() => ActiveInvitations, (activeInvitations) => activeInvitations.owner)
	ownerActiveInvitations: ActiveInvitations[];

	@OneToOne(() => ActiveInvitations, { nullable: true })
	invitedByActiveInvitations: ActiveInvitations;

	@OneToMany(() => CustomItemByUser, (customItemByUser) => customItemByUser.user)
	customItemsByUser: CustomItemByUser[];
}

/**
 * @deprecated Use nest repository injection https://docs.nestjs.com/techniques/database#repository-pattern
 */
export const userRepository = () => getRepository(User);
