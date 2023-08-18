import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnWinterFiatCheckoutProjectIdToDaoTable1661333822179 implements MigrationInterface {
	name = 'AddColumnWinterFiatCheckoutProjectIdToDaoTable1661333822179';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" ADD "winterFiatCheckoutProjectId" integer unique`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "winterFiatCheckoutProjectId"`);
	}
}
