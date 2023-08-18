import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterImagesCropCharacterVarying1660575863865 implements MigrationInterface {
	name = 'AlterImagesCropCharacterVarying1660575863865';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" ALTER COLUMN "avatar" TYPE character varying`);
		await queryRunner.query(`ALTER TABLE "daos" ALTER COLUMN "cover" TYPE character varying`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" TYPE character varying`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cover" TYPE character varying`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" ALTER COLUMN "avatar" TYPE uuid`);
		await queryRunner.query(`ALTER TABLE "daos" ALTER COLUMN "cover" TYPE uuid`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" TYPE uuid`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "cover" TYPE uuid`);
	}
}
