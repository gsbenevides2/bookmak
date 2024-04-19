import {
  type AuthorFixureData,
  type BookAuthorFixureData,
  type BookCategoryFixureData,
  type BookFixureData,
  type BookSkuFixureData,
  type CategoryFixureData,
} from "../../typings/fixures";
import { getConnection } from "./getConnnection";

interface Params {
  authors: AuthorFixureData[];
  categories: CategoryFixureData[];
  books: BookFixureData[];
  bookAuthors: BookAuthorFixureData[];
  bookCategories: BookCategoryFixureData[];
  bookSkus: BookSkuFixureData[];
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
