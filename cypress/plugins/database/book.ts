/// <reference path="./typings.d.ts" />

import { getConnection } from "./getConnnection";

export async function createBook(data: DatabaseCreateBookData): Promise<null> {
  const knex = getConnection();

  const authors: AuthorTable[] = data.authors;
  await knex<AuthorTable>("author").insert(authors);

  const categories: CategoryTable[] = data.categories;
  await knex<CategoryTable>("category").insert(categories);

  const books: BookTable[] = data.books.map((book) => {
    const { bookmarkStyle, ...rest } = book;
    return {
      ...rest,
      bookmark_style: bookmarkStyle,
    };
  });
  await knex<BookTable>("book").insert(books);

  const booksAuthors: BookAuthorTable[] = data.booksAuthors.map(
    (bookAuthor) => ({
      author_id: bookAuthor.authorId,
      book_id: bookAuthor.bookId,
    }),
  );

  await knex<BookAuthorTable>("book_authors").insert(booksAuthors);

  const booksCategories: BookCategoryTable[] = data.booksCategories.map(
    (bookCategory) => ({
      category_id: bookCategory.categoryId,
      book_id: bookCategory.bookId,
    }),
  );
  await knex<BookCategoryTable>("book_categories").insert(booksCategories);

  const booksSkus: BookSkuTable[] = data.booksSkus.map((bookSku) => {
    const { bookId, stockQuantity, ...rest } = bookSku;
    return {
      ...rest,
      book_id: bookId,
      stock_quantity: stockQuantity,
    };
  });

  await knex<BookSkuTable>("book_sku").insert(booksSkus);
  await knex.destroy();
  return null;
}
