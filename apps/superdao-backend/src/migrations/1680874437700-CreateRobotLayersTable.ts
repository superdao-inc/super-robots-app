import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRobotLayersTable1680874437700 implements MigrationInterface {
	name = 'CreateRobotLayersTable1680874437700';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "baby_robot_layers" ("wallet" character varying NOT NULL, "layers" json NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_57c0853b0beb42cb252ca27565" UNIQUE ("wallet"), CONSTRAINT "PK_57c0853b0beb42cb252ca27565c" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_layers" ADD CONSTRAINT "FK_57c0853b0beb42cb252ca27565c" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "baby_robot_layers" DROP CONSTRAINT "FK_57c0853b0beb42cb252ca27565c"`);
		await queryRunner.query(`DROP TABLE "baby_robot_layers"`);
	}
}
