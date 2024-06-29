import { DatabaseConnection } from "../../../persistence/dbConnection";
import { BookSku } from "../../models/BookSku";

export default async function getBookSku(id: string): Promise<BookSku | null> {
  const datasource = await DatabaseConnection.getDataSource();
  const bookSkuRepository = datasource.getRepository(BookSku);
  const sku = await bookSkuRepository.findOne({
    where: {
      id,
    },
  });
  return sku;
}
