import { MigrationInterface, QueryRunner } from 'typeorm';

export class DaoMemberRolesUpdate1660646543386 implements MigrationInterface {
	name = 'DaoMemberRolesUpdate1660646543386';

	public async up(queryRunner: QueryRunner): Promise<void> {
		//auto
		await queryRunner.query(`ALTER TYPE "public"."dao_membership_role_enum" RENAME TO "dao_membership_role_enum_old"`);
		await queryRunner.query(
			`CREATE TYPE "public"."dao_membership_role_enum" AS ENUM('SUDO', 'CREATOR', 'ADMIN', 'MEMBER')`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ALTER COLUMN "role" TYPE "public"."dao_membership_role_enum" USING "role"::"text"::"public"."dao_membership_role_enum"`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" SET DEFAULT 'MEMBER'`);
		await queryRunner.query(`DROP TYPE "public"."dao_membership_role_enum_old"`);

		//moe
		await queryRunner.query(`UPDATE "dao_membership" SET "role" = 'ADMIN' WHERE "role" = 'CREATOR'`);

		await queryRunner.query(`
		update daos dao
		set "membersCount" = (select count(*)
									 from "dao_membership" daomember
									 where daomember."daoId" = dao.id AND daomember."role" != 'SUDO'
									 );
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		//moe
		await queryRunner.query(`UPDATE "dao_membership" SET "role" = 'CREATOR' WHERE "role" = 'ADMIN' OR "role" = 'SUDO'`);

		//auto
		await queryRunner.query(
			`CREATE TYPE "public"."dao_membership_role_enum_old" AS ENUM('CREATOR', 'MEMBER', 'WHITELIST')`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" DROP DEFAULT`);
		await queryRunner.query(
			`ALTER TABLE "dao_membership" ALTER COLUMN "role" TYPE "public"."dao_membership_role_enum_old" USING "role"::"text"::"public"."dao_membership_role_enum_old"`
		);
		await queryRunner.query(`ALTER TABLE "dao_membership" ALTER COLUMN "role" SET DEFAULT 'MEMBER'`);
		await queryRunner.query(`DROP TYPE "public"."dao_membership_role_enum"`);
		await queryRunner.query(`ALTER TYPE "public"."dao_membership_role_enum_old" RENAME TO "dao_membership_role_enum"`);

		//moe
		await queryRunner.query(`
		update daos dao
		set "membersCount" = (select count(*)
										from "dao_membership" daomember
										where daomember."daoId" = dao.id);
		`);
	}
}
