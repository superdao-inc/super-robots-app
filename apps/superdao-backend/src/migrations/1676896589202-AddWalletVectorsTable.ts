import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWalletVectorsTable1676896589202 implements MigrationInterface {
	name = 'AddWalletVectorsTable1676896589202';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "wallet_vectors" ("address" character varying NOT NULL, "vector" character varying array NOT NULL DEFAULT '{}', CONSTRAINT "PK_55c5b973b47ebb0b7917a340010" PRIMARY KEY ("address"))`
		);
		await queryRunner.query(`CREATE INDEX "IDX_55c5b973b47ebb0b7917a34001" ON "wallet_vectors" ("address") `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_55c5b973b47ebb0b7917a34001"`);
		await queryRunner.query(`DROP TABLE "wallet_vectors"`);
	}
}
