import { DatabaseConnection } from "../../../persistence/dbConnection";
import { isMonthBefore } from "../../../utils/date";
import { getEnumKeyByEnumValue } from "../../../utils/enums";
import {
  throwErrorIfFalse,
  throwErrorIfNull,
  throwErrorIfTrue,
} from "../../../utils/errors";
import { Card, CardFlag, cardNumberValidation } from "../../models/Card";
import { Customer } from "../../models/Customer";

interface RegisterNewCardInput {
  customerId: string;
  cardNumber: string;
  holderName: string;
  expirationDate: string;
  cvv: string;
  flag: string;
}

export default async function registerNewCard(
  registerData: RegisterNewCardInput,
): Promise<void> {
  const { customerId, cardNumber, expirationDate, cvv, flag, holderName } =
    registerData;

  const cardNumberOnlyNumbers = cardNumber.replace(/\D/g, "");

  throwErrorIfFalse(
    cardNumberOnlyNumbers.length === 16,
    "Número do cartão inválido",
  );

  const flagEnumToTest = getEnumKeyByEnumValue(CardFlag, flag);

  throwErrorIfNull(flagEnumToTest, "Bandeira do cartão inválida");

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const flagEnumKey = flagEnumToTest!;
  const flagEnumValue = CardFlag[flagEnumKey];

  const cardNumberValidator = cardNumberValidation[flagEnumValue];

  throwErrorIfFalse(
    cardNumberValidator(cardNumberOnlyNumbers),
    "Número do cartão inválido",
  );

  throwErrorIfFalse(cvv.length === 3, "CVV inválido");
  const [yearOfValidity, monthOfValidity] = expirationDate
    .split("-")
    .map((a) => a.replace(/\D/g, ""));

  throwErrorIfFalse(
    yearOfValidity.length === 4 && monthOfValidity.length === 2,
    "Data de validade inválida",
  );

  throwErrorIfTrue(
    isMonthBefore(monthOfValidity, yearOfValidity),
    "Cartão vencido",
  );

  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const customer = await datasource.getRepository(Customer).findOne({
    where: { id: customerId },
  });
  if (customer == null) {
    throw new Error("Cliente não encontrado");
  }

  const card = new Card(
    customer,
    cardNumberOnlyNumbers,
    holderName,
    flagEnumValue,
    cvv,
    monthOfValidity,
    yearOfValidity,
  );

  await datasource
    .getRepository(Card)
    .save(card)
    .catch(() => {
      throw new Error("Erro ao salvar o cartão");
    });
}
