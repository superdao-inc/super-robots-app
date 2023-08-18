import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnMainToWalletsTable1660288281496 implements MigrationInterface {
	name = 'AddColumnMainToWalletsTable1660288281496';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "wallets" ADD "main" boolean NOT NULL DEFAULT false`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "main"`);
	}
}
