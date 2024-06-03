import { ArrayOverlap, Between } from "typeorm";
import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderSelledSkus } from "../../../persistence/views/OrderSelledSkus";

interface Filters {
  categories: string[];
  authors: string[];
  startDate?: Date;
  endDate?: Date;
}

export default async function getOrdersToAnalysis(
  filters: Filters,
): Promise<OrderSelledSkus[]> {
  const { startDate, endDate, authors, categories } = filters;
  const dataSource = await DatabaseConnection.getDataSource();
  const orders = await dataSource.getRepository(OrderSelledSkus).find({
    where: {
      selledTimestamp:
        startDate != null && endDate != null
          ? Between(startDate, endDate)
          : undefined,
      authors: authors.length > 0 ? ArrayOverlap(authors) : undefined,
      categories: categories.length > 0 ? ArrayOverlap(categories) : undefined,
    },
    order: {
      selledTimestamp: "ASC",
    },
  });

  return orders;
}
