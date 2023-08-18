import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1659505792143 implements MigrationInterface {
	name = 'InitialMigration1659505792143';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."attachments_type_enum" AS ENUM('image', 'link')`);
		await queryRunner.query(
			`CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postId" uuid NOT NULL, "type" "public"."attachments_type_enum" NOT NULL, "image" json, "link" json, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "daoId" uuid NOT NULL, "text" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "whitelists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "daoId" uuid NOT NULL, "walletAddress" character varying NOT NULL, "email" character varying, "tiers" character varying array NOT NULL DEFAULT '{}', "target" character varying NOT NULL DEFAULT 'sale', "addedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "UQ_988f3c26b3aaed34ddfa61e5fdf" UNIQUE ("daoId", "walletAddress", "target"), CONSTRAINT "PK_589f49a4a4df5ce0852b18f5ab2" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE TYPE "public"."wallets_type_enum" AS ENUM('EXTERNAL', 'SAFE')`);
		await queryRunner.query(`CREATE TYPE "public"."wallets_ecosystem_enum" AS ENUM('evm')`);
		await queryRunner.query(
			`CREATE TYPE "public"."wallets_chainid_enum" AS ENUM('1', '3', '42', '137', '80001', '56', '97')`
		);
		await queryRunner.query(
			`CREATE TABLE "wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "treasuryId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "type" "public"."wallets_type_enum" NOT NULL DEFAULT 'EXTERNAL', "ecosystem" "public"."wallets_ecosystem_enum" NOT NULL DEFAULT 'evm', "chainId" "public"."wallets_chainid_enum", CONSTRAINT "UQ_f907d5fd09a9d374f1da4e13bd3" UNIQUE ("address"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "treasuries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "daoId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_6d41702e8cbb474881e821b378c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "power" integer NOT NULL DEFAULT '1', "choiceId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "proposalId" uuid, "userId" uuid, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "choices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "proposalId" uuid, CONSTRAINT "PK_148c5eb882356807bc188a826c3" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "scores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "choiceId" uuid NOT NULL, "value" integer NOT NULL DEFAULT '0', "proposalId" uuid, CONSTRAINT "PK_c36917e6f26293b91d04b8fd521" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."proposals_votingtype_enum" AS ENUM('yesNoAbstain', 'singleChoice', 'multipleChoice')`
		);
		await queryRunner.query(`CREATE TYPE "public"."proposals_votingpowertype_enum" AS ENUM('single', 'calculating')`);
		await queryRunner.query(
			`CREATE TABLE "proposals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "createdBySuperdao" boolean NOT NULL DEFAULT false, "attachment" uuid, "edition" integer NOT NULL DEFAULT '0', "votingType" "public"."proposals_votingtype_enum" NOT NULL, "votingPowerType" "public"."proposals_votingpowertype_enum" NOT NULL DEFAULT 'single', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "daoId" uuid, CONSTRAINT "PK_db524c8db8e126a38a2f16d8cac" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "daos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contractAddress" character varying, "openseaUrl" character varying, "ensDomain" character varying, "isVotingEnabled" boolean NOT NULL DEFAULT false, "isClaimEnabled" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "description" text NOT NULL, "slug" character varying NOT NULL, "avatar" uuid, "cover" uuid, "twitter" character varying, "site" character varying, "instagram" character varying, "telegram" character varying, "discord" character varying, "whitelistUrl" character varying, "membersCount" integer NOT NULL DEFAULT '0', "documents" json NOT NULL DEFAULT '[]', "customEmailKey" character varying, "supportChatUrl" character varying, "hasDemoProposals" boolean NOT NULL DEFAULT false, "hasShortSlugAccess" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "treasuryValue" double precision, CONSTRAINT "UQ_774161d51206d96805bb6fb1226" UNIQUE ("contractAddress"), CONSTRAINT "UQ_a67487204ae6ce8dfd145d70285" UNIQUE ("slug"), CONSTRAINT "PK_239c5beb588a61db3022200d795" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."dao_membership_role_enum" AS ENUM('CREATOR', 'MEMBER', 'WHITELIST')`
		);
		await queryRunner.query(
			`CREATE TABLE "dao_membership" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "daoId" uuid NOT NULL, "userId" uuid NOT NULL, "role" "public"."dao_membership_role_enum" NOT NULL DEFAULT 'MEMBER', "tier" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "UQ_db985a9050cb0b54fd48869fddc" UNIQUE ("daoId", "userId"), CONSTRAINT "PK_3bcc432e9bbac0d75d270a964e3" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('NewNft')`);
		await queryRunner.query(
			`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "seen" boolean NOT NULL DEFAULT false, "type" "public"."notifications_type_enum" NOT NULL, "newNftData" json, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "onboarding" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "visitedPages" character varying array NOT NULL DEFAULT '{}', CONSTRAINT "PK_b8b6cfe63674aaee17874f033cf" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "walletAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "ens" character varying, "nonce" character varying NOT NULL DEFAULT '', "displayName" character varying, "slug" character varying, "bio" text, "email" character varying, "avatar" uuid, "cover" uuid, "twitter" character varying, "site" character varying, "instagram" character varying, "telegram" character varying, "discord" character varying, "hasBetaAccess" boolean NOT NULL DEFAULT false, "isClaimed" boolean NOT NULL DEFAULT false, "isSupervisor" boolean NOT NULL DEFAULT false, "onboardingId" uuid, CONSTRAINT "UQ_fc71cd6fb73f95244b23e2ef113" UNIQUE ("walletAddress"), CONSTRAINT "UQ_bc0c27d77ee64f0a097a5c269b3" UNIQUE ("slug"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_6a076efb5625cbe141fd257b0f" UNIQUE ("onboardingId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "client_features" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_069d4d11aa6c5ef215b91c12602" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "daoId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE TYPE "public"."transaction_metas_ecosystem_enum" AS ENUM('evm')`);
		await queryRunner.query(
			`CREATE TABLE "transaction_metas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "ecosystem" "public"."transaction_metas_ecosystem_enum" DEFAULT 'evm', "chainId" integer, "description" character varying NOT NULL, CONSTRAINT "UQ_5d500c5ddc343f38ba5ff57b087" UNIQUE ("hash"), CONSTRAINT "PK_e393ad1db36e1005dcaa820ff98" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "attachments" ADD CONSTRAINT "FK_f54127860e8075e61dd7d95c80b" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "posts" ADD CONSTRAINT "FK_b29fe2a625774b639422f98681f" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "whitelists" ADD CONSTRAINT "FK_d8a2dab99c6f17b19dcacd13c0f" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "wallets" ADD CONSTRAINT "FK_28f0e0b8492d5a1bf1c1ce8c316" FOREIGN KEY ("treasuryId") REFERENCES "treasuries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "treasuries" ADD CONSTRAINT "FK_2f0b27e78dd1ce5caae66b77465" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "votes" ADD CONSTRAINT "FK_6316faf3c4b10b7536dbcc1b835" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "votes" ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "choices" ADD CONSTRAINT "FK_08ffb9bcc9b86749072eb3a7d87" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "scores" ADD CONSTRAINT "FK_d42d3ba5714fb7b2e57da3bf83f" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "proposals" ADD CONSTRAINT "FK_08e15fa3cc356577c8e54bbc236" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ADD CONSTRAINT "FK_c7efde93fe3cc05bbbd0ffdb178" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ADD CONSTRAINT "FK_aee33f2b6ba48615c8198bc3353" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_6a076efb5625cbe141fd257b0f6" FOREIGN KEY ("onboardingId") REFERENCES "onboarding"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "likes" ADD CONSTRAINT "FK_665635ea220756c360c5d88fb63" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
		await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_665635ea220756c360c5d88fb63"`);
		await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6a076efb5625cbe141fd257b0f6"`);
		await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
		await queryRunner.query(`ALTER TABLE "dao_membership" DROP CONSTRAINT "FK_aee33f2b6ba48615c8198bc3353"`);
		await queryRunner.query(`ALTER TABLE "dao_membership" DROP CONSTRAINT "FK_c7efde93fe3cc05bbbd0ffdb178"`);
		await queryRunner.query(`ALTER TABLE "proposals" DROP CONSTRAINT "FK_08e15fa3cc356577c8e54bbc236"`);
		await queryRunner.query(`ALTER TABLE "scores" DROP CONSTRAINT "FK_d42d3ba5714fb7b2e57da3bf83f"`);
		await queryRunner.query(`ALTER TABLE "choices" DROP CONSTRAINT "FK_08ffb9bcc9b86749072eb3a7d87"`);
		await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_5169384e31d0989699a318f3ca4"`);
		await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_6316faf3c4b10b7536dbcc1b835"`);
		await queryRunner.query(`ALTER TABLE "treasuries" DROP CONSTRAINT "FK_2f0b27e78dd1ce5caae66b77465"`);
		await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_28f0e0b8492d5a1bf1c1ce8c316"`);
		await queryRunner.query(`ALTER TABLE "whitelists" DROP CONSTRAINT "FK_d8a2dab99c6f17b19dcacd13c0f"`);
		await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_b29fe2a625774b639422f98681f"`);
		await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_f54127860e8075e61dd7d95c80b"`);
		await queryRunner.query(`DROP TABLE "transaction_metas"`);
		await queryRunner.query(`DROP TYPE "public"."transaction_metas_ecosystem_enum"`);
		await queryRunner.query(`DROP TABLE "likes"`);
		await queryRunner.query(`DROP TABLE "client_features"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "onboarding"`);
		await queryRunner.query(`DROP TABLE "notifications"`);
		await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
		await queryRunner.query(`DROP TABLE "dao_membership"`);
		await queryRunner.query(`DROP TYPE "public"."dao_membership_role_enum"`);
		await queryRunner.query(`DROP TABLE "daos"`);
		await queryRunner.query(`DROP TABLE "proposals"`);
		await queryRunner.query(`DROP TYPE "public"."proposals_votingpowertype_enum"`);
		await queryRunner.query(`DROP TYPE "public"."proposals_votingtype_enum"`);
		await queryRunner.query(`DROP TABLE "scores"`);
		await queryRunner.query(`DROP TABLE "choices"`);
		await queryRunner.query(`DROP TABLE "votes"`);
		await queryRunner.query(`DROP TABLE "treasuries"`);
		await queryRunner.query(`DROP TABLE "wallets"`);
		await queryRunner.query(`DROP TYPE "public"."wallets_chainid_enum"`);
		await queryRunner.query(`DROP TYPE "public"."wallets_ecosystem_enum"`);
		await queryRunner.query(`DROP TYPE "public"."wallets_type_enum"`);
		await queryRunner.query(`DROP TABLE "whitelists"`);
		await queryRunner.query(`DROP TABLE "posts"`);
		await queryRunner.query(`DROP TABLE "attachments"`);
		await queryRunner.query(`DROP TYPE "public"."attachments_type_enum"`);
	}
}
