import { DatabaseConnection } from "../../dbConnection";
import { Card } from "../../models/Card";
import { Order } from "../../models/Order";
import { OrderPaymentMethod } from "../../models/OrderPaymentMethod";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { throwErrorIfFalse } from "../../utils/errors";

interface Params {
  cards: Array<{
    id: string;
    value: number;
  }>;
  orderId: string;
  customerId: string;
}

export default async function executeOrder(params: Params): Promise<void> {
  const { cards, orderId, customerId } = params;

  throwErrorIfFalse(
    checkCardsStructure(cards),
    "Estrutura de cartões inválida",
  );

  throwErrorIfFalse(
    checkAllCardsMinCardAmount(cards),
    "Valor de cartão minimo não atingido. Para cada cartão, o valor mínimo é de R$ 10,00",
  );

  throwErrorIfFalse(
    checkHasNoRepeatedCards(cards),
    "Cartões repetidos não são permitidos",
  );

  const datasource = await DatabaseConnection.getDataSource();
  const orderRepository = datasource.getRepository(Order);
  const cardsRepository = datasource.getRepository(Card);

  const order = await orderRepository.findOne({
    where: { id: orderId, customer: { id: customerId } },
    relations: ["customer"],
  });

  if (order == null) {
    throw new Error("Pedido não encontrado");
  }
  throwErrorIfFalse(
    checkCardsPaysAllOrder(cards, order.totalPrice),
    "O valor dos cartões não é suficiente para pagar o pedido",
  );

  throwErrorIfFalse(
    checkCardsByPassOrder(cards, order.totalPrice),
    "O valor dos cartões é maior que o valor do pedido",
  );

  await datasource.transaction(async (manager) => {
    const orderPaymentMethodRepository =
      manager.getRepository(OrderPaymentMethod);
    const orderUpdateRepository = manager.getRepository(OrderUpdate);

    for (const card of cards) {
      const dbCard = await cardsRepository.findOne({
        where: { id: card.id, customer: { id: customerId } },
        relations: ["customer"],
      });
      if (dbCard === null) {
        throw new Error("Cartão não encontrado");
      }

      await orderPaymentMethodRepository.save({
        card: dbCard,
        value: card.value,
        order,
      });
    }
    await orderUpdateRepository.save({
      status: OrderStatus.PROCESSING,
      observations: `Estamos recebendo seu pagamento. Aguarde!`,
      order,
    });
  });
}

function checkCardsStructure(cards: any): boolean {
  if (!Array.isArray(cards)) {
    return false;
  }
  for (const card of cards) {
    if (typeof card.id !== "string" || typeof card.value !== "number") {
      return false;
    }
  }
  return true;
}

function checkAllCardsMinCardAmount(cards: Array<{ value: number }>): boolean {
  const MIN_CARD_AMOUNT = 1000;
  return cards.every((card) => card.value >= MIN_CARD_AMOUNT);
}

function checkCardsPaysAllOrder(
  cards: Array<{ value: number }>,
  orderTotalPrice: number,
): boolean {
  return cards.reduce((acc, card) => acc + card.value, 0) >= orderTotalPrice;
}

function checkCardsByPassOrder(
  cards: Array<{ value: number }>,
  orderTotalPrice: number,
): boolean {
  console.log(cards, orderTotalPrice);
  return cards.reduce((acc, card) => acc + card.value, 0) === orderTotalPrice;
}

function checkHasNoRepeatedCards(cards: Array<{ id: string }>): boolean {
  const cardIds = cards.map((card) => card.id);
  return new Set(cardIds).size === cardIds.length;
}
