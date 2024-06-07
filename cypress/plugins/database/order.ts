import { getConnection } from "./getConnnection";
/// <reference path="./typings.d.ts" />

export async function createOrder(
  data: DatabaseCreateOrderData,
): Promise<null> {
  const knex = getConnection();

  if (data.orders.length > 0) {
    const orders: OrderTable[] = data.orders.map((order) => {
      const {
        bookmarkStyle,
        bookmarkText,
        generatedBookmarks,
        billingAddressId,
        customerId,
        shippingAddressId,
        shippingPrice,
        totalPrice,
        ...rest
      } = order;
      return {
        ...rest,
        bookmark_style: bookmarkStyle,
        bookmark_text: bookmarkText,
        generated_bookmarks: generatedBookmarks,
        billing_address_id: billingAddressId,
        customer_id: customerId,
        shipping_address_id: shippingAddressId,
        shipping_price: shippingPrice,
        total_price: totalPrice,
      };
    });
    await knex<OrderTable>("order").insert(orders);
  }

  if (data.orderItem.length > 0) {
    const orderItems: OrderItemTable[] = data.orderItem.map((orderItem) => {
      const { orderId, unitSellPrice, skuId, changeQuantity, ...rest } =
        orderItem;
      return {
        ...rest,
        order_id: orderId,
        unit_sell_price: unitSellPrice,
        change_quantity: changeQuantity,
        sku_id: skuId,
      };
    });
    await knex<OrderItemTable>("order_item").insert(orderItems);
  }

  if (data.orderPaymentMethod.length > 0) {
    const orderPaymentMethods: OrderPaymentMethodTable[] =
      data.orderPaymentMethod.map((orderPaymentMethod) => {
        const { orderId, cardId, couponId, ...rest } = orderPaymentMethod;
        return {
          ...rest,
          order_id: orderId,
          card_id: cardId,
          coupon_id: couponId,
        };
      });
    await knex<OrderPaymentMethodTable>("order_payment_method").insert(
      orderPaymentMethods,
    );
  }

  if (data.orderUpdate.length > 0) {
    const orderUpdates: OrderUpdateTable[] = data.orderUpdate.map(
      (orderUpdate) => {
        const { orderId, status, ...rest } = orderUpdate;
        return {
          ...rest,
          order_id: orderId,
          order_status: status,
        };
      },
    );
    await knex<OrderUpdateTable>("order_update").insert(orderUpdates);
  }

  await knex.destroy();
  return null;
}
