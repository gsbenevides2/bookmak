import { DatabaseConnection } from "../../dbConnection";
import { Category } from "../../models/Category";

export default async function getCategories(): Promise<Category[]> {
  const dataSource = await DatabaseConnection.getDataSource();
  const categoryRepository = dataSource.getRepository(Category);
  const categories = await categoryRepository.find();
  return categories;
}
