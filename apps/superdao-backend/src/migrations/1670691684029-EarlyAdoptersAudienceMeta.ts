import { MigrationInterface, QueryRunner } from 'typeorm';

export class EarlyAdoptersAudienceMeta1670691684029 implements MigrationInterface {
	name = 'EarlyAdoptersAudienceMeta1670691684029';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" ADD "ens" character varying`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" ADD "twitterUrl" character varying`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" ADD "twitterAvatarUrl" character varying`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" ADD "twitterUsername" character varying`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "walletUsdCap" integer NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" ALTER COLUMN "name" DROP NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ALTER COLUMN "twitterFollowersCount" DROP NOT NULL`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ALTER COLUMN "twitterFollowersCount" SET NOT NULL`
		);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" ALTER COLUMN "name" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "walletUsdCap"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "twitterUsername"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "twitterAvatarUrl"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "twitterUrl"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "ens"`);
	}
}
