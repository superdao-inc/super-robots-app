import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnActivityToEarlyAdopterTable1670332314389 implements MigrationInterface {
	name = 'AddColumnActivityToEarlyAdopterTable1670332314389';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "scoring_audience_early_adopters" ADD "activity" character varying array NOT NULL DEFAULT '{}'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "scoring_audience_early_adopters" DROP COLUMN "activity"`);
	}
}
