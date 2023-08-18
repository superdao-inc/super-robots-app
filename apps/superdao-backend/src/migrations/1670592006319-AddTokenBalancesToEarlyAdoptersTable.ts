import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokenBalancesToEarlyAdoptersTable1670592006319 implements MigrationInterface {
	name = 'AddTokenBalancesToEarlyAdoptersTable1670592006319';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_e45005f0a05b67c1b0c426be0e"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "ethBalance"`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "ethBalance" character varying NOT NULL DEFAULT '0'`
		);

		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "usdcBalance" character varying NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "usdtBalance" character varying NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "daiBalance" character varying NOT NULL DEFAULT '0'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "ethBalance"`);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "ethBalance" integer NOT NULL DEFAULT '0'`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e45005f0a05b67c1b0c426be0e" ON "scoring_audience_early_adopters" ("ethBalance") `
		);

		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "daiBalance"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "usdtBalance"`);
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "usdcBalance"`);
	}
}
