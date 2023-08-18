import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMintElegigbleTable1681420799580 implements MigrationInterface {
	name = 'CreateMintElegigbleTable1681420799580';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "baby_robot_mint_eligible" ("wallet" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_7652df12fee903f28d94d2917d" UNIQUE ("wallet"), CONSTRAINT "PK_7652df12fee903f28d94d2917d5" PRIMARY KEY ("wallet"))`
		);
		await queryRunner.query(
			`ALTER TABLE "baby_robot_mint_eligible" ADD CONSTRAINT "FK_7652df12fee903f28d94d2917d5" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "baby_robot_mint_eligible" DROP CONSTRAINT "FK_7652df12fee903f28d94d2917d5"`);
		await queryRunner.query(`DROP TABLE "baby_robot_mint_eligible"`);
	}
}
