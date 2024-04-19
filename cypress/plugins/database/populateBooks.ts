import {
  type AuthorFixtureData,
  type BookAuthorFixtureData,
  type BookCategoryFixtureData,
  type BookFixtureData,
  type BookSkuFixtureData,
  type CategoryFixtureData,
} from "../../typings/fixtures";
import { getConnection } from "./getConnnection";

interface Params {
  authors: AuthorFixtureData[];
  categories: CategoryFixtureData[];
  books: BookFixtureData[];
  bookAuthors: BookAuthorFixtureData[];
  bookCategories: BookCategoryFixtureData[];
  bookSkus: BookSkuFixtureData[];
}

export async function populateBooks(params: Params): Promise<null> {
  const { authors, categories, books, bookAuthors, bookCategories, bookSkus } =
    params;
  const knex = getConnection();
  await knex("author").insert(authors);
  await knex("category").insert(categories);
  await knex("book").insert(books);
  await knex("book_authors").insert(bookAuthors);
  await knex("book_categories").insert(bookCategories);
  await knex("book_sku").insert(bookSkus);
  await knex.destroy();
  return null;
}
