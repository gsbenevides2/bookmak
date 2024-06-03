import { ViewColumn, ViewEntity } from "typeorm";
import { OrderUpdate } from "../../business/models/OrderUpdate";

@ViewEntity({
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .from(OrderUpdate, "orderUpdate")
      .select("orderUpdate.id", "id")
      .distinctOn(["orderUpdate.orderId"])
      .addSelect("orderUpdate.status", "status")
      .addSelect("orderUpdate.orderId", "orderId")
      .addSelect("orderUpdate.timestamp", "timestamp")
      .orderBy("orderUpdate.orderId", "DESC")
      .addOrderBy("orderUpdate.timestamp", "DESC"),
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

  @ViewColumn()
  orderId!: string;
}
