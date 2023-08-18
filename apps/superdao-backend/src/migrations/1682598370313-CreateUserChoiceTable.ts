import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserChoiceTable1682598370313 implements MigrationInterface {
	name = 'CreateUserChoiceTable1682598370313';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "baby_robot_user_choice" ("tokenId" character varying NOT NULL, "layers" json NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c40ac381d1c16d8b18e7a6eb8fa" PRIMARY KEY ("tokenId"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "baby_robot_user_choice"`);
	}
}
