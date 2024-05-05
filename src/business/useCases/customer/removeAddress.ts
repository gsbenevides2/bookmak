import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Address } from "../../models/Address";
import { Customer } from "../../models/Customer";

export default async function removeAddress(
  addressId: string,
  accountId: string,
): Promise<void> {
  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const addressRepository = dataSource.getRepository(Address);
  const customerRepository = dataSource.getRepository(Customer);
  const customerData = await customerRepository
    .findOne({
      where: {
        id: accountId,
      },
      relations: ["billingAddress", "deliveryAddress"],
    })
    .catch(() => {
      throw new Error("Erro ao buscar cliente");
    });

  if (customerData == null) {
    throw new Error("Cliente não encontrado");
  }

  if (customerData.billingAddress?.id === addressId) {
    throw new Error(
      "Endereço de cobrança não pode ser deletado. Altere o endereço de cobrança antes de deletar",
    );
  }

  if (customerData.deliveryAddress?.id === addressId) {
    throw new Error(
      "Endereço de entrega não pode ser deletado. Altere o endereço de entrega antes de deletar",
    );
  }

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

  address.active = false;

  await addressRepository.save(address).catch(() => {
    throw new Error("Erro ao deletar endereço");
  });
}
