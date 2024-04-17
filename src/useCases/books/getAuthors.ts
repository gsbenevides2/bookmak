import { DatabaseConnection } from "../../dbConnection";
import { Author } from "../../models/Author";

export default async function getAuthors(): Promise<Author[]> {
  const dataSource = await DatabaseConnection.getDataSource();
  const authorRepository = dataSource.getRepository(Author);
  const authors = await authorRepository.find();
  return authors;
}
