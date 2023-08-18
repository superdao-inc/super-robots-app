import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateScoringActivityContractsTable1670486617989 implements MigrationInterface {
	name = 'CreateScoringActivityContractsTable1670486617989';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "scoring_activity_contracts" ("address" character varying NOT NULL, "imageUrl" character varying, "name" character varying NOT NULL, "externalUrl" character varying NOT NULL, CONSTRAINT "PK_2f1ffafd28d08c6a1a9da8c0285" PRIMARY KEY ("address"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "scoring_activity_contracts"`);
	}
}
