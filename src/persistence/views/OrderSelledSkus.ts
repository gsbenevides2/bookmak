import { ViewColumn, ViewEntity } from "typeorm";
import { BookSku } from "../../business/models/BookSku";
import { OrderItem } from "../../business/models/OrderItem";
import { OrderExecuted } from "./OrderExecuted";

@ViewEntity({
  expression: (connection) => {
    const sqlOfOrders = connection
      .createQueryBuilder()
      .from(OrderExecuted, "orderExecuted")
      .select("orderExecuted.orderId")
      .getSql();
    return connection
      .createQueryBuilder()
      .from(OrderItem, "orderItem")
      .select("orderItem.orderId", "orderId")
      .addSelect("orderItem.skuId", "skuId")
      .addSelect("orderItem.quantity", "quantity")
      .addSelect("orderItem.unitSellPrice", "unitSellPrice")
      .addSelect("orderExecuted.timestamp", "selledTimestamp")
      .addSelect("bookSku.title", "title")
      .addSelect("bookSku.cover", "cover")
      .addSelect("array_agg(distinct bookAuthors.authorId)", "authors")
      .addSelect("array_agg(distinct bookCategories.categoryId)", "categories")
      .innerJoin(
        OrderExecuted,
        "orderExecuted",
        "orderItem.orderId = orderExecuted.orderId",
      )
      .innerJoin(BookSku, "bookSku", "orderItem.skuId = bookSku.id")
      .innerJoin(
        "book_authors",
        "bookAuthors",
        "bookAuthors.bookId = bookSku.bookId",
      )
      .innerJoin(
        "book_categories",
        "bookCategories",
        "bookCategories.bookId = bookSku.bookId",
      )
      .where(`orderItem.orderId IN (${sqlOfOrders})`)
      .groupBy(
        "orderItem.orderId, orderItem.skuId, orderItem.quantity, orderItem.unitSellPrice, orderExecuted.timestamp, bookSku.title, bookSku.cover",
      );
  },
})
export class OrderSelledSkus {
  @ViewColumn()
  skuId!: string;

  @ViewColumn()
  quantity!: number;

  @ViewColumn()
  orderId!: string;

  @ViewColumn()
  unitSellPrice!: number;

  @ViewColumn()
  selledTimestamp!: Date;

  @ViewColumn()
  title!: string;

  @ViewColumn()
  cover!: string;

  @ViewColumn()
  authors!: string[];

  @ViewColumn()
  categories!: string[];
}
