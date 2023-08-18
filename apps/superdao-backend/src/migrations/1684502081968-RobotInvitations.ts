import { MigrationInterface, QueryRunner } from 'typeorm';

export class RobotInvitations1684502081968 implements MigrationInterface {
	name = 'RobotInvitations1684502081968';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_codes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "code" character varying NOT NULL, "activationsCount" integer NOT NULL DEFAULT '5', "ownerId" uuid, CONSTRAINT "PK_fc6ab0a548a92dce63e7e98c84e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "active_invitations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "ownerId" uuid, "invitedUserId" uuid, "codeId" uuid, CONSTRAINT "REL_9b68aa71147d7bdd92210f2721" UNIQUE ("invitedUserId"), CONSTRAINT "PK_1e174b6a5fbe2fa5e1dd8391d32" PRIMARY KEY ("id"))`
		);

		await queryRunner.query(
			`ALTER TABLE "user_codes" ADD CONSTRAINT "FK_c9819ba63536af7f9d5f75e3de0" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "active_invitations" ADD CONSTRAINT "FK_2694c4e29226cfedfaf5d9cd9e7" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "active_invitations" ADD CONSTRAINT "FK_9b68aa71147d7bdd92210f27219" FOREIGN KEY ("invitedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "active_invitations" ADD CONSTRAINT "FK_37b90d88086526168becf030024" FOREIGN KEY ("codeId") REFERENCES "user_codes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "active_invitations" DROP CONSTRAINT "FK_37b90d88086526168becf030024"`);
		await queryRunner.query(`ALTER TABLE "active_invitations" DROP CONSTRAINT "FK_9b68aa71147d7bdd92210f27219"`);
		await queryRunner.query(`ALTER TABLE "active_invitations" DROP CONSTRAINT "FK_2694c4e29226cfedfaf5d9cd9e7"`);
		await queryRunner.query(`ALTER TABLE "user_codes" DROP CONSTRAINT "FK_c9819ba63536af7f9d5f75e3de0"`);

		await queryRunner.query(`DROP TABLE "active_invitations"`);
		await queryRunner.query(`DROP TABLE "user_codes"`);
	}
}
