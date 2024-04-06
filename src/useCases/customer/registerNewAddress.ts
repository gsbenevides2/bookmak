import { DatabaseConnection } from "../../dbConnection";
import { Address, HouseType, StreetType } from "../../models/Address";
import { Customer } from "../../models/Customer";
import { getEnumKeyByEnumValue } from "../../utils/enums";
import { throwErrorIfNull } from "../../utils/errors";

interface DataToRegisterNewAddress {
  customerId: string;
  houseType: string;
  streetType: string;
  nickname: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  observations?: string;
}

export default async function registerNewAddress(
  data: DataToRegisterNewAddress,
): Promise<string> {
  const houseTypeEnum = throwErrorIfNull(
    getEnumKeyByEnumValue(HouseType, data.houseType),
    "Tipo de endereço inválido",
  );

  const streetTypeEnum = throwErrorIfNull(
    getEnumKeyByEnumValue(StreetType, data.streetType),
    "Tipo de rua inválido",
  );

  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const customerRepository = dataSource.getRepository(Customer);

  const customer = await customerRepository
    .findOne({
      where: {
        id: data.customerId,
      },
    })
    .catch(() => {
      throw new Error("Erro ao buscar cliente");
    });

  if (customer == null) {
    throw new Error("Cliente não encontrado");
  }

  const addressRepository = dataSource.getRepository(Address);

  const address = new Address(
    HouseType[houseTypeEnum],
    StreetType[streetTypeEnum],
    data.nickname,
    data.street,
    data.number,
    data.district,
    data.zipCode,
    data.city,
    data.state,
    data.country,
    data.observations,
    customer,
  );

  const savedAddress = await addressRepository.save(address).catch(() => {
    throw new Error("Erro ao salvar endereço");
  });

  return savedAddress.id;
}
