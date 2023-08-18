import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRobotFeedbackFormTable1681079403935 implements MigrationInterface {
	name = 'CreateRobotFeedbackFormTable1681079403935';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "baby_robot_feedback_form" ("wallet" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_d3083f9c545043a60967df54a1" UNIQUE ("wallet"), CONSTRAINT "PK_d3083f9c545043a60967df54a10" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_feedback_form" ADD CONSTRAINT "FK_d3083f9c545043a60967df54a10" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "baby_robot_feedback_form" DROP CONSTRAINT "FK_d3083f9c545043a60967df54a10"`);
		await queryRunner.query(`DROP TABLE "baby_robot_feedback_form"`);
	}
}
