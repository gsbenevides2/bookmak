import { type BookSkuTable } from "../../typings/databaseTables";
import { type BookSkuFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createBookSku(
  fixure: BookSkuFixureData,
): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<BookSkuTable>("book_sku")
    .insert(fixure)
    .returning("id");
  await knex.destroy();
  return id;
}
