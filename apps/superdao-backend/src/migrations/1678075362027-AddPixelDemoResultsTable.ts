import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPixelDemoResultsTable1678075362027 implements MigrationInterface {
	name = 'AddPixelDemoResultsTable1678075362027';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "pixel_demo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payload" jsonb NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "PK_6532de8bc1cce4faf06068df2f8" PRIMARY KEY ("id"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "pixel_demo"`);
	}
}
