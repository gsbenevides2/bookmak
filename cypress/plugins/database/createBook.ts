import { type BookTable } from "../../typings/databaseTables";
import { type BookFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createBook(bookFixure: BookFixureData): Promise<void> {
  const knex = getConnection();
  await knex<BookTable>("book").insert(bookFixure);
  await knex.destroy();
}
