import { MigrationInterface, QueryRunner } from 'typeorm';

export class SimplifyUserInterests1678555510713 implements MigrationInterface {
	name = 'SimplifyUserInterests1678555510713';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_interests" DROP COLUMN "cryptoNative"`);
		await queryRunner.query(`ALTER TABLE "user_interests" DROP COLUMN "developer"`);
		await queryRunner.query(`ALTER TABLE "user_interests" DROP COLUMN "culture"`);
		await queryRunner.query(`ALTER TABLE "user_interests" DROP COLUMN "gaming"`);
		await queryRunner.query(`ALTER TABLE "user_interests" DROP COLUMN "defi"`);
		await queryRunner.query(
			`ALTER TABLE "user_interests" ADD "interests" character varying array NOT NULL DEFAULT '{}'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_interests" DROP COLUMN "interests"`);
		await queryRunner.query(`ALTER TABLE "user_interests" ADD "defi" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "user_interests" ADD "gaming" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "user_interests" ADD "culture" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "user_interests" ADD "developer" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`ALTER TABLE "user_interests" ADD "cryptoNative" boolean NOT NULL DEFAULT false`);
	}
}
