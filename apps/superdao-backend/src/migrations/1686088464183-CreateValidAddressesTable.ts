import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateValidAddressesTable1686088464183 implements MigrationInterface {
	name = 'CreateValidAddressesTable1686088464183';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_code_valid_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "wallet" character varying, CONSTRAINT "REL_68ee146cd70f6f22f2a4769a4f" UNIQUE ("wallet"), CONSTRAINT "PK_6a5a6308d3c98767b74b8ee5470" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "user_code_valid_addresses" ADD CONSTRAINT "FK_68ee146cd70f6f22f2a4769a4fd" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_code_valid_addresses" DROP CONSTRAINT "FK_68ee146cd70f6f22f2a4769a4fd"`);
		await queryRunner.query(`DELETE FROM "user_code_valid_addresses"`);
		await queryRunner.query(`DROP TABLE "user_code_valid_addresses"`);
	}
}
