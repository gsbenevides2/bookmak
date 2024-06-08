import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migration1717808479311 implements MigrationInterface {
  name = "Migration1717808479311";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "shipping_rate_template" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "zip_code_start" character varying NOT NULL,
                "zip_code_end" character varying NOT NULL,
                "weight_start" double precision NOT NULL,
                "weight_end" double precision NOT NULL,
                "absolute_money_cost" integer NOT NULL,
                "price_percentage" double precision NOT NULL,
                "price_by_weight" integer NOT NULL,
                CONSTRAINT "pk_shipping_rate_template" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD "shipping_is_available" boolean NOT NULL DEFAULT false
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "shipping_is_available"
        `);
    await queryRunner.query(`
            DROP TABLE "shipping_rate_template"
        `);
  }
}
