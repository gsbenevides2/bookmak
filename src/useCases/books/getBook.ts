import { DatabaseConnection } from "../../dbConnection";
import { type Author } from "../../models/Author";
import { BookSku } from "../../models/BookSku";
import { type Category } from "../../models/Category";

export interface ReturnGetBook {
  cover: string;
  title: string;
  authors: Author[];
  categories: Category[];
  description: string;
  price: number;
  id: string;
}

export default async function getBookById(
  bookId: string,
): Promise<ReturnGetBook | null> {
  const dataSource = await DatabaseConnection.getDataSource();
  const skuRepository = dataSource.getRepository(BookSku);
  const sku = await skuRepository.findOne({
    where: { id: bookId },
    relations: ["book", "book.authors", "book.categories"],
  });

  if (sku == null) return null;

  return {
    cover: sku.cover,
    title: sku.title,
    authors: sku.book.authors,
    categories: sku.book.categories,
    description: sku.description,
    price: sku.price,
    id: sku.id,
  };
}
