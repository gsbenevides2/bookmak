import { ViewColumn, ViewEntity } from "typeorm";
import { OrderStatus, OrderUpdate } from "../../business/models/OrderUpdate";

@ViewEntity({
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .from(OrderUpdate, "orderUpdate")
      .select("orderUpdate.orderId", "orderId")
      .distinct(true)
      .addSelect("orderUpdate.timestamp", "timestamp")
      .where(`orderUpdate.status = '${OrderStatus.PROCESSING}'`),
})
export class OrderExecuted {
  @ViewColumn()
  orderId!: string;

  @ViewColumn()
  timestamp!: Date;
}
