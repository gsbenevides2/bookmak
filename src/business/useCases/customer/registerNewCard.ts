import { DatabaseConnection } from "../../../persistence/dbConnection";
import { Card, CardFlag } from "../../models/Card";
import { Customer } from "../../models/Customer";
import { getEnumKeyByEnumValue } from "../../../utils/enums";

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

  const flagEnum = getEnumKeyByEnumValue(CardFlag, flag);

  if (flagEnum == null) {
    throw new Error("Bandeira do cartão inválida");
  }

  const datasource = await DatabaseConnection.getDataSource().catch(() => {
    throw new Error("Erro ao conectar com o banco de dados");
  });

  const customer = await datasource.getRepository(Customer).findOne({
    where: { id: customerId },
  });
  if (customer == null) {
    throw new Error("Cliente não encontrado");
  }
  const [yearOfValidity, monthOfValidity] = expirationDate.split("-");

  const card = new Card(
    customer,
    cardNumber,
    holderName,
    CardFlag[flagEnum],
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
