import { type CategoryTable } from "../../typings/databaseTables";
import { type CategoryFixureData } from "../../typings/fixures";
import { getConnection } from "./getConnnection";

export async function createCategory(
  categoryFixure: CategoryFixureData,
): Promise<void> {
  const knex = getConnection();
  await knex<CategoryTable>("category").insert(categoryFixure);
  await knex.destroy();
}
