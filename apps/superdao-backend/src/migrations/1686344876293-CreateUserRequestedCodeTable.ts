import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRequestedCodeTable1686344876293 implements MigrationInterface {
	name = 'CreateUserRequestedCodeTable1686344876293';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_requested_code_refill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "wallet" character varying NOT NULL, CONSTRAINT "PK_cfcc7324dbaf689db4f1482d080" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "user_requested_code_refill"`);
	}
}
