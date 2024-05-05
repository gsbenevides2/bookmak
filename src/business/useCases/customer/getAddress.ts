import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Address } from "../../models/Address";

export default async function getAdddress(
  addressId: string,
  accountId: string,
): Promise<Address> {
  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Nâo foi possivel conectar ao banco de dados");
  });
  const address = await dataSource
    .getRepository(Address)
    .findOne({
      where: { id: addressId, customer: { id: accountId }, active: true },
    })
    .catch(() => {
      throw new Error("Nâo foi possivel buscar endereço");
    });
  if (address == null) {
    throw new Error("Endereço não encontrado");
  }
  return address;
}
