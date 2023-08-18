import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScoringEarlyAdoptersCopy1671704234930 implements MigrationInterface {
	name = 'ScoringEarlyAdoptersCopy1671704234930';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "scoring_audience_early_adopters_copy" AS TABLE "scoring_audience_early_adopters"`
		);
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters_copy" ADD CONSTRAINT "PK_scoring_audience_early_adopters_copy_wallet" PRIMARY KEY ("wallet")`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_scoring_audience_early_adopters_copy_score" ON "scoring_audience_early_adopters_copy" ("score") `
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "scoring_audience_early_adopters_copy"`);
	}
}
