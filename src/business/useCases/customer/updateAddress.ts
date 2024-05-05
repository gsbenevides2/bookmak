import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Address, HouseType, StreetType } from "../../models/Address";
import { Customer } from "../../models/Customer";
import { getEnumKeyByEnumValue } from "../../../utils/enums";

interface DataToRegisterUpdateAddress {
  addressId: string;
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

export default async function updateAddress(
  data: DataToRegisterUpdateAddress,
): Promise<void> {
  const houseTypeEnum = getEnumKeyByEnumValue(HouseType, data.houseType);

  if (houseTypeEnum == null) {
    throw new Error("Tipo de endereço inválido");
  }

  const streetTypeEnum = getEnumKeyByEnumValue(StreetType, data.streetType);

  if (streetTypeEnum == null) {
    throw new Error("Tipo de rua inválido");
  }

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

  const address = await addressRepository.findOne({
    where: {
      id: data.addressId,
      customer: { id: data.customerId },
    },
  });

  if (address == null) {
    throw new Error("Endereço não encontrado");
  }

  address.houseType = HouseType[houseTypeEnum];
  address.streetType = StreetType[streetTypeEnum];
  address.nickname = data.nickname;
  address.street = data.street;
  address.number = data.number;
  address.district = data.district;
  address.zipCode = data.zipCode;
  address.city = data.city;
  address.state = data.state;
  address.country = data.country;
  address.observations = data.observations;

  await addressRepository.save(address).catch(() => {
    throw new Error("Erro ao salvar endereço");
  });
}
