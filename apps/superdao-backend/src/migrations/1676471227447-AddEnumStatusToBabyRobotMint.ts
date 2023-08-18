import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnumStatusToBabyRobotMint1676471227447 implements MigrationInterface {
	name = 'AddEnumStatusToBabyRobotMint1676471227447';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."baby_robot_mint_status_enum" AS ENUM('IN_QUEUE', 'CLAIMED')`);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_mint" ADD "status" "public"."baby_robot_mint_status_enum" NOT NULL DEFAULT 'IN_QUEUE'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" DROP COLUMN "status"`);
		await queryRunner.query(`DROP TYPE "public"."baby_robot_mint_status_enum"`);
	}
}
