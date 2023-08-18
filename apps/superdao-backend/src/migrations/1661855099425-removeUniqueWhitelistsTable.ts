import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeUniqueWhitelistsTable1661855099425 implements MigrationInterface {
	name = 'removeUniqueWhitelistsTable1661855099425';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "whitelists" DROP CONSTRAINT "UQ_3a853225b93dc29e49bbb78eb54"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "whitelists" ADD CONSTRAINT "UQ_3a853225b93dc29e49bbb78eb54" UNIQUE ("daoId", "walletAddress", "target", "email")`
		);
	}
}
