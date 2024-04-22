import { DatabaseConnection } from "../../dbConnection";
import { Card } from "../../models/Card";
import { Coupon, CouponType } from "../../models/Coupon";
import { Order } from "../../models/Order";
import { OrderPaymentMethod } from "../../models/OrderPaymentMethod";
import { OrderStatus, OrderUpdate } from "../../models/OrderUpdate";
import { getRandomCouponCode } from "../../utils/coupon";
import { throwErrorIfFalse } from "../../utils/errors";
import recalculateOrderTotal from "./recalculateOrderTotal";

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
    checkHasNoRepeatedCards(cards),
    "Cartões repetidos não são permitidos",
  );

  const datasource = await DatabaseConnection.getDataSource();
  const orderPaymentMethodRepository =
    datasource.getRepository(OrderPaymentMethod);

  await datasource.transaction(async (manager) => {
    const orderRepository = manager.getRepository(Order);
    const cardsRepository = manager.getRepository(Card);
    const couponRepository = manager.getRepository(Coupon);
    const orderUpdateRepository = manager.getRepository(OrderUpdate);

    const orderPaymentMethodRepositoryTrx =
      manager.getRepository(OrderPaymentMethod);
    const order = await orderRepository.findOne({
      where: { id: orderId, customer: { id: customerId } },
      relations: [
        "customer",
        "usedPaymentMethods",
        "usedPaymentMethods.coupon",
      ],
    });

    if (order == null) {
      throw new Error("Pedido não encontrado");
    }

    throwErrorIfFalse(
      !detectCardToPayNegativeOrder(cards, order.totalPrice),
      "Pedido com valor negativo por cupons não pode ser pago com cartões",
    );

    throwErrorIfFalse(
      checkAllCardsMinCardAmount(cards, order.totalPrice),
      "Valor de cartão minimo não atingido. Para cada cartão, o valor mínimo é de R$ 10,00",
    );

    throwErrorIfFalse(
      checkCardsPaysAllOrder(cards, order.totalPrice),
      "O valor dos cartões não é suficiente para pagar o pedido",
    );

    throwErrorIfFalse(
      checkCardsByPassOrder(cards, order.totalPrice),
      "O valor dos cartões é maior que o valor do pedido",
    );

    // Coupons
    for (const paymentMethod of order.usedPaymentMethods) {
      if (paymentMethod.coupon === null) continue;
      if (paymentMethod.coupon?.used === true) {
        await orderPaymentMethodRepository.remove(paymentMethod);

        await recalculateOrderTotal(orderId);
        throw new Error(
          `Cupom ${paymentMethod.coupon.code} já utilizado. Tente novamente.`,
        );
      } else {
        await couponRepository.save({
          ...paymentMethod.coupon,
          used: true,
        });
      }
    }

    // Cards
    for (const card of cards) {
      const dbCard = await cardsRepository.findOne({
        where: { id: card.id, customer: { id: customerId } },
        relations: ["customer"],
      });
      if (dbCard === null) {
        throw new Error("Cartão não encontrado");
      }

      await orderPaymentMethodRepositoryTrx.save({
        card: dbCard,
        value: card.value,
        order,
      });
    }

    // Coupons bypass order
    if (order.totalPrice < 0) {
      const couponCode = getRandomCouponCode();
      const value = order.totalPrice * -1;
      await couponRepository.save({
        attachedCustomer: order.customer,
        code: couponCode,
        type: CouponType.Exchange,
        used: false,
        description:
          `Cupom gerado automaticamente por valor excedente de cupons no pedido: ` +
          order.id,
        value,
      });
      await orderUpdateRepository.save({
        status: OrderStatus.PROCESSING,
        observations:
          "Identificamos um valor excedente em seu pedido. Seu cupom de troca é: " +
          couponCode,
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

function checkAllCardsMinCardAmount(
  cards: Array<{ value: number }>,
  orderTotal: number,
): boolean {
  const MIN_CARD_AMOUNT = 1000;
  if (orderTotal < MIN_CARD_AMOUNT) return true;
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
  if (orderTotalPrice < 0) return true;
  return cards.reduce((acc, card) => acc + card.value, 0) === orderTotalPrice;
}

function checkHasNoRepeatedCards(cards: Array<{ id: string }>): boolean {
  const cardIds = cards.map((card) => card.id);
  return new Set(cardIds).size === cardIds.length;
}

function detectCardToPayNegativeOrder(
  cards: Array<{ value: number }>,
  orderTotalPrice: number,
): boolean {
  return orderTotalPrice < 0 && cards.length > 1;
}
