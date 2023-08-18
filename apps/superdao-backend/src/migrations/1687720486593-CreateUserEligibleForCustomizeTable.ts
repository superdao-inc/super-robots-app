import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEligibleForCustomizeTable1687720486593 implements MigrationInterface {
	name = 'CreateUserEligibleForCustomizeTable1687720486593';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "baby_robot_customize_eligible" ("wallet" character varying NOT NULL, "maxActivationsCount" integer NOT NULL DEFAULT '0', "usedActivationsCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_efeb6a9f87b800bc24cb8de5cd" UNIQUE ("wallet"), CONSTRAINT "PK_efeb6a9f87b800bc24cb8de5cdd" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_customize_eligible" ADD CONSTRAINT "FK_efeb6a9f87b800bc24cb8de5cdd" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "baby_robot_customize_eligible" DROP CONSTRAINT "FK_efeb6a9f87b800bc24cb8de5cdd"`
		);
		await queryRunner.query(`DROP TABLE "baby_robot_customize_eligible"`);
	}
}
