import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailVerifiedColumnAtUserTable1664896194653 implements MigrationInterface {
	name = 'AddEmailVerifiedColumnAtUserTable1664896194653';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" ADD "emailVerified" boolean NOT NULL DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerified"`);
	}
}
