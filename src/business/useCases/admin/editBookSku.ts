import { DatabaseConnection } from "../../../persistence/dbConnection";
import { uploadBookCover } from "../../../utils/cloudStorage";
import { throwErrorIfFalse } from "../../../utils/errors";
import { BookSku } from "../../models/BookSku";

interface EditBookSkuData {
  bookSkuId: string;
  title: string;
  description: string;
  stockQuantity: number;
  cover: {
    filePath: string;
    type: string;
  };
}

export default async function editBookSku(
  data: EditBookSkuData,
): Promise<string> {
  throwErrorIfFalse(data.bookSkuId.length > 0, "BookSKu id is required");
  throwErrorIfFalse(data.title.length > 0, "Title is required");
  throwErrorIfFalse(data.description.length > 0, "Description is required");
  throwErrorIfFalse(data.cover.filePath.length > 0, "Cover is required");
  throwErrorIfFalse(data.cover.type.length > 0, "Cover type is required");
  throwErrorIfFalse(data.stockQuantity > 0, "Stock quantity is required");

  const coverPublicUrl = await uploadBookCover(
    data.cover.filePath,
    data.cover.type === "image/png" ? "png" : "jpg",
  );

  const datasource = await DatabaseConnection.getDataSource();
  const id = await datasource
    .transaction(async (manager) => {
      const bookSkuRepository = manager.getRepository(BookSku);

      const bookSKu = await bookSkuRepository.findOne({
        where: {
          id: data.bookSkuId,
        },
      });
      if (bookSKu == null) throw new Error("BookSku not found");

      bookSKu.title = data.title;
      bookSKu.description = data.description;
      bookSKu.cover = coverPublicUrl;
      bookSKu.stockQuantity = data.stockQuantity;

      await bookSkuRepository.save(bookSKu);
      return data.bookSkuId;
    })
    .catch((err) => {
      if (err instanceof Error)
        throw new Error(
          err.message ?? "An error occurred while editting bookSku",
        );
      throw new Error("An error occurred while editting bookSku");
    });

  return id;
}
