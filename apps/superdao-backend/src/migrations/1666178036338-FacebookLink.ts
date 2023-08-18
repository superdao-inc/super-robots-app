import { MigrationInterface, QueryRunner } from 'typeorm';

export class FacebookLink1666178036338 implements MigrationInterface {
	name = 'FacebookLink1666178036338';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "links" ADD "facebook" character varying`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "links" DROP COLUMN "facebook"`);
	}
}
