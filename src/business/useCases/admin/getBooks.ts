import { ILike } from "typeorm";
import { validate } from "uuid";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Book } from "../../models/Book";
export default async function getBooks(
  searchQuery: string | undefined,
): Promise<Book[]> {
  const trimmedSearchQuery = searchQuery?.trim();
  const datasource = await DatabaseConnection.getDataSource();
  const booksRepository = datasource.getRepository(Book);
  const query = `%${trimmedSearchQuery}%`;
  const isUUID = validate(trimmedSearchQuery ?? "");
  const books = await booksRepository.find({
    where:
      trimmedSearchQuery !== undefined && trimmedSearchQuery.length > 0
        ? [
            {
              title: ILike(query),
            },
            {
              description: ILike(query),
            },
            {
              id: isUUID ? trimmedSearchQuery : undefined,
            },

            {
              categories: [
                {
                  id: isUUID ? trimmedSearchQuery : undefined,
                },
              ],
            },
            {
              categories: [
                {
                  name: ILike(query),
                },
              ],
            },
            {
              authors: [
                {
                  id: isUUID ? trimmedSearchQuery : undefined,
                },
              ],
            },
            {
              authors: [
                {
                  name: ILike(query),
                },
              ],
            },
            {
              skus: [
                {
                  id: isUUID ? trimmedSearchQuery : undefined,
                },
              ],
            },
            {
              skus: [
                {
                  title: ILike(query),
                },
              ],
            },
            {
              skus: [
                {
                  description: ILike(query),
                },
              ],
            },
          ]
        : undefined,
    relations: {
      authors: true,
      categories: true,
      skus: true,
    },
  });
  return books;
}
