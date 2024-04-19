import { type BookSkuTable } from "../../typings/databaseTables";
import { type BookSkuFixtureData } from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

export async function createBookSku(
  fixture: BookSkuFixtureData,
): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<BookSkuTable>("book_sku")
    .insert(fixture)
    .returning("id");
  await knex.destroy();
  return id;
}
