import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719112809065 implements MigrationInterface {
  name = "Migration1719112809065";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" RENAME COLUMN "password" TO "password_hash"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" RENAME COLUMN "password_hash" TO "password"`,
    );
  }
}
