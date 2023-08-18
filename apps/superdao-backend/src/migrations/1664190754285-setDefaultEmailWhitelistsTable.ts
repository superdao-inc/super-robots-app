import { MigrationInterface, QueryRunner } from 'typeorm';

export class setDefaultEmailWhitelistsTable1664190754285 implements MigrationInterface {
	name = 'setDefaultEmailWhitelistsTable1664190754285';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`UPDATE "whitelists" SET email = '' WHERE email IS null`);
		await queryRunner.query(`ALTER TABLE "whitelists" ALTER COLUMN "email" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "whitelists" ALTER COLUMN "email" SET DEFAULT ''`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "whitelists" ALTER COLUMN "email" DROP DEFAULT`);
		await queryRunner.query(`ALTER TABLE "whitelists" ALTER COLUMN "email" DROP NOT NULL`);
		await queryRunner.query(`UPDATE "whitelists" SET email = NULL WHERE email = ''`);
	}
}
