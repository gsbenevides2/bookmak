import knex from "knex";
import LowDb, { type Book } from "./lowdb";

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

export async function createBook(book: Book): Promise<void> {
  const bookContent = {
    id: book.id,
    title: book.title,
    cover: book.cover,
    description: book.translatedDescription ?? book.description,
    bookmarkStyle: book.bookmarkStyle,
  };

  await db("book").insert(bookContent).onConflict(["id"]).merge();

  await Promise.all(
    book.authors.map(async (author) => {
      const authorContent = {
        id: author.id,
        name: author.name,
      };

      await db("author").insert(authorContent).onConflict(["id"]).merge();

      await db("book_authors")
        .insert({
          authorId: author.id,
          bookId: book.id,
        })
        .onConflict(["authorId", "bookId"])
        .ignore();
    }),
  );
  await Promise.all(
    book.categories.map(async (category) => {
      const categoryContent = {
        id: category.id,
        name: category.translatedName ?? category.name,
      };
      await db("category").insert(categoryContent).onConflict(["id"]).merge();
      await db("book_categories")
        .insert({
          categoryId: category.id,
          bookId: book.id,
        })
        .onConflict(["categoryId", "bookId"])
        .merge();
    }),
  );
  await Promise.all(
    book.volumes.map(async (volume) => {
      const skuContent = {
        id: volume.id,
        title: `${book.title} - Volume ${volume.number}`,
        cover: volume.cover,
        description: book.translatedDescription ?? book.description,
        price: volume.price,
        stockQuantity: volume.stockQuantity,
        bookId: book.id,
      };

      await db("book_sku").insert(skuContent).onConflict(["id"]).merge();
    }),
  );
}

export async function syncronizeBooks(): Promise<void> {
  const books = LowDb.getInstance().data.books;
  console.log("Syncronizing books in PostgreSQL");
  await Promise.all(
    books.map(async (book) => {
      await createBook(book);
    }),
  );
  console.log("Books syncronized in PostgreSQL");
}
