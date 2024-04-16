import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import recalculateOrderTotal from "./recalculateOrderTotal";

export default async function removeFromCart(
  orderItemId: string,
  orderId: string,
): Promise<void> {
  const datasource = await DatabaseConnection.getDataSource();
  const orderItemRepository = datasource.getRepository(OrderItem);
  const orderRepositroy = datasource.getRepository(Order);
  await orderItemRepository.delete({
    id: orderItemId,
  });
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
