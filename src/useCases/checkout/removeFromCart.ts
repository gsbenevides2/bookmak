import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import recalculateOrderTotal from "./recalculateOrderTotal";

export default async function removeFromCart(
  orderItemId: string,
  orderId: string,
) {
  const datasource = await DatabaseConnection.getDataSource();
  const orderItemRepository = await datasource.getRepository(OrderItem);
  const orderRepositroy = await datasource.getRepository(Order);
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
