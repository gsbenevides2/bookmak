import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migration1719446173329 implements MigrationInterface {
  name = "Migration1719446173329";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_sku" ADD "is_active" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`UPDATE "book_sku" SET "is_active" = true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book_sku" DROP COLUMN "is_active"`);
  }
}
