import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsdValueIndexToAudiences1670771295813 implements MigrationInterface {
	name = 'AddUsdValueIndexToAudiences1670771295813';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE INDEX "IDX_7db70172d1a3977051d47bd71f" ON "scoring_audience_early_adopters" ("walletUsdCap") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e0ff2a28811a2912ab1dcf0e5f" ON "scoring_audience_developers" ("walletUsdCap") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_e0ff2a28811a2912ab1dcf0e5f"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_7db70172d1a3977051d47bd71f"`);
	}
}
