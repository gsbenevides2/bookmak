import { type BookTable } from "../../typings/databaseTables";
import { type BookFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createBook(bookFixure: BookFixureData): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<BookTable>("book")
    .insert(bookFixure)
    .returning("id");
  await knex.destroy();
  return id;
}
