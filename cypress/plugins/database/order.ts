import { getConnection } from "./getConnnection";
/// <reference path="./typings.d.ts" />

export async function createOrder(
  data: DatabaseCreateOrderData,
): Promise<null> {
  const knex = getConnection();
  if (data.orders.length > 0)
    await knex<OrderTable>("order").insert(data.orders);
  if (data.orderItem.length > 0)
    await knex<OrderItemTable>("order_item").insert(data.orderItem);
  if (data.orderPaymentMethod.length > 0)
    await knex<OrderPaymentMethodTable>("order_payment_method").insert(
      data.orderPaymentMethod,
    );
  if (data.orderUpdate.length > 0)
    await knex<OrderUpdateTable>("order_update").insert(data.orderUpdate);
  await knex.destroy();
  return null;
}
