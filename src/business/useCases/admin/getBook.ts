import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Book } from "../../models/Book";

export default async function getBook(id: string): Promise<Book | null> {
  const datasource = await DatabaseConnection.getDataSource();
  const bookRepository = datasource.getRepository(Book);
  const book = await bookRepository.findOne({
    where: {
      id,
    },
    relations: {
      authors: true,
      categories: true,
    },
  });
  return book;
}
