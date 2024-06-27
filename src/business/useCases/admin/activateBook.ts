import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Book } from "../../models/Book";
import { BookSku } from "../../models/BookSku";

export default async function activateBook(id: string): Promise<void> {
  const datasource = await DatabaseConnection.getDataSource();
  await datasource.transaction(async (transaction) => {
    const bookReponsitory = transaction.getRepository(Book);
    const bookSkuRepository = transaction.getRepository(BookSku);
    await bookReponsitory.update(
      {
        id,
      },
      {
        isActive: true,
      },
    );
    await bookSkuRepository.update(
      {
        book: {
          id,
        },
      },
      {
        isActive: true,
      },
    );
  });
}
