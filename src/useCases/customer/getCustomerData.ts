import { DatabaseConnection } from "../../dbConnection";
import { Customer } from "../../models/Customer";

interface CustomerReturn {
  name: string;
  email: string;
  cpf: string;
  dateOfBirth: Date;
  gender: string;
  phoneAreaCode: string;
  phoneNumber: string;
  phoneType: string;
}

export async function getCustomerData(
  customerId: string,
): Promise<CustomerReturn | null> {
  const dataSource = await DatabaseConnection.getDataSource();
  const account = await dataSource.getRepository(Customer).findOne({
    where: {
      id: customerId,
    },
    select: [
      "name",
      "email",
      "cpf",
      "dateOfBirth",
      "gender",
      "phoneAreaCode",
      "phoneNumber",
      "phoneType",
    ],
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
  };
}
