import { MigrationInterface, QueryRunner } from 'typeorm';

export class TalentProtocolAudience1671783252367 implements MigrationInterface {
	name = 'TalentProtocolAudience1671783252367';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "scoring_audience_talent_protocol" ("wallet" character varying NOT NULL, "name" character varying, "score" integer NOT NULL, "usdcBalance" character varying NOT NULL DEFAULT '0', "usdtBalance" character varying NOT NULL DEFAULT '0', "daiBalance" character varying NOT NULL DEFAULT '0', "ethBalance" character varying NOT NULL DEFAULT '0', "tags" character varying array NOT NULL DEFAULT '{}', "nftsCount" integer NOT NULL, "ens" character varying, "twitterUrl" character varying, "twitterAvatarUrl" character varying, "twitterUsername" character varying, "walletUsdCap" integer NOT NULL DEFAULT '0', "twitterFollowersCount" integer, "activity" character varying array NOT NULL DEFAULT '{}', CONSTRAINT "PK_6192e2c613f4b2a0307ed99ebfa" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5e9850abeb70e77b14067d3732" ON "scoring_audience_talent_protocol" ("score") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_38f34702424a77fb2c121cc5a5" ON "scoring_audience_talent_protocol" ("nftsCount") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f89c81e070c9241d55bdc54e4c" ON "scoring_audience_talent_protocol" ("walletUsdCap") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_83fa1cadf4e72a119137d00dfa" ON "scoring_audience_talent_protocol" ("twitterFollowersCount") `
		);

		// insert 25 talent protocol users mock data
		await queryRunner.query(`
            INSERT INTO "scoring_audience_talent_protocol" ("wallet", "name", "score", "ethBalance", "nftsCount", "twitterFollowersCount")
            VALUES
                ('0x0000000000000000000000000000000000000001', 'Talent protocol user 1', 100, 100, 100, 100),
                ('0x0000000000000000000000000000000000000002', 'Talent protocol user 2', 90, 90, 90, 90),
                ('0x0000000000000000000000000000000000000003', 'Talent protocol user 3', 80, 80, 80, 80),
                ('0x0000000000000000000000000000000000000004', 'Talent protocol user 4', 70, 70, 70, 70),
                ('0x0000000000000000000000000000000000000005', 'Talent protocol user 5', 60, 60, 60, 60),
                ('0x0000000000000000000000000000000000000006', 'Talent protocol user 6', 50, 50, 50, 50),
                ('0x0000000000000000000000000000000000000007', 'Talent protocol user 7', 40, 40, 40, 40),
                ('0x0000000000000000000000000000000000000008', 'Talent protocol user 8', 30, 30, 30, 30),
                ('0x0000000000000000000000000000000000000009', 'Talent protocol user 9', 20, 20, 20, 20),
                ('0x0000000000000000000000000000000000000010', 'Talent protocol user 10', 10, 10, 10, 10),
                ('0x0000000000000000000000000000000000000011', 'Talent protocol user 11', 9, 9, 9, 9),
                ('0x0000000000000000000000000000000000000012', 'Talent protocol user 12', 8, 8, 8, 8),
                ('0x0000000000000000000000000000000000000013', 'Talent protocol user 13', 7, 7, 7, 7),
                ('0x0000000000000000000000000000000000000014', 'Talent protocol user 14', 6, 6, 6, 6),
                ('0x0000000000000000000000000000000000000015', 'Talent protocol user 15', 5, 5, 5, 5),
                ('0x0000000000000000000000000000000000000016', 'Talent protocol user 16', 4, 4, 4, 4),
                ('0x0000000000000000000000000000000000000017', 'Talent protocol user 17', 3, 3, 3, 3),
                ('0x0000000000000000000000000000000000000018', 'Talent protocol user 18', 2, 2, 2, 2),
                ('0x0000000000000000000000000000000000000019', 'Talent protocol user 19', 1, 1, 1, 1),
                ('0x0000000000000000000000000000000000000020', 'Talent protocol user 20', 0, 0, 0, 0)
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_83fa1cadf4e72a119137d00dfa"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_f89c81e070c9241d55bdc54e4c"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_38f34702424a77fb2c121cc5a5"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_5e9850abeb70e77b14067d3732"`);
		await queryRunner.query(`DROP TABLE "scoring_audience_talent_protocol"`);
	}
}
