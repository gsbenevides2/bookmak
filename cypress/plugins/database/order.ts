import { getConnection } from "./getConnnection";
/// <reference path="./typings.d.ts" />

export async function createOrder(
  data: DatabaseCreateOrderData,
): Promise<null> {
  const knex = getConnection();
  await knex<OrderTable>("order").insert(data.orders);
  await knex<OrderItemTable>("order_item").insert(data.orderItem);
  await knex<OrderPaymentMethodTable>("order_payment_method").insert(
    data.orderPaymentMethod,
  );
  await knex<OrderUpdateTable>("order_update").insert(data.orderUpdate);
  await knex.destroy();
  return null;
}
