import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDevelopersScoringTable1670739219980 implements MigrationInterface {
	name = 'CreateDevelopersScoringTable1670739219980';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "scoring_audience_developers" ("wallet" character varying NOT NULL, "name" character varying, "score" integer NOT NULL, "usdcBalance" character varying NOT NULL DEFAULT '0', "usdtBalance" character varying NOT NULL DEFAULT '0', "daiBalance" character varying NOT NULL DEFAULT '0', "ethBalance" character varying NOT NULL DEFAULT '0', "tags" character varying array NOT NULL DEFAULT '{}', "nftsCount" integer NOT NULL, "ens" character varying, "twitterUrl" character varying, "twitterAvatarUrl" character varying, "twitterUsername" character varying, "walletUsdCap" integer NOT NULL DEFAULT '0', "twitterFollowersCount" integer, "activity" character varying array NOT NULL DEFAULT '{}', CONSTRAINT "PK_2e76f93f17f5b746ec72ebbf8c5" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_497577e4c743b812c228677423" ON "scoring_audience_developers" ("score") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4959f9603fc81193cd99406555" ON "scoring_audience_developers" ("nftsCount") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_68d9b0df8bbd0c24ee21b43440" ON "scoring_audience_developers" ("twitterFollowersCount") `
		);

		// insert 20 developers mock data
		await queryRunner.query(`
				INSERT INTO "scoring_audience_developers" ("wallet", "name", "score", "usdtBalance", "nftsCount", "twitterFollowersCount", "tags")
				VALUES
						('0x0000000000000000000000000000000000000001', 'Developer 1', 100, 100000000, 100, 100, '{}'),
						('0x0000000000000000000000000000000000000002', 'Developer 2', 90, 90000000, 90, 90, '{"whale", "dexer" }'),
						('0x0000000000000000000000000000000000000003', 'Developer 3', 80, 80000000, 80, 80, '{}'),
						('0x0000000000000000000000000000000000000004', 'Developer 4', 70, 70000000, 70, 70, '{}'),
					  ('0x0000000000000000000000000000000000000005', 'Developer 5', 60, 60000000, 60, 60, '{"hacker", "veteran", "whale", "dexer"}'),
					  ('0x0000000000000000000000000000000000000006', 'Developer 6', 50, 50000000, 50, 50, '{}'),
					  ('0x0000000000000000000000000000000000000007', 'Developer 7', 40, 40000000, 40, 40, '{}'),
					  ('0x0000000000000000000000000000000000000008', 'Developer 8', 30, 30000000, 30, 30, '{"whale"}'),
					  ('0x0000000000000000000000000000000000000009', 'Developer 9', 20, 20000000, 20, 20, '{}'),
					  ('0x0000000000000000000000000000000000000010', 'Developer 10', 10, 10000000, 10, 10, '{"hacker", "veteran", "dexer"}'),
					  ('0x0000000000000000000000000000000000000011', 'Developer 11', 9, 9, 9000000, 9, '{}'),
					  ('0x0000000000000000000000000000000000000012', 'Developer 12', 8, 8, 8000000, 8, '{}'),
					  ('0x0000000000000000000000000000000000000013', 'Developer 13', 7, 7, 7000000, 7, '{}'),
					  ('0x0000000000000000000000000000000000000014', 'Developer 14', 6, 6, 6000000, 6, '{}'),
					  ('0x0000000000000000000000000000000000000015', 'Developer 15', 5, 5, 5000000, 5, '{}'),
					  ('0x0000000000000000000000000000000000000016', 'Developer 16', 4, 4, 4000000, 4, '{}'),
					  ('0x0000000000000000000000000000000000000017', 'Developer 17', 3, 3, 3000000, 3, '{}'),
					  ('0x0000000000000000000000000000000000000018', 'Developer 18', 2, 2, 2000000, 2, '{}'),
					  ('0x0000000000000000000000000000000000000019', 'Developer 19', 1, 1, 1000000, 1, '{}'),
					  ('0x0000000000000000000000000000000000000020', 'Developer 20', 0, 0, 0, 0, '{}')
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_68d9b0df8bbd0c24ee21b43440"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_4959f9603fc81193cd99406555"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_497577e4c743b812c228677423"`);
		await queryRunner.query(`DROP TABLE "scoring_audience_developers"`);
	}
}
