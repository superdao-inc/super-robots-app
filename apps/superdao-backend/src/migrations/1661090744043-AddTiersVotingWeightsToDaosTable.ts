import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTiersVotingWeightsToDaosTable1661090744043 implements MigrationInterface {
	name = 'AddTiersVotingWeightsToDaosTable1661090744043';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" ADD "tiersVotingWeights" json NOT NULL DEFAULT '[]'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "tiersVotingWeights"`);
	}
}
