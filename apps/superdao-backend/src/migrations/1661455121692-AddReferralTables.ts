import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReferralTables1661455121692 implements MigrationInterface {
	name = 'AddReferralTables1661455121692';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "referral_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "referralLinkId" uuid NOT NULL, "daoMembershipId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_d77ab47415f02c8083cad00f148" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "referral_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortId" character varying NOT NULL, "referralCampaignId" uuid NOT NULL, "ambassadorWallet" character varying NOT NULL, "limit" integer NOT NULL, "limitLeft" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "UQ_68a97beae22ebfcc6fee36bcec2" UNIQUE ("shortId"), CONSTRAINT "PK_e154c9aeb5f7920397e688b3790" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "referral_campaign" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shortId" character varying NOT NULL, "daoId" uuid NOT NULL, "tier" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "UQ_d0d3123fcb8e097f5b5574925e9" UNIQUE ("shortId"), CONSTRAINT "PK_67660dee859b41bfe1410613ef9" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "referral_member" ADD CONSTRAINT "FK_e352bbf386a1180f145a52ebb57" FOREIGN KEY ("referralLinkId") REFERENCES "referral_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "referral_link" ADD CONSTRAINT "FK_10f5d6f73d556113ce9e9564f20" FOREIGN KEY ("referralCampaignId") REFERENCES "referral_campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "referral_campaign" ADD CONSTRAINT "FK_c3eb6ddbe95bef2dd1046a95cf5" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "referral_campaign" DROP CONSTRAINT "FK_c3eb6ddbe95bef2dd1046a95cf5"`);
		await queryRunner.query(`ALTER TABLE "referral_link" DROP CONSTRAINT "FK_10f5d6f73d556113ce9e9564f20"`);
		await queryRunner.query(`ALTER TABLE "referral_member" DROP CONSTRAINT "FK_e352bbf386a1180f145a52ebb57"`);
		await queryRunner.query(`DROP TABLE "referral_campaign"`);
		await queryRunner.query(`DROP TABLE "referral_link"`);
		await queryRunner.query(`DROP TABLE "referral_member"`);
	}
}
