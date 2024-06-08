import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migration1717730203208 implements MigrationInterface {
  name = "Migration1717730203208";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."card_flag" RENAME TO "card_flag_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."card_flag" AS ENUM('mastercard', 'visa', 'amex', 'discover', 'dinersclub', 'jcb', 'elo')`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ALTER COLUMN "flag" TYPE "public"."card_flag" USING "flag"::"text"::"public"."card_flag"`,
    );
    await queryRunner.query(`DROP TYPE "public"."card_flag_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."card_flag_old" AS ENUM('mastercard', 'visa', 'amex', 'discover', 'dinersclub', 'jcb')`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ALTER COLUMN "flag" TYPE "public"."card_flag_old" USING "flag"::"text"::"public"."card_flag_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."card_flag"`);
    await queryRunner.query(
      `ALTER TYPE "public"."card_flag_old" RENAME TO "card_flag"`,
    );
  }
}
