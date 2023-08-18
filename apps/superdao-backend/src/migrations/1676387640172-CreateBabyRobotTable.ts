import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBabyRobotTable1676387640172 implements MigrationInterface {
	name = 'CreateBabyRobotTable1676387640172';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "baby_robots" ("slug" character varying NOT NULL, "ipfsImage" character varying NOT NULL, "kernelAddress" character varying NOT NULL, "collectionAddress" character varying NOT NULL, "tierId" character varying NOT NULL, CONSTRAINT "PK_325f51277bbfabf87213393f6a3" PRIMARY KEY ("slug"))`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "baby_robots"`);
	}
}
