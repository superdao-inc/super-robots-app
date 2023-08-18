import { MigrationInterface, QueryRunner } from 'typeorm';

export class PromoAllowedWallets1671203560561 implements MigrationInterface {
	name = 'PromoAllowedWallets1671203560561';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."promo_campaign_type" AS ENUM('hashmail')`);
		await queryRunner.query(
			`CREATE TABLE "promo_allowed_wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "wallet" character varying, "ens" character varying, "promoCampaign" "public"."promo_campaign_type" NOT NULL DEFAULT 'hashmail', "claimStartedAt" TIMESTAMP, "claimFinishedAt" TIMESTAMP, CONSTRAINT "PK_38d683ac82916bba62ac7f5975a" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE INDEX "IDX_3e654e3ab500eef806d2ea4984" ON "promo_allowed_wallets" ("email") `);
		await queryRunner.query(`CREATE INDEX "IDX_819a3990cee513ed55b64efc1f" ON "promo_allowed_wallets" ("wallet") `);
		await queryRunner.query(`CREATE INDEX "IDX_de138d4aecb0e1e18b39ff4bb7" ON "promo_allowed_wallets" ("ens") `);
		await queryRunner.query(
			`CREATE INDEX "IDX_325a9734f5d162906828fa3aea" ON "promo_allowed_wallets" ("promoCampaign") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_325a9734f5d162906828fa3aea"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_de138d4aecb0e1e18b39ff4bb7"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_819a3990cee513ed55b64efc1f"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_3e654e3ab500eef806d2ea4984"`);
		await queryRunner.query(`DROP TABLE "promo_allowed_wallets"`);
		await queryRunner.query(`DROP TYPE "public"."promo_campaign_type"`);
	}
}
