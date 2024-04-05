import { DatabaseConnection } from "../../dbConnection";
import { Address } from "../../models/Address";

export default async function getAddresses(
  customerId: string,
): Promise<Address[]> {
  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Nâo foi possivel conectar ao banco de dados");
  });

  const addresses = await datasource
    .getRepository(Address)
    .find({
      where: { customer: { id: customerId }, active: true },
    })
    .catch(() => {
      throw new Error("Nâo foi possivel buscar endereços");
    });

  return addresses;
}
