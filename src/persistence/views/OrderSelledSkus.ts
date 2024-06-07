import { ViewColumn, ViewEntity } from "typeorm";
import { BookSku } from "../../business/models/BookSku";
import { OrderItem } from "../../business/models/OrderItem";
import { OrderExecuted } from "./OrderExecuted";

@ViewEntity({
  name: "order_selled_skus",
  expression: (connection) => {
    const sqlOfOrders = connection
      .createQueryBuilder()
      .from(OrderExecuted, "order_executed")
      .select("order_executed.order_id")
      .getSql();
    return connection
      .createQueryBuilder()
      .from(OrderItem, "order_item")
      .select("order_item.order_id", "order_id")
      .addSelect("order_item.sku_id", "sku_id")
      .addSelect("order_item.quantity", "quantity")
      .addSelect("order_item.unit_sell_price", "unit_sell_price")
      .addSelect("order_executed.timestamp", "selled_timestamp")
      .addSelect("book_sku.title", "title")
      .addSelect("book_sku.cover", "cover")
      .addSelect("book_sku.book_id", "book_id")
      .addSelect("book.title", "book_title")
      .addSelect("array_agg(distinct book_authors.author_id)", "authors")
      .addSelect(
        "array_agg(distinct book_categories.category_id)",
        "categories",
      )
      .innerJoin(
        OrderExecuted,
        "order_executed",
        "order_item.order_id = order_executed.order_id",
      )
      .innerJoin(BookSku, "book_sku", "order_item.sku_id = book_sku.id")
      .innerJoin(
        "book_authors",
        "book_authors",
        "book_authors.book_id = book_sku.book_id",
      )
      .innerJoin(
        "book_categories",
        "book_categories",
        "book_categories.book_id = book_sku.book_id",
      )
      .innerJoin("book", "book", "book.id = book_sku.book_id")
      .where(`order_item.order_id IN (${sqlOfOrders})`)
      .groupBy("order_item.order_id")
      .addGroupBy("order_item.sku_id")
      .addGroupBy("order_item.quantity")
      .addGroupBy("order_item.unit_sell_price")
      .addGroupBy("order_executed.timestamp")
      .addGroupBy("book_sku.title")
      .addGroupBy("book_sku.cover")
      .addGroupBy("book_sku.book_id")
      .addGroupBy("book.title");
  },
})
export class OrderSelledSkus {
  @ViewColumn({ name: "sku_id" })
  skuId!: string;

  @ViewColumn()
  quantity!: number;

  @ViewColumn({ name: "order_id" })
  orderId!: string;

  @ViewColumn({ name: "unit_sell_price" })
  unitSellPrice!: number;

  @ViewColumn({ name: "selled_timestamp" })
  selledTimestamp!: Date;

  @ViewColumn()
  title!: string;

  @ViewColumn()
  cover!: string;

  @ViewColumn()
  authors!: string[];

  @ViewColumn()
  categories!: string[];

  @ViewColumn({ name: "book_id" })
  bookId!: string;

  @ViewColumn({ name: "book_title" })
  bookTitle!: string;
}
