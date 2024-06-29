import { DatabaseConnection } from "../../../persistence/dbConnection";
import { uploadBookCover } from "../../../utils/cloudStorage";
import { throwErrorIfFalse } from "../../../utils/errors";
import { Book } from "../../models/Book";
import { BookSku } from "../../models/BookSku";

interface CreateBookSkuData {
  bookId: string;
  title: string;
  description: string;
  cover: {
    filePath: string;
    type: string;
  };
  stockQuantity: number;
  price: number;
}

export default async function createBookSku(
  data: CreateBookSkuData,
): Promise<string> {
  throwErrorIfFalse(data.title.length > 0, "Title is required");
  throwErrorIfFalse(data.description.length > 0, "Description is required");
  throwErrorIfFalse(data.cover.filePath.length > 0, "Cover is required");
  throwErrorIfFalse(data.cover.type.length > 0, "Cover type is required");
  throwErrorIfFalse(data.stockQuantity > 0, "Stock quantity is required");
  throwErrorIfFalse(data.bookId.length > 0, "Book ID is required");

  const coverPublicUrl = await uploadBookCover(
    data.cover.filePath,
    data.cover.type === "image/png" ? "png" : "jpg",
  );

  const datasource = await DatabaseConnection.getDataSource();
  const id = await datasource
    .transaction(async (manager) => {
      const bookRepository = manager.getRepository(Book);
      const bookSkuRepository = manager.getRepository(BookSku);

      const book = await bookRepository.findOne({
        where: { id: data.bookId },
      });

      if (!book) {
        throw new Error("Book not found");
      }

      const bookSku = new BookSku();
      bookSku.book = book;
      bookSku.title = data.title;
      bookSku.description = data.description;
      bookSku.cover = coverPublicUrl;
      bookSku.stockQuantity = data.stockQuantity;
      bookSku.price = data.price;

      const newBookSku = await bookSkuRepository.save(bookSku);
      return newBookSku.id;
    })
    .catch((err) => {
      if (err instanceof Error)
        throw new Error(
          err.message ?? "An error occurred while creating book sku",
        );
      throw new Error("An error occurred while creating book sku");
    });

  return id;
}
