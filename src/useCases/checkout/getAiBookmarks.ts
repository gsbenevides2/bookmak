import { DatabaseConnection } from "../../dbConnection";
import { Order } from "../../models/Order";
import { BookmarkGenerator } from "../../utils/generateBookmarks";

export async function getAiBookmarks(orderId: string) {
  const dataSouce = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Ocorreu um erro interno ao buscar o pedido.");
  });
  const orderRepository = dataSouce.getRepository(Order);
  const order = await orderRepository.findOne({
    where: {
      id: orderId,
    },
    relations: ["items", "items.sku"],
  });
  if (order == null) {
    throw new Error("Esse pedido não foi encontrado.");
  }
  if (order.generatedBookmarks.length === 0) {
    if (order.items.length === 0) {
      throw new Error("Esse pedido não possui itens.");
    }
    const books = order.items.map((item) => ({
      name: item.sku.title,
      description: item.sku.description,
    }));
    const bookmarks = await BookmarkGenerator.generateBookmarks(books);
    order.generatedBookmarks = bookmarks;
    await orderRepository.save(order);
  }
  return order.generatedBookmarks;
}
