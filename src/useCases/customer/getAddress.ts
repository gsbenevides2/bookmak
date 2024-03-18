import { DatabaseConnection } from "../../dbConnection";
import { Address } from "../../models/Address";

interface GetAddressReturn {
  id: string;
  addressName: string;
  residenceType: string;
  streetType: string;
  street: string;
  number: string;
  district: string;
  zip: string;
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
    addressName: address.nickname,
    residenceType: address.houseType,
    streetType: address.streetType,
    street: address.street,
    number: address.number,
    district: address.district,
    zip: address.zipCode,
    city: address.city,
    state: address.state,
    country: address.country,
    observations: address.observations,
  };
}
