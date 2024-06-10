import { DatabaseConnection } from "../../../persistence/dbConnection";
import { promiseOrNull } from "../../../utils/promise";
import { Order } from "../../models/Order";
import calculateShippingForOrder from "../shipping/calculateShipping";

export default async function recalculateOrderTotal(
  orderId: string,
): Promise<void> {
  const datasource = await DatabaseConnection.getDataSource();

  const orderRepository = datasource.getRepository(Order);

  const order = await orderRepository.findOne({
    where: { id: orderId },
    relations: {
      items: {
        sku: true,
      },
      usedPaymentMethods: {
        coupon: true,
      },
      shippingAddress: true,
    },
  });

  if (order === null) {
    throw new Error("Order not found");
  }

  const newItems = order.items.map((item) => {
    return {
      ...item,
      unitSellPrice: item.sku.price,
    };
  });

  const discounts = order.usedPaymentMethods.reduce((acc, paymentMethod) => {
    return acc + (paymentMethod.coupon?.value ?? 0);
  }, 0);

  order.items = newItems;

  const subtotal = order.items.reduce((acc, item) => {
    return acc + item.unitSellPrice * item.quantity;
  }, 0);

  order.discounts = discounts;
  order.subtotal = subtotal;
  if (order.shippingAddress?.zipCode != null) {
    const priceOrNull = await promiseOrNull(
      calculateShippingForOrder(
        order.shippingAddress.zipCode,
        order.items.reduce((acc, item) => acc + item.quantity, 0),
        order.subtotal,
      ),
    );
    if (priceOrNull !== null) {
      order.shippingPrice = priceOrNull;
      order.shippingIsAvailable = true;
    } else {
      order.shippingPrice = 0;
      order.shippingIsAvailable = false;
    }
  }

  order.totalPrice = subtotal - discounts + order.shippingPrice;
  await orderRepository.save(order);
}
