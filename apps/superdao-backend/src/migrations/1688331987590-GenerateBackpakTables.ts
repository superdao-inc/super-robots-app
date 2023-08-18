import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenerateBackpakTables1688331987590 implements MigrationInterface {
	name = 'GenerateBackpakTables1688331987590';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "custom_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "layerType" character varying NOT NULL, "layerName" character varying NOT NULL, CONSTRAINT "UQ_55c80d1311564708e111bc56433" UNIQUE ("layerName"), CONSTRAINT "PK_884c0a9422f53597e8389207249" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "custom_item_by_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "wallet" character varying, "item" character varying, CONSTRAINT "PK_80643117eca2b9ff801b49eb438" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "custom_item_by_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "tokenId" character varying NOT NULL, "isEnabled" boolean NOT NULL DEFAULT false, "item" character varying, CONSTRAINT "PK_ffeb2e9aea0eade0152808d5a66" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(`CREATE INDEX "IDX_12dd8bcb789a731bd066a5c8d8" ON "custom_item_by_token" ("tokenId") `);

		await queryRunner.query(
			`ALTER TABLE "custom_item_by_user" ADD CONSTRAINT "FK_0cc7ec20508cbe0a14f066570ff" FOREIGN KEY ("wallet") REFERENCES "users"("walletAddress") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "custom_item_by_user" ADD CONSTRAINT "FK_b4e05632dce1957d556c9134dee" FOREIGN KEY ("item") REFERENCES "custom_item"("layerName") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);

		await queryRunner.query(
			`ALTER TABLE "custom_item_by_token" ADD CONSTRAINT "FK_421a83280556e186aa9cbbd6bd7" FOREIGN KEY ("item") REFERENCES "custom_item"("layerName") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "custom_item_by_token" DROP CONSTRAINT "FK_421a83280556e186aa9cbbd6bd7"`);

		await queryRunner.query(`ALTER TABLE "custom_item_by_user" DROP CONSTRAINT "FK_b4e05632dce1957d556c9134dee"`);
		await queryRunner.query(`ALTER TABLE "custom_item_by_user" DROP CONSTRAINT "FK_0cc7ec20508cbe0a14f066570ff"`);

		await queryRunner.query(`DROP INDEX "public"."IDX_12dd8bcb789a731bd066a5c8d8"`);
		await queryRunner.query(`DROP TABLE "custom_item_by_token"`);
		await queryRunner.query(`DROP TABLE "custom_item_by_user"`);
		await queryRunner.query(`DROP TABLE "custom_item"`);
	}
}
