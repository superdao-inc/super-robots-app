import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserClicksStatisticTables1685110018970 implements MigrationInterface {
	name = 'CreateUserClicksStatisticTables1685110018970';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_clicks_statistic_customize" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "wallet" character varying NOT NULL, CONSTRAINT "PK_bf1d67a734d771ac21a6b18f200" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "user_clicks_statistic_notify_me" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "wallet" character varying NOT NULL, CONSTRAINT "PK_ee26381105edaf3ffdaf5a4cd3b" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "user_clicks_statistic_request_invites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "wallet" character varying NOT NULL, CONSTRAINT "PK_9ed493337d2ce4c7d19879d6189" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`ALTER TABLE "user_codes" ALTER COLUMN "activationsCount" DROP DEFAULT`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_codes" ALTER COLUMN "activationsCount" SET DEFAULT '5'`);
		await queryRunner.query(`DROP TABLE "user_clicks_statistic_request_invites"`);
		await queryRunner.query(`DROP TABLE "user_clicks_statistic_notify_me"`);
		await queryRunner.query(`DROP TABLE "user_clicks_statistic_customize"`);
	}
}
