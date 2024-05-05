import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Address, HouseType, StreetType } from "../../models/Address";
import {
  Customer,
  Gender as GenderEnum,
  PhoneType as PhoneTypeEnum,
} from "../../models/Customer";
import { validateCPF } from "../../../utils/cpf";
import { validateBirthDate } from "../../../utils/date";
import { validateEmail } from "../../../utils/email";
import { getEnumKeyByEnumValue } from "../../../utils/enums";
import {
  secure,
  throwErrorIfFalse,
  throwErrorIfNull,
} from "../../../utils/errors";
import { srtIsNumberOnly } from "../../../utils/number";
import { validatePasswordSecurity } from "../../../utils/password";
import { validateDDD, validatePhone } from "../../../utils/phone";
import { stringIsNotEmpty } from "../../../utils/string";

interface CustomerDataToRegister {
  name: string;
  email: string;
  cpf: string;
  dateOfBirth: string;
  password: string;
  passwordConfirm: string;
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
  throwErrorIfFalse(stringIsNotEmpty(registerData.name), "Nome inválido");

  throwErrorIfFalse(validateEmail(registerData.email), "Email inválido");

  const parsedCPF = registerData.cpf.replace(/\D/g, "");
  throwErrorIfFalse(validateCPF(parsedCPF), "CPF inválido");

  const dateOfBirth = secure(
    () => new Date(registerData.dateOfBirth),
    "Data inválida",
  );
  throwErrorIfFalse(
    validateBirthDate(dateOfBirth),
    "Data de nascimento inválida",
  );

  throwErrorIfFalse(validateDDD(registerData.phoneAreaCode), "DDD inválido");

  const phoneTypeEnumKey = throwErrorIfNull(
    getEnumKeyByEnumValue(PhoneTypeEnum, registerData.phoneType),
    "Tipo de telefone inválido",
  );
  const parsedPhone = registerData.phoneNumber.replace(/\D/g, "");
  throwErrorIfFalse(validatePhone(parsedPhone), "Telefone inválido");

  const genderEnumKey = throwErrorIfNull(
    getEnumKeyByEnumValue(GenderEnum, registerData.gender),
    "Gênero inválido",
  );

  throwErrorIfFalse(
    validatePasswordSecurity(registerData.password),
    "Senha insegura, deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
  );

  throwErrorIfFalse(
    registerData.password === registerData.passwordConfirm,
    "Senhas não coincidem",
  );

  throwErrorIfFalse(
    stringIsNotEmpty(registerData.nickname),
    "Apelido inválido",
  );

  const houseTypeEnum = throwErrorIfNull(
    getEnumKeyByEnumValue(HouseType, registerData.houseType),
    "Tipo de endereço inválido",
  );

  const streetTypeEnum = throwErrorIfNull(
    getEnumKeyByEnumValue(StreetType, registerData.streetType),
    "Tipo de rua inválido",
  );

  throwErrorIfFalse(stringIsNotEmpty(registerData.street), "Rua inválida");

  throwErrorIfFalse(srtIsNumberOnly(registerData.number), "Número inválido");

  throwErrorIfFalse(stringIsNotEmpty(registerData.district), "Bairro inválido");

  const parsedZipCode = registerData.zipCode.replace(/\D/g, "");
  throwErrorIfFalse(stringIsNotEmpty(parsedZipCode), "CEP inválido");

  throwErrorIfFalse(stringIsNotEmpty(registerData.city), "Cidade inválida");

  throwErrorIfFalse(stringIsNotEmpty(registerData.state), "Estado inválido");

  throwErrorIfFalse(stringIsNotEmpty(registerData.country), "País inválido");

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
        zipCode: parsedZipCode,
        city: registerData.city,
        state: registerData.state,
        country: registerData.country,
        observations: registerData.observations,
      });
      const customer = await customerRepository.save({
        name: registerData.name,
        email: registerData.email,
        cpf: parsedCPF,
        dateOfBirth,
        gender: GenderEnum[genderEnumKey],
        phoneType: PhoneTypeEnum[phoneTypeEnumKey],
        addresses: [address],
        billingAddress: address,
        deliveryAddress: address,
        phoneAreaCode: registerData.phoneAreaCode,
        phoneNumber: parsedPhone,
        password: registerData.password,
        isActive: true,
        cards: [],
      });
      address.customer = customer;
      await addressRepository.save(address);
      return customer.id;
    })
    .catch((error) => {
      if (error.constraint === "unique_email") {
        throw new Error("Email já cadastrado");
      }
      if (error.constraint === "unique_cpf") {
        throw new Error("CPF já cadastrado");
      }
      throw new Error("Erro ao salvar cliente");
    });
}
