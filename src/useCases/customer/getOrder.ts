import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export async function getOrder(orderId: string) {
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = await dataSource.getRepository(Order);
  return orderRepository.findOne({
    where: {
      id: orderId,
    },
    order: {
      updates: {
        timestamp: "DESC",
      },
    },
    relations: [
      "updates",
      "customer",
      "shippingAddress",
      "usedPaymentMethods",
      "billingAddress",
      "items",
      "items.sku",
      "items.sku.book",
      "items.sku.book.authors",
      "usedPaymentMethods.card",
    ],
  });
}
