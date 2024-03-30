import { DatabaseConnection } from "../../dbConnection";
import { Address } from "../../models/Address";

interface GetAddressReturn {
  id: string;
  nickname: string;
  houseType: string;
  streetType: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  observations: string | undefined;
}

export default async function getAdddress(
  addressId: string,
  accountId: string,
): Promise<GetAddressReturn> {
  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Nâo foi possivel conectar ao banco de dados");
  });
  const address = await dataSource
    .getRepository(Address)
    .findOne({
      where: { id: addressId, customer: { id: accountId } },
    })
    .catch(() => {
      throw new Error("Nâo foi possivel buscar endereço");
    });
  if (address == null) {
    throw new Error("Endereço não encontrado");
  }
  return {
    id: address.id,
    nickname: address.nickname,
    houseType: address.houseType,
    streetType: address.streetType,
    street: address.street,
    number: address.number,
    district: address.district,
    zipCode: address.zipCode,
    city: address.city,
    state: address.state,
    country: address.country,
    observations: address.observations,
  };
}
