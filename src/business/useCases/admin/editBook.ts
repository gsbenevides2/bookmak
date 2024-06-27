import { In } from "typeorm";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { uploadBookCover, uploadBookmark } from "../../../utils/cloudStorage";
import { throwErrorIfFalse } from "../../../utils/errors";
import { Author } from "../../models/Author";
import { Book } from "../../models/Book";
import { Category } from "../../models/Category";

interface EditBookData {
  bookId: string;
  title: string;
  authors: string[];
  categories: string[];
  description: string;
  cover: {
    filePath: string;
    type: string;
  };
  bookmarkStyle: {
    filePath: string;
    type: string;
  };
}

export default async function editBook(data: EditBookData): Promise<string> {
  throwErrorIfFalse(data.bookId.length > 0, "Book id is required");
  throwErrorIfFalse(data.title.length > 0, "Title is required");
  throwErrorIfFalse(data.authors.length > 0, "Authors is required");
  throwErrorIfFalse(data.categories.length > 0, "Categories is required");
  throwErrorIfFalse(data.description.length > 0, "Description is required");
  throwErrorIfFalse(data.cover.filePath.length > 0, "Cover is required");
  throwErrorIfFalse(data.cover.type.length > 0, "Cover type is required");
  throwErrorIfFalse(
    data.bookmarkStyle.filePath.length > 0,
    "Bookmark style is required",
  );
  throwErrorIfFalse(
    data.bookmarkStyle.type.length > 0,
    "Bookmark style type is required",
  );

  const coverPublicUrl = await uploadBookCover(
    data.cover.filePath,
    data.cover.type === "image/png" ? "png" : "jpg",
  );

  const bookmarkStylePublicUrl = await uploadBookmark(
    data.bookmarkStyle.filePath,
    data.bookmarkStyle.type === "image/png" ? "png" : "jpg",
  );

  console.log(coverPublicUrl, bookmarkStylePublicUrl);

  const datasource = await DatabaseConnection.getDataSource();
  const id = await datasource
    .transaction(async (manager) => {
      const bookRepository = manager.getRepository(Book);
      const categoryRepository = manager.getRepository(Category);
      const authorRepository = manager.getRepository(Author);

      const authorsInDb = await authorRepository.find({
        where: {
          name: In(data.authors),
        },
      });

      const authorsToCreate = data.authors.filter(
        (authorName) =>
          authorsInDb.findIndex((author) => author.name === authorName) === -1,
      );
      const authorsCreated = await authorRepository.save(
        authorsToCreate.map((authorName) => ({ name: authorName })),
      );

      const categoriesInDb = await categoryRepository.find({
        where: {
          name: In(data.categories),
        },
      });

      const categoriesToCreate = data.categories.filter(
        (categoryName) =>
          categoriesInDb.findIndex(
            (category) => category.name === categoryName,
          ) === -1,
      );

      const categoriesCreated = await categoryRepository.save(
        categoriesToCreate.map((categoryName) => ({ name: categoryName })),
      );

      const book = await bookRepository.findOne({
        where: {
          id: data.bookId,
        },
      });
      if (book == null) throw new Error("Book not found");

      book.title = data.title;
      book.authors = [...authorsInDb, ...authorsCreated];
      book.categories = [...categoriesInDb, ...categoriesCreated];
      book.description = data.description;
      book.cover = coverPublicUrl;
      book.bookmarkStyle = bookmarkStylePublicUrl;

      const receivedBook = await bookRepository.save(book);
      return receivedBook.id;
    })
    .catch((err) => {
      if (err instanceof Error)
        throw new Error(err.message ?? "An error occurred while creating book");
      throw new Error("An error occurred while creating book");
    });

  return id;
}
