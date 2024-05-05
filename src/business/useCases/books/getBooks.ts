import { DatabaseConnection } from "../../../persistence/dbConnection";
import { type Author } from "../../models/Author";
import { BookSku } from "../../models/BookSku";

export interface ReturnGetBooks {
  cover: string;
  title: string;
  authors: Author[];
  description: string;
  price: number;
  id: string;
}

interface Params {
  categoryId?: string;
  authorId?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}

export default async function getBooks(
  params: Params,
): Promise<ReturnGetBooks[]> {
  const dataSource = await DatabaseConnection.getDataSource();
  const skuRepository = dataSource.getRepository(BookSku);
  const skuQuery = skuRepository.createQueryBuilder("sku");
  skuQuery.leftJoinAndSelect("sku.book", "book");
  skuQuery.leftJoinAndSelect("book.authors", "authors");
  skuQuery.leftJoinAndSelect("book.categories", "categories");

  if (params.categoryId != null) {
    skuQuery.andWhere("categories.id = :categoryId", {
      categoryId: params.categoryId,
    });
  }
  if (params.authorId != null) {
    skuQuery.andWhere("authors.id = :authorId", { authorId: params.authorId });
  }

  if (params.searchQuery != null) {
    skuQuery.andWhere(
      "(sku.title ILIKE :searchQuery OR sku.description ILIKE :searchQuery)",
      {
        searchQuery: `%${params.searchQuery}%`,
      },
    );
  }

  if (params.minPrice != null) {
    skuQuery.andWhere("sku.price >= :minPrice", { minPrice: params.minPrice });
  }
  if (params.maxPrice != null) {
    skuQuery.andWhere("sku.price <= :maxPrice", { maxPrice: params.maxPrice });
  }

  const skus = await skuQuery.getMany();
  return skus.map((sku) => {
    return {
      id: sku.id,
      title: sku.title,
      price: sku.price,
      description: sku.description,
      cover: sku.cover,
      authors: sku.book.authors,
    };
  });
}
