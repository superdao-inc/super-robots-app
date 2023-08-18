import { MigrationInterface, QueryRunner } from 'typeorm';

export class DaoAchievementRoadmapLevels1666021617557 implements MigrationInterface {
	name = 'DaoAchievementRoadmapLevels1666021617557';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" ADD "achievementsRoadmapLevels" json NOT NULL DEFAULT '[]'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "achievementsRoadmapLevels"`);
	}
}
