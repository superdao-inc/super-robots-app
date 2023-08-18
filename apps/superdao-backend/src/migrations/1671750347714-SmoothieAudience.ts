import { MigrationInterface, QueryRunner } from 'typeorm';

export class SmoothieAudience1671750347714 implements MigrationInterface {
	name = 'SmoothieAudience1671750347714';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "scoring_audience_smoothie" ("wallet" character varying NOT NULL, "name" character varying, "score" integer NOT NULL, "usdcBalance" character varying NOT NULL DEFAULT '0', "usdtBalance" character varying NOT NULL DEFAULT '0', "daiBalance" character varying NOT NULL DEFAULT '0', "ethBalance" character varying NOT NULL DEFAULT '0', "tags" character varying array NOT NULL DEFAULT '{}', "nftsCount" integer NOT NULL, "ens" character varying, "twitterUrl" character varying, "twitterAvatarUrl" character varying, "twitterUsername" character varying, "walletUsdCap" integer NOT NULL DEFAULT '0', "twitterFollowersCount" integer, "activity" character varying array NOT NULL DEFAULT '{}', CONSTRAINT "PK_b3fa04c5730a705ec5e9d128564" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(`CREATE INDEX "IDX_ea630aa97aaa8619a61de8284e" ON "scoring_audience_smoothie" ("score") `);
		await queryRunner.query(
			`CREATE INDEX "IDX_54bc0403252aff38fffc28fe44" ON "scoring_audience_smoothie" ("nftsCount") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_90cb295a9766ccfb1677fb1463" ON "scoring_audience_smoothie" ("walletUsdCap") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_fcf430e5d1cc14251e49e4b67d" ON "scoring_audience_smoothie" ("twitterFollowersCount") `
		);

		// insert 25 smoothie users mock data
		await queryRunner.query(`
            INSERT INTO "scoring_audience_smoothie" ("wallet", "name", "score", "ethBalance", "nftsCount", "twitterFollowersCount")
            VALUES
                ('0x0000000000000000000000000000000000000001', 'Smoothies user 1', 100, 100, 100, 100),
                ('0x0000000000000000000000000000000000000002', 'Smoothies user 2', 90, 90, 90, 90),
                ('0x0000000000000000000000000000000000000003', 'Smoothies user 3', 80, 80, 80, 80),
                ('0x0000000000000000000000000000000000000004', 'Smoothies user 4', 70, 70, 70, 70),
                ('0x0000000000000000000000000000000000000005', 'Smoothies user 5', 60, 60, 60, 60),
                ('0x0000000000000000000000000000000000000006', 'Smoothies user 6', 50, 50, 50, 50),
                ('0x0000000000000000000000000000000000000007', 'Smoothies user 7', 40, 40, 40, 40),
                ('0x0000000000000000000000000000000000000008', 'Smoothies user 8', 30, 30, 30, 30),
                ('0x0000000000000000000000000000000000000009', 'Smoothies user 9', 20, 20, 20, 20),
                ('0x0000000000000000000000000000000000000010', 'Smoothies user 10', 10, 10, 10, 10),
                ('0x0000000000000000000000000000000000000011', 'Smoothies user 11', 9, 9, 9, 9),
                ('0x0000000000000000000000000000000000000012', 'Smoothies user 12', 8, 8, 8, 8),
                ('0x0000000000000000000000000000000000000013', 'Smoothies user 13', 7, 7, 7, 7),
                ('0x0000000000000000000000000000000000000014', 'Smoothies user 14', 6, 6, 6, 6),
                ('0x0000000000000000000000000000000000000015', 'Smoothies user 15', 5, 5, 5, 5),
                ('0x0000000000000000000000000000000000000016', 'Smoothies user 16', 4, 4, 4, 4),
                ('0x0000000000000000000000000000000000000017', 'Smoothies user 17', 3, 3, 3, 3),
                ('0x0000000000000000000000000000000000000018', 'Smoothies user 18', 2, 2, 2, 2),
                ('0x0000000000000000000000000000000000000019', 'Smoothies user 19', 1, 1, 1, 1),
                ('0x0000000000000000000000000000000000000020', 'Smoothies user 20', 0, 0, 0, 0)
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_fcf430e5d1cc14251e49e4b67d"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_90cb295a9766ccfb1677fb1463"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_54bc0403252aff38fffc28fe44"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_ea630aa97aaa8619a61de8284e"`);
		await queryRunner.query(`DROP TABLE "scoring_audience_smoothie"`);
	}
}
