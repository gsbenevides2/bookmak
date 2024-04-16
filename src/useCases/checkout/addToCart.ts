import { DatabaseConnection } from "../../dbConnection";
import { BookSku } from "../../models/BookSku";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import recalculateOrderTotal from "./recalculateOrderTotal";
import updateQuantity from "./updateQuantity";

export default async function addToCart(
  skuId: string,
  orderId: string,
  quantity: number,
): Promise<void> {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  const datasource = await DatabaseConnection.getDataSource();
  const skuRepository = datasource.getRepository(BookSku);
  const orderRepositroy = datasource.getRepository(Order);
  const orderItemRepository = datasource.getRepository(OrderItem);

  const sku = await skuRepository.findOne({
    where: { id: skuId },
  });

  if (sku === null) {
    throw new Error("Sku not found");
  }

  const order = await orderRepositroy.findOne({
    where: { id: orderId },
  });

  if (order === null) {
    throw new Error("Order not found");
  }

  const existingOrderItem = await orderItemRepository.findOne({
    where: { sku, order },
  });

  if (existingOrderItem != null) {
    await updateQuantity(
      existingOrderItem.id,
      existingOrderItem.quantity + quantity,
      orderId,
    );
    await recalculateOrderTotal(orderId);
    return;
  }

  const orderItem = new OrderItem();
  orderItem.sku = sku;
  orderItem.order = order;
  orderItem.quantity = quantity;
  orderItem.unitSellPrice = sku.price;
  await orderItemRepository.save(orderItem);
  await orderRepositroy.update(
    {
      id: orderId,
    },
    {
      generatedBookmarks: [],
    },
  );
  await recalculateOrderTotal(orderId);
}
