import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDaoModeColumn1666081652880 implements MigrationInterface {
	name = 'CreateDaoModeColumn1666081652880';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."daos_mode_enum" AS ENUM('default', 'achievements')`);
		await queryRunner.query(`ALTER TABLE "daos" ADD "mode" "public"."daos_mode_enum" NOT NULL DEFAULT 'default'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "mode"`);
		await queryRunner.query(`DROP TYPE "public"."daos_mode_enum"`);
	}
}
