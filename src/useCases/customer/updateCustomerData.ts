import { DatabaseConnection } from "../../dbConnection";
import { getEnumKeyByEnumValue } from "../../utils/enums";
import {
  Customer,
  Gender as GenderEnum,
  PhoneType as PhoneTypeEnum,
} from "../../models/Customer";
import { validateCPF } from "../../utils/cpf";
import { validateBirthDate } from "../../utils/date";
import {
  secure,
  throwErrorIfFalse,
  throwErrorIfNull,
} from "../../utils/errors";
import { Address } from "../../models/Address";
import { validateEmail } from "../../utils/email";
import { validateDDD, validatePhone } from "../../utils/phone";
import { stringIsNotEmpty } from "../../utils/string";

interface CustomerDataToUpdate {
  name: string;
  email: string;
  cpf: string;
  dateOfBirth: string;
  gender: string;
  phoneType: string;
  phoneAreaCode: string;
  phoneNumber: string;
  billingAddressId: string;
  deliveryAddressId: string;
}

export default async function updateCustomerData(
  customerId: string,
  updateData: CustomerDataToUpdate,
): Promise<void> {
  throwErrorIfFalse(stringIsNotEmpty(updateData.name), "Nome inválido");

  throwErrorIfFalse(validateEmail(updateData.email), "Email inválido");

  const parsedCPF = updateData.cpf.replace(/\D/g, "");
  throwErrorIfFalse(validateCPF(parsedCPF), "CPF inválido");

  const dateOfBirth = secure(
    () => new Date(updateData.dateOfBirth),
    "Data inválida",
  );
  throwErrorIfFalse(
    validateBirthDate(dateOfBirth),
    "Data de nascimento inválida",
  );

  throwErrorIfFalse(validateDDD(updateData.phoneAreaCode), "DDD inválido");

  const phoneTypeEnumKey = throwErrorIfNull(
    getEnumKeyByEnumValue(PhoneTypeEnum, updateData.phoneType),
    "Tipo de telefone inválido",
  );
  const parsedPhone = updateData.phoneNumber.replace(/\D/g, "");
  throwErrorIfFalse(validatePhone(parsedPhone), "Telefone inválido");

  const genderEnumKey = throwErrorIfNull(
    getEnumKeyByEnumValue(GenderEnum, updateData.gender),
    "Gênero inválido",
  );

  const dataSource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const customerRepository = dataSource.getRepository(Customer);
  const addressRepository = dataSource.getRepository(Address);

  const customer = await customerRepository
    .findOne({
      where: {
        id: customerId,
      },
    })
    .catch(() => {
      throw new Error("Erro ao buscar cliente");
    });

  if (customer == null) {
    throw new Error("Cliente não encontrado");
  }

  const billingAddress = await addressRepository
    .findOne({
      where: {
        id: updateData.billingAddressId,
        customer: {
          id: customerId,
        },
      },
    })
    .catch(() => {
      throw new Error("Erro ao buscar endereço de cobrança");
    });

  if (billingAddress == null) {
    throw new Error("Endereço de cobrança não encontrado");
  }

  const deliveryAddress = await addressRepository
    .findOne({
      where: {
        id: updateData.deliveryAddressId,
        customer: {
          id: customerId,
        },
      },
    })
    .catch(() => {
      throw new Error("Erro ao buscar endereço de entrega");
    });

  if (deliveryAddress == null) {
    throw new Error("Endereço de entrega não encontrado");
  }

  customer.name = updateData.name;
  customer.email = updateData.email;
  customer.cpf = parsedCPF;
  customer.dateOfBirth = dateOfBirth;
  customer.gender = GenderEnum[genderEnumKey];
  customer.phoneType = PhoneTypeEnum[phoneTypeEnumKey];
  customer.phoneAreaCode = updateData.phoneAreaCode;
  customer.phoneNumber = parsedPhone;
  customer.billingAddress = billingAddress;
  customer.deliveryAddress = deliveryAddress;

  await customerRepository
    .update(
      {
        id: customerId,
      },
      customer,
    )
    .catch(() => {
      throw new Error("Erro ao atualizar cliente");
    });
}
