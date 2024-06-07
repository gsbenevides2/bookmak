import { ViewColumn, ViewEntity } from "typeorm";
import { OrderUpdate } from "../../business/models/OrderUpdate";

@ViewEntity({
  name: "last_updates",
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .from(OrderUpdate, "order_update")
      .select("order_update.id", "id")
      .distinctOn(["order_update.order_id"])
      .addSelect("order_update.status", "status")
      .addSelect("order_update.order_id", "order_id")
      .addSelect("order_update.timestamp", "timestamp")
      .orderBy("order_update.order_id", "DESC")
      .addOrderBy("order_update.timestamp", "DESC"),
})
export class LastUpdates {
  @ViewColumn()
  id!: string;

  @ViewColumn()
  status!: string;

  @ViewColumn()
  observations!: string;

  @ViewColumn()
  timestamp!: Date;

  @ViewColumn({ name: "order_id" })
  orderId!: string;
}
