import { type BookAuthorTable } from "../../typings/databaseTables";
import { type BookAuthorFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createBookAuthor(
  fixure: BookAuthorFixureData,
): Promise<null> {
  const knex = getConnection();
  await knex<BookAuthorTable>("book_authors").insert(fixure);
  await knex.destroy();
  return null;
}
