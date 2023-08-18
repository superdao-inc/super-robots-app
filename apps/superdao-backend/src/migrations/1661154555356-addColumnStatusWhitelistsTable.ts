import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnStatusWhitelistsTable1661154555356 implements MigrationInterface {
	name = 'addColumnStatusWhitelistsTable1661154555356';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."whitelists_status_enum" AS ENUM('ENABLED', 'ARCHIVED', 'DISABLED', 'USED')`
		);
		await queryRunner.query(
			`ALTER TABLE "whitelists" ADD "status" "public"."whitelists_status_enum" NOT NULL DEFAULT 'ENABLED'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "whitelists" DROP COLUMN "status"`);
		await queryRunner.query(`DROP TYPE "public"."whitelists_status_enum"`);
	}
}
