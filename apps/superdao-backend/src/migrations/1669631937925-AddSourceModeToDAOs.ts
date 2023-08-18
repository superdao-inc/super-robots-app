import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSourceModeToDAOs1669631937925 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TYPE daos_mode_enum ADD VALUE 'scorings'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// remove existing scorings modes with default value
		await queryRunner.query(`UPDATE "daos" SET "mode" = 'default' WHERE "mode" = 'scorings'`);

		// create type with old enum values
		await queryRunner.query(`CREATE TYPE "public"."daos_mode_enum_old" AS ENUM('default', 'achievements')`);

		// alter "daos.mode" to old type
		await queryRunner.query(`ALTER TABLE "daos" ALTER COLUMN "mode" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "daos" ALTER COLUMN "mode" TYPE "public"."daos_mode_enum_old" USING "mode"::"text"::"public"."daos_mode_enum_old"`
		);
		await queryRunner.query(`ALTER TABLE "daos" ALTER COLUMN "mode" SET DEFAULT 'default'`);

		// rename type to it's old name
		await queryRunner.query(`DROP TYPE "public"."daos_mode_enum"`);
		await queryRunner.query(`ALTER TYPE "public"."daos_mode_enum_old" RENAME TO "daos_mode_enum"`);
	}
}
