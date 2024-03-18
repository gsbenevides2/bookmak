import { DatabaseConnection } from "../../dbConnection";
import { Address } from "../../models/Address";

export default async function removeAddress(
  addressId: string,
  accountId: string,
): Promise<void> {
  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const addressRepository = dataSource.getRepository(Address);

  const address = await addressRepository
    .findOne({
      where: {
        id: addressId,
        customer: {
          id: accountId,
        },
      },
    })
    .catch(() => {
      throw new Error("Erro ao buscar endereço");
    });

  if (address == null) {
    throw new Error("Endereço não encontrado");
  }

  await addressRepository.delete(addressId).catch(() => {
    throw new Error("Erro ao deletar endereço");
  });
}
