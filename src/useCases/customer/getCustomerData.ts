import { DatabaseConnection } from "../../dbConnection";
import { Customer } from "../../models/Customer";

interface AddressReturn {
  nickname: string;
  id: string;
}

interface CustomerReturn {
  name: string;
  email: string;
  cpf: string;
  dateOfBirth: Date;
  gender: string;
  phoneAreaCode: string;
  phoneNumber: string;
  phoneType: string;
  addresses: AddressReturn[];
  billingAddress: AddressReturn;
  deliveryAddress: AddressReturn;
}

export async function getCustomerData(
  customerId: string,
): Promise<CustomerReturn | null> {
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
  return {
    name: account.name,
    email: account.email,
    cpf: account.cpf,
    dateOfBirth: account.dateOfBirth,
    phoneAreaCode: account.phoneAreaCode,
    phoneNumber: account.phoneNumber,
    phoneType: account.phoneType,
    gender: account.gender,
    addresses: account.addresses.map((address) => ({
      nickname: address.nickname,
      id: address.id,
    })),
    billingAddress: {
      nickname: account.billingAddress.nickname,
      id: account.billingAddress.id,
    },
    deliveryAddress: {
      nickname: account.deliveryAddress.nickname,
      id: account.deliveryAddress.id,
    },
  };
}
