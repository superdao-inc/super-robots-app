import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateRobotMintSchema1678379335843 implements MigrationInterface {
	name = 'updateRobotMintSchema1678379335843';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" DROP CONSTRAINT "FK_aeff6dd5130bce72f6e6f14fd33"`);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" RENAME COLUMN "robotSlug" TO "imageNameSha"`);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ALTER COLUMN "imageNameSha" SET NOT NULL`);
		await queryRunner.query(`ALTER TABLE "user_interests" DROP CONSTRAINT "FK_d332e046acb1b89ad289d8e509c"`);
		await queryRunner.query(
			`ALTER TABLE "user_interests" ADD CONSTRAINT "UQ_d332e046acb1b89ad289d8e509c" UNIQUE ("wallet")`
		);
		await queryRunner.query(
			`ALTER TABLE "user_interests" ADD CONSTRAINT "FK_d332e046acb1b89ad289d8e509c" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_interests" DROP CONSTRAINT "FK_d332e046acb1b89ad289d8e509c"`);
		await queryRunner.query(`ALTER TABLE "user_interests" DROP CONSTRAINT "UQ_d332e046acb1b89ad289d8e509c"`);
		await queryRunner.query(
			`ALTER TABLE "user_interests" ADD CONSTRAINT "FK_d332e046acb1b89ad289d8e509c" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" ALTER COLUMN "imageNameSha" DROP NOT NULL`);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" RENAME COLUMN "imageNameSha" TO "robotSlug"`);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_mint" ADD CONSTRAINT "FK_aeff6dd5130bce72f6e6f14fd33" FOREIGN KEY ("robotSlug") REFERENCES "baby_robots"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
