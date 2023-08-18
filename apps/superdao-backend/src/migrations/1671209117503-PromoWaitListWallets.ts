import { MigrationInterface, QueryRunner } from 'typeorm';

export class PromoWaitListWallets1671209117503 implements MigrationInterface {
	name = 'PromoWaitListWallets1671209117503';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "promo_wait_list_wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "wallet" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "promoCampaign" "public"."promo_campaign_type" NOT NULL DEFAULT 'hashmail', CONSTRAINT "PK_7eed0795c1f41bbb073b8da2372" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE INDEX "IDX_14e7c7a2754c626dbaeb0c2434" ON "promo_wait_list_wallets" ("email") `);
		await queryRunner.query(
			`CREATE INDEX "IDX_a5e6cd212cd8f4035148b95936" ON "promo_wait_list_wallets" ("promoCampaign") `
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_9734275f539a5535ce08fdfd1a" ON "promo_wait_list_wallets" ("wallet", "promoCampaign") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_9734275f539a5535ce08fdfd1a"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_a5e6cd212cd8f4035148b95936"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_14e7c7a2754c626dbaeb0c2434"`);
		await queryRunner.query(`DROP TABLE "promo_wait_list_wallets"`);
	}
}
