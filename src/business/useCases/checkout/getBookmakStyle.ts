import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Order } from "../../models/Order";

export default async function getBookmakStyle(
  orderId: string,
): Promise<string[]> {
  const dataSouce = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Ocorreu um erro interno ao buscar o pedido.");
  });
  const orderRepository = dataSouce.getRepository(Order);
  const order = await orderRepository.findOne({
    where: {
      id: orderId,
    },
    relations: {
      items: {
        sku: {
          book: true,
        },
      },
    },
    select: ["items.sku.book.bookmarkStyle"],
  });
  if (order == null) {
    throw new Error("Esse pedido não foi encontrado.");
  }
  return order.items
    .map((item) => item.sku.book.bookmarkStyle)
    .filter(Boolean) as string[];
}
