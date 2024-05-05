import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Order } from "../../models/Order";

interface Params {
  orderId: string;
  bookmarkText: string;
  bookmarkStyle: string;
}
export default async function saveBookmark(params: Params): Promise<void> {
  const { orderId, bookmarkText, bookmarkStyle } = params;
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = dataSource.getRepository(Order);
  const order = await orderRepository.findOne({ where: { id: orderId } });
  if (order == null) {
    throw new Error("O pedido não foi encontrado.");
  }
  order.bookmarkText = bookmarkText;
  order.bookmarkStyle = bookmarkStyle;
  await orderRepository.save(order);
}
