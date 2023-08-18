import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTestOffers1674557530342 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`TRUNCATE "offers", "owners", "offer_claims", "offer_claims_data"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`TRUNCATE "offers", "owners", "offer_claims", "offer_claims_data"`);
	}
}
