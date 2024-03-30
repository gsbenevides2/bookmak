import { DatabaseConnection } from "../../dbConnection";
import { getEnumKeyByEnumValue } from "../../utils/enums";
import {
  Customer,
  Gender as GenderEnum,
  PhoneType as PhoneTypeEnum,
} from "../../models/Customer";
import { validateCPF } from "../../utils/cpf";
import { validateBirthDate } from "../../utils/date";
import { secure, throwErrorIfFalse } from "../../utils/errors";
import { Address } from "../../models/Address";

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
  const phoneTypeEnumKey = getEnumKeyByEnumValue(
    PhoneTypeEnum,
    updateData.phoneType,
  );
  if (phoneTypeEnumKey == null) {
    throw new Error("Tipo de telefone inválido");
  }

  const genderEnumKey = getEnumKeyByEnumValue(GenderEnum, updateData.gender);
  if (genderEnumKey == null) {
    throw new Error("Gênero inválido");
  }

  const dateOfBirth = secure(
    () => new Date(updateData.dateOfBirth),
    "Data inválida",
  );

  throwErrorIfFalse(
    validateBirthDate(dateOfBirth),
    "Data de nascimento inválida",
  );

  throwErrorIfFalse(validateCPF(updateData.cpf), "CPF inválido");

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
  customer.cpf = updateData.cpf;
  customer.dateOfBirth = dateOfBirth;
  customer.gender = GenderEnum[genderEnumKey];
  customer.phoneType = PhoneTypeEnum[phoneTypeEnumKey];
  customer.phoneAreaCode = updateData.phoneAreaCode;
  customer.phoneNumber = updateData.phoneNumber;
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
