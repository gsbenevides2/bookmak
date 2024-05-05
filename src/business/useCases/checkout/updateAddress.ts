import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Address } from "../../models/Address";
import { Customer } from "../../models/Customer";
import { Order } from "../../models/Order";
import { shippingSimulator } from "../../../utils/shippingSimulator";
import recalculateOrderTotal from "./recalculateOrderTotal";

interface Params {
  orderId: string;
  customerId: string;
  shippingAddressId: string;
  billingAddressId: string;
}
export default async function updateAddress(params: Params): Promise<void> {
  const { shippingAddressId, orderId, billingAddressId, customerId } = params;
  const dataSource = await DatabaseConnection.getDataSource();
  const orderRepository = dataSource.getRepository(Order);
  const addressRepository = dataSource.getRepository(Address);
  const customerRespository = dataSource.getRepository(Customer);

  const order = await orderRepository.findOne({ where: { id: orderId } });
  if (order == null) {
    throw new Error("O pedido não foi encontrado.");
  }
  const billingAddress = await addressRepository.findOne({
    where: { id: billingAddressId, customer: { id: customerId } },
  });

  if (billingAddress == null) {
    throw new Error("Endereço de cobrança não encontrado.");
  }
  const shippingAddress = await addressRepository.findOne({
    where: { id: shippingAddressId, customer: { id: customerId } },
  });
  if (shippingAddress == null) {
    throw new Error("Endereço de entrega não encontrado.");
  }
  const customer = await customerRespository.findOne({
    where: { id: customerId },
  });
  if (customer == null) {
    throw new Error("Cliente não encontrado.");
  }
  order.billingAddress = billingAddress;
  order.shippingAddress = shippingAddress;
  order.shippingPrice = shippingSimulator();
  order.customer = customer;
  await orderRepository.save(order);
  await recalculateOrderTotal(orderId);
}
