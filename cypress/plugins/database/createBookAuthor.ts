import { type BookAuthorTable } from "../../typings/databaseTables";
import { type BookAuthorFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createBookAuthor(
  fixure: BookAuthorFixureData,
): Promise<void> {
  const knex = getConnection();
  await knex<BookAuthorTable>("book_author").insert(fixure);
  await knex.destroy();
}
