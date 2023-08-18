import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoggingTables1666780941029 implements MigrationInterface {
	name = 'CreateLoggingTables1666780941029';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "buy_nft_transaction_logs" ("transactionHash" character varying NOT NULL, "executorId" character varying NOT NULL, "daoAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "succededAt" TIMESTAMP WITH TIME ZONE, "failedAt" TIMESTAMP WITH TIME ZONE, "tier" character varying NOT NULL, "isWhitelist" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_bc9d4f57b28338fa22828a31c00" PRIMARY KEY ("transactionHash"))`
		);
		await queryRunner.query(
			`CREATE TABLE "refferal_claim_transaction_logs" ("transactionHash" character varying NOT NULL, "executorId" character varying NOT NULL, "daoAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "succededAt" TIMESTAMP WITH TIME ZONE, "failedAt" TIMESTAMP WITH TIME ZONE, "tier" character varying NOT NULL, "referralCampaignId" character varying NOT NULL, "linkLimit" integer NOT NULL, "claimSecret" character varying, "referralLinkId" character varying, CONSTRAINT "PK_eea1014aaa4a009258defbc5a12" PRIMARY KEY ("transactionHash"))`
		);
		await queryRunner.query(
			`CREATE TABLE "whitelist_transaction_logs" ("transactionHash" character varying NOT NULL, "executorId" character varying NOT NULL, "daoAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "succededAt" TIMESTAMP WITH TIME ZONE, "failedAt" TIMESTAMP WITH TIME ZONE, "participants" json NOT NULL DEFAULT '[]', CONSTRAINT "PK_928d04b839e467e0d70e54ac537" PRIMARY KEY ("transactionHash"))`
		);
		await queryRunner.query(
			`CREATE TABLE "airdrop_transaction_logs" ("transactionHash" character varying NOT NULL, "executorId" character varying NOT NULL, "daoAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "succededAt" TIMESTAMP WITH TIME ZONE, "failedAt" TIMESTAMP WITH TIME ZONE, "participants" json NOT NULL DEFAULT '[]', CONSTRAINT "PK_4c11d79604ade2d7d095754a9c3" PRIMARY KEY ("transactionHash"))`
		);
		await queryRunner.query(
			`CREATE TABLE "claim_nft_transaction_logs" ("transactionHash" character varying NOT NULL, "executorId" character varying NOT NULL, "daoAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "succededAt" TIMESTAMP WITH TIME ZONE, "failedAt" TIMESTAMP WITH TIME ZONE, "tier" character varying NOT NULL, "createdDaoSLug" character varying NOT NULL, "isLinkClaim" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_20a197a9bd9ae2817e040d2d71b" PRIMARY KEY ("transactionHash"))`
		);
		await queryRunner.query(
			`CREATE TABLE "ban_transaction_logs" ("transactionHash" character varying NOT NULL, "executorId" character varying NOT NULL, "daoAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "succededAt" TIMESTAMP WITH TIME ZONE, "failedAt" TIMESTAMP WITH TIME ZONE, "bannedAddress" character varying NOT NULL, "isBurnCase" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_230313df8d9350092fa6f0c02f6" PRIMARY KEY ("transactionHash"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "ban_transaction_logs"`);
		await queryRunner.query(`DROP TABLE "claim_nft_transaction_logs"`);
		await queryRunner.query(`DROP TABLE "airdrop_transaction_logs"`);
		await queryRunner.query(`DROP TABLE "whitelist_transaction_logs"`);
		await queryRunner.query(`DROP TABLE "refferal_claim_transaction_logs"`);
		await queryRunner.query(`DROP TABLE "buy_nft_transaction_logs"`);
	}
}
