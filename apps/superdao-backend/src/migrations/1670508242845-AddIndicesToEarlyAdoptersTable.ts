import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndicesToEarlyAdoptersTable1670508242845 implements MigrationInterface {
	name = 'AddIndicesToEarlyAdoptersTable1670508242845';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE INDEX "IDX_e45005f0a05b67c1b0c426be0e" ON "scoring_audience_early_adopters" ("ethBalance") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e7df9c1015f1188e2e85de22f2" ON "scoring_audience_early_adopters" ("nftsCount") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_06c7b8ef5f0e8db12dc6231846" ON "scoring_audience_early_adopters" ("twitterFollowersCount") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_06c7b8ef5f0e8db12dc6231846"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_e7df9c1015f1188e2e85de22f2"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_e45005f0a05b67c1b0c426be0e"`);
	}
}
