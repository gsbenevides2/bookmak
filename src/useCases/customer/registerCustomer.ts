import { DatabaseConnection } from "../../dbConnection";
import { Address, HouseType, StreetType } from "../../models/Address";
import {
  Customer,
  Gender as GenderEnum,
  PhoneType as PhoneTypeEnum,
} from "../../models/Customer";
import { validateCPF } from "../../utils/cpf";
import { validateBirthDate } from "../../utils/date";
import { getEnumKeyByEnumValue } from "../../utils/enums";
import { secure, throwErrorIfFalse } from "../../utils/errors";
import registerNewAddress from "./registerNewAddress";

interface CustomerDataToRegister {
  name: string;
  email: string;
  cpf: string;
  dateOfBirth: string;
  password: string;
  gender: string;
  phoneType: string;
  phoneAreaCode: string;
  phoneNumber: string;
  // Address
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

export default async function registerCustomer(
  registerData: CustomerDataToRegister,
): Promise<string> {
  const phoneTypeEnumKey = getEnumKeyByEnumValue(
    PhoneTypeEnum,
    registerData.phoneType,
  );
  if (phoneTypeEnumKey == null) {
    throw new Error("Tipo de telefone inválido");
  }

  const genderEnumKey = getEnumKeyByEnumValue(GenderEnum, registerData.gender);
  if (genderEnumKey == null) {
    throw new Error("Gênero inválido");
  }

  const dateOfBirth = secure(
    () => new Date(registerData.dateOfBirth),
    "Data inválida",
  );

  const houseTypeEnum = getEnumKeyByEnumValue(
    HouseType,
    registerData.houseType,
  );

  if (houseTypeEnum == null) {
    throw new Error("Tipo de endereço inválido");
  }

  const streetTypeEnum = getEnumKeyByEnumValue(
    StreetType,
    registerData.streetType,
  );

  if (streetTypeEnum == null) {
    throw new Error("Tipo de rua inválido");
  }

  throwErrorIfFalse(
    validateBirthDate(dateOfBirth),
    "Data de nascimento inválida",
  );

  throwErrorIfFalse(validateCPF(registerData.cpf), "CPF inválido");

  const customer = new Customer(
    registerData.email,
    registerData.name,
    registerData.cpf,
    dateOfBirth,
    GenderEnum[genderEnumKey],
    PhoneTypeEnum[phoneTypeEnumKey],
    registerData.phoneAreaCode,
    registerData.phoneNumber,
    true,
    registerData.password,
    [],
    [],
  );

  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const customerRepository = dataSource.getRepository(Customer);

  const savedCustomer = await customerRepository
    .save(customer)
    .catch((error: Error) => {
      const isUniqueContraintError =
        error.message.includes("unique constraint");
      if (isUniqueContraintError) {
        throw new Error("Email ou CPF já cadastrado");
      }
      throw new Error("Erro ao salvar o cliente");
    });

  const addressId = await registerNewAddress({
    ...registerData,
    customerId: savedCustomer.id,
  });

  const address = await dataSource.getRepository(Address).findOne({
    where: { id: addressId },
  });

  if (address == null) {
    throw new Error("Endereço não encontrado");
  }

  savedCustomer.deliveryAddress = address;
  savedCustomer.billingAddress = address;

  await customerRepository.save(savedCustomer).catch(() => {
    throw new Error("Erro ao salvar endereço");
  });

  address.customer = savedCustomer;

  await dataSource
    .getRepository(Address)
    .save(address)
    .catch(() => {
      throw new Error("Erro ao salvar endereço");
    });

  return savedCustomer.id;
}
