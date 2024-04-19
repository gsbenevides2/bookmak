import { type AuthorTable } from "../../typings/databaseTables";
import { type AuthorFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createAuthor(fixure: AuthorFixureData): Promise<string> {
  const knex = getConnection();
  const [{ id }] = await knex<AuthorTable>("author")
    .insert(fixure)
    .returning("id");
  await knex.destroy();

  return id;
}
