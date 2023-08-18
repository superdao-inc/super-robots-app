import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTransactionDataToErc721MintLogs1680033101593 implements MigrationInterface {
	name = 'AddTransactionDataToErc721MintLogs1680033101593';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ADD "transactionHash" character varying`);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ADD "tokenId" character varying`);
		await queryRunner.query(
			`ALTER TYPE "public"."baby_robot_mint_status_enum" RENAME TO "baby_robot_mint_status_enum_old"`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."baby_robot_mint_status_enum" AS ENUM('IN_QUEUE', 'STARTED', 'CLAIMED')`
		);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ALTER COLUMN "status" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_mint" ALTER COLUMN "status" TYPE "public"."baby_robot_mint_status_enum" USING "status"::"text"::"public"."baby_robot_mint_status_enum"`
		);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ALTER COLUMN "status" SET DEFAULT 'IN_QUEUE'`);
		await queryRunner.query(`DROP TYPE "public"."baby_robot_mint_status_enum_old"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."baby_robot_mint_status_enum_old" AS ENUM('IN_QUEUE', 'CLAIMED')`);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ALTER COLUMN "status" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_mint" ALTER COLUMN "status" TYPE "public"."baby_robot_mint_status_enum_old" USING "status"::"text"::"public"."baby_robot_mint_status_enum_old"`
		);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ALTER COLUMN "status" SET DEFAULT 'IN_QUEUE'`);
		await queryRunner.query(`DROP TYPE "public"."baby_robot_mint_status_enum"`);
		await queryRunner.query(
			`ALTER TYPE "public"."baby_robot_mint_status_enum_old" RENAME TO "baby_robot_mint_status_enum"`
		);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" DROP COLUMN "tokenId"`);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" DROP COLUMN "transactionHash"`);
	}
}
