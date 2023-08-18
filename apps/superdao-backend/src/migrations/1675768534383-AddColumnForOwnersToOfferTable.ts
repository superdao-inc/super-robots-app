import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnForOwnersToOfferTable1675768534383 implements MigrationInterface {
	name = 'AddColumnForOwnersToOfferTable1675768534383';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offers" ADD "forOwners" character varying`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "forOwners"`);
	}
}
