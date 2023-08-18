import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBabyRobotMintTable1676447974903 implements MigrationInterface {
	name = 'CreateBabyRobotMintTable1676447974903';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "baby_robot_mint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "burnedAt" TIMESTAMP WITH TIME ZONE, "userId" uuid, "robotSlug" character varying, CONSTRAINT "REL_deab5566550ddfd89abcb0f72a" UNIQUE ("userId"), CONSTRAINT "PK_bf8bb215fb2b13159e4286e8e6e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_mint" ADD CONSTRAINT "FK_deab5566550ddfd89abcb0f72a1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_mint" ADD CONSTRAINT "FK_aeff6dd5130bce72f6e6f14fd33" FOREIGN KEY ("robotSlug") REFERENCES "baby_robots"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" DROP CONSTRAINT "FK_aeff6dd5130bce72f6e6f14fd33"`);
		await queryRunner.query(`ALTER TABLE "baby_robot_mint" DROP CONSTRAINT "FK_deab5566550ddfd89abcb0f72a1"`);
		await queryRunner.query(`DROP TABLE "baby_robot_mint"`);
	}
}
