import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserSlug1673594655665 implements MigrationInterface {
	name = 'CreateUserSlug1673594655665';

	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(`UPDATE "users" SET "slug" = "id" where "slug" IS NULL`);
	}

	public async down(_: QueryRunner): Promise<void> {}
}
