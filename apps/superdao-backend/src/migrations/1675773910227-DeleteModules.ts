import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteModules1675773910227 implements MigrationInterface {
	name = 'DeleteModules1675773910227';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "achievementsRoadmapLevels"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" ADD "achievementsRoadmapLevels" json NOT NULL DEFAULT '[]'`);
	}
}
