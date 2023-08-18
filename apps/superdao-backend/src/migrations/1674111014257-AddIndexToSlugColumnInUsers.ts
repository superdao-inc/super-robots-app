import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexToSlugColumnInUsers1674111014257 implements MigrationInterface {
	name = 'AddIndexToSlugColumnInUsers1674111014257';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`UPDATE "users" SET "slug" = "id" where "slug" IS NULL`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "slug" SET NOT NULL`);
		await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bc0c27d77ee64f0a097a5c269b" ON "users" ("slug") `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_bc0c27d77ee64f0a097a5c269b"`);
		await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "slug" DROP NOT NULL`);
	}
}
