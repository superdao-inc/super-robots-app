import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixScoringTables1673980620315 implements MigrationInterface {
	name = 'FixScoringTables1673980620315';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_scoring_audience_early_adopters_copy_score"`);
		await queryRunner.query(`ALTER TYPE "public"."promo_campaign_type" RENAME TO "promo_campaign_type_old"`);
		await queryRunner.query(`CREATE TYPE "public"."promo_allowed_wallets_promocampaign_enum" AS ENUM('hashmail')`);
		await queryRunner.query(`ALTER TABLE "promo_allowed_wallets" ALTER COLUMN "promoCampaign" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "promo_allowed_wallets" ALTER COLUMN "promoCampaign" TYPE "public"."promo_allowed_wallets_promocampaign_enum" USING "promoCampaign"::"text"::"public"."promo_allowed_wallets_promocampaign_enum"`
		);
		await queryRunner.query(`ALTER TABLE "promo_allowed_wallets" ALTER COLUMN "promoCampaign" SET DEFAULT 'hashmail'`);

		await queryRunner.query(`DROP INDEX "public"."IDX_9734275f539a5535ce08fdfd1a"`);

		await queryRunner.query(`CREATE TYPE "public"."promo_wait_list_wallets_promocampaign_enum" AS ENUM('hashmail')`);
		await queryRunner.query(`ALTER TABLE "promo_wait_list_wallets" ALTER COLUMN "promoCampaign" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "promo_wait_list_wallets" ALTER COLUMN "promoCampaign" TYPE "public"."promo_wait_list_wallets_promocampaign_enum" USING "promoCampaign"::"text"::"public"."promo_wait_list_wallets_promocampaign_enum"`
		);
		await queryRunner.query(
			`ALTER TABLE "promo_wait_list_wallets" ALTER COLUMN "promoCampaign" SET DEFAULT 'hashmail'`
		);
		await queryRunner.query(`DROP TYPE "public"."promo_campaign_type_old"`);

		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "score" SET NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdcBalance" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdcBalance" SET DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdtBalance" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdtBalance" SET DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "daiBalance" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "daiBalance" SET DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "ethBalance" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "ethBalance" SET DEFAULT '0'`
		);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "tags" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "tags" SET DEFAULT '{}'`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "nftsCount" SET NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "walletUsdCap" SET NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "walletUsdCap" SET DEFAULT '0'`
		);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "activity" SET NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "activity" SET DEFAULT '{}'`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_9734275f539a5535ce08fdfd1a" ON "promo_wait_list_wallets" ("wallet", "promoCampaign") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c8c313ac807f8850cae9fe9b75" ON "scoring_audience_early_adopters_copy" ("score") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d6d0f0231c3f8c48ac0d08c192" ON "scoring_audience_early_adopters_copy" ("nftsCount") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5fcd851d65253ac7f0a1494647" ON "scoring_audience_early_adopters_copy" ("walletUsdCap") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5031c9bf5fd3577d8e5c9d78d7" ON "scoring_audience_early_adopters_copy" ("twitterFollowersCount") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_5031c9bf5fd3577d8e5c9d78d7"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_5fcd851d65253ac7f0a1494647"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_d6d0f0231c3f8c48ac0d08c192"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_c8c313ac807f8850cae9fe9b75"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_9734275f539a5535ce08fdfd1a"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "activity" DROP DEFAULT`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "activity" DROP NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "walletUsdCap" DROP DEFAULT`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "walletUsdCap" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "nftsCount" DROP NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "tags" DROP DEFAULT`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "tags" DROP NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "ethBalance" DROP DEFAULT`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "ethBalance" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "daiBalance" DROP DEFAULT`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "daiBalance" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdtBalance" DROP DEFAULT`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdtBalance" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdcBalance" DROP DEFAULT`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "usdcBalance" DROP NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters_copy" ALTER COLUMN "score" DROP NOT NULL`);
		await queryRunner.query(`CREATE TYPE "public"."promo_campaign_type_old" AS ENUM('hashmail')`);
		await queryRunner.query(`ALTER TABLE "promo_wait_list_wallets" ALTER COLUMN "promoCampaign" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "promo_wait_list_wallets" ALTER COLUMN "promoCampaign" TYPE "public"."promo_campaign_type_old" USING "promoCampaign"::"text"::"public"."promo_campaign_type_old"`
		);
		await queryRunner.query(
			`ALTER TABLE "promo_wait_list_wallets" ALTER COLUMN "promoCampaign" SET DEFAULT 'hashmail'`
		);
		await queryRunner.query(`DROP TYPE "public"."promo_wait_list_wallets_promocampaign_enum"`);
		await queryRunner.query(`ALTER TYPE "public"."promo_campaign_type_old" RENAME TO "promo_campaign_type"`);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_9734275f539a5535ce08fdfd1a" ON "promo_wait_list_wallets" ("wallet", "promoCampaign") `
		);

		await queryRunner.query(`ALTER TABLE "promo_allowed_wallets" ALTER COLUMN "promoCampaign" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "promo_allowed_wallets" ALTER COLUMN "promoCampaign" TYPE "public"."promo_campaign_type_old" USING "promoCampaign"::"text"::"public"."promo_campaign_type_old"`
		);
		await queryRunner.query(`ALTER TABLE "promo_allowed_wallets" ALTER COLUMN "promoCampaign" SET DEFAULT 'hashmail'`);
		await queryRunner.query(`DROP TYPE "public"."promo_allowed_wallets_promocampaign_enum"`);

		await queryRunner.query(
			`CREATE INDEX "IDX_scoring_audience_early_adopters_copy_score" ON "scoring_audience_early_adopters_copy" ("score") `
		);
	}
}
