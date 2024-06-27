import { DatabaseConnection } from "../../../persistence/dbConnection";
import { BookSku } from "../../models/BookSku";

export default async function disableSku(id: string): Promise<void> {
  const datasource = await DatabaseConnection.getDataSource();
  const bookSkuRepository = datasource.getRepository(BookSku);
  await bookSkuRepository.update(
    {
      id,
    },
    {
      isActive: false,
    },
  );
}
