import { MigrationInterface, QueryRunner } from 'typeorm';

export class DaoAnalytics1660829109025 implements MigrationInterface {
	name = 'DaoAnalytics1660829109025';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."dao_analytics_mask_enum" AS ENUM('PUBLIC', 'TEST', 'INTERNAL')`);
		await queryRunner.query(
			`CREATE TABLE "dao_analytics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "daoId" uuid NOT NULL, "mask" "public"."dao_analytics_mask_enum" NOT NULL DEFAULT 'PUBLIC', CONSTRAINT "PK_d35187abef60139f5de8fa8a07e" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "dao_analytics"`);
		await queryRunner.query(`DROP TYPE "public"."dao_analytics_mask_enum"`);
	}
}
