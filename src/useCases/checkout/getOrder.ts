import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";

export async function getOrder(orderId: string): Promise<Order> {
  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error(
      "Ocorreu um erro interno ao buscar o pedido. Code: DataConnectionError",
    );
  });
  const orderRepository = datasource.getRepository(Order);
  const order = await orderRepository
    .findOne({
      where: { id: orderId },
      relations: [
        "customer",
        "items",
        "items.sku",
        "items.sku.book",
        "items.sku.book.authors",
        "billingAddress",
        "shippingAddress",
      ],
    })
    .catch(() => {
      throw new Error(
        "Ocorreu um erro interno ao buscar o pedido. Code: OrderDbRequestError",
      );
    });
  if (!order) {
    throw new Error("Pedido não encontrado.");
  }
  return order;
}
