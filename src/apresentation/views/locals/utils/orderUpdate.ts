import { type Order } from "../../../../business/models/Order";
import type { OrderUpdate } from "../../../../business/models/OrderUpdate";
import {
  OrderStatus,
  orderStatusText,
} from "../../../../business/models/OrderUpdate";
export const OrderStatusEnum = OrderStatus;
export function formatStatus(status: OrderStatus): string {
  return orderStatusText[status];
}

export function sort(updates: OrderUpdate[]): OrderUpdate[] {
  return updates.sort((a, b) => {
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
}

export function listStatusToSelect(): Array<{
  value: OrderStatus;
  label: string;
}> {
  return Object.keys(OrderStatus).map((statusKey) => ({
    value: OrderStatus[statusKey as keyof typeof OrderStatus],
    label: orderStatusText[OrderStatus[statusKey as keyof typeof OrderStatus]],
  }));
}

export function getCustomerButtons(
  order: Order,
): Array<{ text: string; url: string }> {
  const buttons: Array<{ text: string; url: string }> = [];
  const sortedUpdates = sort(order.updates);
  const lastUpdate = sortedUpdates[0];
  if (lastUpdate.status === OrderStatus.SENDED) {
    buttons.push({
      text: "Trocar Pedido",
      url: `/accounts/me/orders/${order.id}/change`,
    });
  }
  const notCancelableStatus = [
    OrderStatusEnum.CANCELED,
    OrderStatusEnum.CANCELING,
    OrderStatusEnum.CANCEL_REJECTED,
    OrderStatusEnum.EXCHANGING,
    OrderStatusEnum.EXCHANGED,
    OrderStatusEnum.EXCHANGE_REJECTED,
    OrderStatusEnum.PAYMENT_REJECTED,
  ];
  if (!notCancelableStatus.includes(lastUpdate.status)) {
    buttons.push({
      text: "Cancelar Pedido",
      url: `/accounts/me/orders/${order.id}/cancel`,
    });
  }
  return buttons;
}

export function getAdminButtons(
  order: Order,
): Array<{ text: string; url: string }> {
  const buttons: Array<{ text: string; url: string }> = [];
  const sortedUpdates = sort(order.updates);
  const lastUpdate = sortedUpdates[0];

  if (lastUpdate.status === OrderStatus.PROCESSING) {
    buttons.push(
      {
        text: "Aprovar Pagamento",
        url: `/admin/order/${order.id}/aprovePayment`,
      },
      {
        text: "Rejeitar Pagamento",
        url: `/admin/order/${order.id}/rejectPayment`,
      },
    );
  }
  if (lastUpdate.status === OrderStatus.EXCHANGING) {
    buttons.push(
      {
        text: "Trocar Pedido",
        url: `/admin/order/${order.id}/aproveExchange`,
      },
      {
        text: "Cancelar Troca",
        url: `/admin/order/${order.id}/rejectExchange`,
      },
    );
  }
  if (lastUpdate.status === OrderStatus.PAYMENT_APPROVED) {
    buttons.push({
      text: "Iniciar Preparação",
      url: `/admin/order/${order.id}/startPreparing`,
    });
  }
  if (lastUpdate.status === OrderStatus.PREPARING) {
    buttons.push({
      text: "Enviar Pedido",
      url: `/admin/order/${order.id}/sendOrder`,
    });
  }
  if (lastUpdate.status === OrderStatus.SENDING) {
    buttons.push({
      text: "Confirmar Entrega",
      url: `/admin/order/${order.id}/sendedOrder`,
    });
  }
  if (lastUpdate.status === OrderStatus.CANCELING) {
    buttons.push(
      {
        text: "Aprovar Cancelamento",
        url: `/admin/order/${order.id}/cancel`,
      },
      {
        text: "Rejeitar Cancelamento",
        url: `/admin/order/${order.id}/rejectCancel`,
      },
    );
  }
  return buttons;
}
