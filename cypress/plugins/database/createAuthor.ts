import { type AuthorTable } from "../../typings/databaseTables";
import { type AuthorFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createAuthor(fixure: AuthorFixureData): Promise<void> {
  const knex = getConnection();
  await knex<AuthorTable>("author").insert(fixure);
  await knex.destroy();
}
