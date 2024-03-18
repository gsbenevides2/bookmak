import { DatabaseConnection } from "../../dbConnection";
import { Address } from "../../models/Address";

interface GetAddressesResponse {
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

export default async function getAddresses(
  customerId: string,
): Promise<GetAddressesResponse[]> {
  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Nâo foi possivel conectar ao banco de dados");
  });

  const addresses = await datasource
    .getRepository(Address)
    .find({
      where: { customer: { id: customerId } },
    })
    .catch(() => {
      throw new Error("Nâo foi possivel buscar endereços");
    });

  return addresses.map((address) => {
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
  });
}
