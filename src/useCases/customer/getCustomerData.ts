import { DatabaseConnection } from "../../dbConnection";
import { Customer } from "../../models/Customer";

export async function getCustomerData(
  customerId: string,
): Promise<Customer | null> {
  const dataSource = await DatabaseConnection.getDataSource();
  const account = await dataSource.getRepository(Customer).findOne({
    where: {
      id: customerId,
      addresses: { active: true },
    },
    relations: ["addresses", "billingAddress", "deliveryAddress"],
  });
  if (account == null) {
    return null;
  }
  return account;
}
