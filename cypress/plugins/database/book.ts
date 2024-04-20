/// <reference path="./typings.d.ts" />

import { getConnection } from "./getConnnection";

export async function createBook(data: DatabaseCreateBookData): Promise<null> {
  const knex = getConnection();
  await knex<AuthorTable>("author").insert(data.authors);
  await knex<CategoryTable>("category").insert(data.categories);
  await knex<BookTable>("book").insert(data.books);
  await knex<BookAuthorTable>("book_authors").insert(data.booksAuthors);
  await knex<BookCategoryTable>("book_categories").insert(data.booksCategories);
  await knex<BookSkuTable>("book_sku").insert(data.booksSkus);
  await knex.destroy();
  return null;
}
