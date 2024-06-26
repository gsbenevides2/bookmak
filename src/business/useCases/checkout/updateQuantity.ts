import { DatabaseConnection } from "../../../persistence/dbConnection";
import { OrderItem } from "../../models/OrderItem";
import recalculateOrderTotal from "./recalculateOrderTotal";
import removeFromCart from "./removeFromCart";

export default async function updateQuantity(
  orderItemId: string,
  quantity: number,
  orderId: string,
): Promise<void> {
  if (quantity < 0) {
    throw new Error("Quantity must be greater than 0");
  }
  if (quantity === 0) {
    await removeFromCart(orderItemId, orderId);
    return;
  }
  const datasource = await DatabaseConnection.getDataSource();
  const orderItemRepository = datasource.getRepository(OrderItem);
  await orderItemRepository.update(
    {
      id: orderItemId,
    },
    {
      quantity,
    },
  );
  await recalculateOrderTotal(orderId);
}
