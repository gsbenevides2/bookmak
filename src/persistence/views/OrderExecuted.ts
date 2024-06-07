import { ViewColumn, ViewEntity } from "typeorm";
import { OrderStatus, OrderUpdate } from "../../business/models/OrderUpdate";

@ViewEntity({
  name: "order_executed",
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .from(OrderUpdate, "order_update")
      .select("order_update.order_id", "order_id")
      .distinct(true)
      .addSelect("order_update.timestamp", "timestamp")
      .where(`order_update.status = '${OrderStatus.PROCESSING}'`),
})
export class OrderExecuted {
  @ViewColumn({ name: "order_id" })
  orderId!: string;

  @ViewColumn()
  timestamp!: Date;
}
