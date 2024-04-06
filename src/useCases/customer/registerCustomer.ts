import { DatabaseConnection } from "../../dbConnection";
import { Address, HouseType, StreetType } from "../../models/Address";
import {
  Customer,
  Gender as GenderEnum,
  PhoneType as PhoneTypeEnum,
} from "../../models/Customer";
import { validateCPF } from "../../utils/cpf";
import { validateBirthDate } from "../../utils/date";
import {
  getEnumKeyByEnumValue,
  transformEnumKeyToEnumValue,
} from "../../utils/enums";
import {
  secure,
  throwErrorIfFalse,
  throwErrorIfNull,
} from "../../utils/errors";
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
  const houseTypeEnum = throwErrorIfNull(
    getEnumKeyByEnumValue(HouseType, registerData.houseType),
    "Tipo de endereço inválido",
  );

  const streetTypeEnum = throwErrorIfNull(
    getEnumKeyByEnumValue(StreetType, registerData.streetType),
    "Tipo de rua inválido",
  );

  const phoneTypeEnumKey = throwErrorIfNull(
    getEnumKeyByEnumValue(PhoneTypeEnum, registerData.phoneType),
    "Tipo de telefone inválido",
  );

  const genderEnumKey = throwErrorIfNull(
    getEnumKeyByEnumValue(GenderEnum, registerData.gender),
    "Gênero inválido",
  );

  const dateOfBirth = secure(
    () => new Date(registerData.dateOfBirth),
    "Data inválida",
  );

  throwErrorIfFalse(
    validateBirthDate(dateOfBirth),
    "Data de nascimento inválida",
  );

  throwErrorIfFalse(validateCPF(registerData.cpf), "CPF inválido");

  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  return await dataSource
    .transaction(async (manager) => {
      const addressRepository = manager.getRepository(Address);
      const customerRepository = manager.getRepository(Customer);
      const address = await addressRepository.save({
        houseType: HouseType[houseTypeEnum],
        streetType: StreetType[streetTypeEnum],
        nickname: registerData.nickname,
        street: registerData.street,
        number: registerData.number,
        district: registerData.district,
        zipCode: registerData.zipCode,
        city: registerData.city,
        state: registerData.state,
        country: registerData.country,
        observations: registerData.observations,
      });
      const customer = await customerRepository.save({
        name: registerData.name,
        email: registerData.email,
        cpf: registerData.cpf,
        dateOfBirth,
        gender: GenderEnum[genderEnumKey],
        phoneType: PhoneTypeEnum[phoneTypeEnumKey],
        addresses: [address],
        billingAddress: address,
        deliveryAddress: address,
        phoneAreaCode: registerData.phoneAreaCode,
        phoneNumber: registerData.phoneNumber,
        password: registerData.password,
        isActive: true,
        cards: [],
      });
      address.customer = customer;
      await addressRepository.save(address);
      return customer.id;
    })
    .catch((error) => {
      if (error["constraint"] === "unique_email") {
        throw new Error("Email já cadastrado");
      }
      if (error["constraint"] === "unique_cpf") {
        throw new Error("CPF já cadastrado");
      }
      throw new Error("Erro ao salvar cliente");
    });
}
