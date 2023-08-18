import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserCookieFields1663945277988 implements MigrationInterface {
	name = 'AddUserCookieFields1663945277988';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" ADD "hasCookieDecision" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "users" ADD "agreedWithCookie" boolean NOT NULL DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "agreedWithCookie"`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hasCookieDecision"`);
	}
}
