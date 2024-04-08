import { MockResponses, OrderStatus, orderStatusText } from "../mocks/mock";
import { Controller } from "../types/controller";

export const getOrders: Controller = (_req, res) => {
  res.render("admin/orders", {
    orders: MockResponses.makedOrders.map((order) => ({
      ...order,
    })),
  });
};

export const getDataFromOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const order = MockResponses.makedOrders.find((order) => order.id === orderId);
  if (order == null) {
    res.redirect("/admin");
    return;
  }

  res.render("admin/order", {
    id: order.id,
    account: order.customer,
    card: order.card,
    deliveryAddress: order.addressShipping,
    billingAddress: order.addressPayment,
    cartItens: order.items,
    shippingPrice: order.shippingPrice,
    subTotal: order.subTotal,
    totalPrice: order.totalPrice,
    totalDiscount: order.totalDiscount,
    coupons: order.coupons,
    status: order.status,
    statusObservation: order.statusObservation,
  });
};

export const checkOrderIsPayable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PROCESSING) {
    res.redirect("/admin");
    return;
  }
  const view = req.originalUrl.includes("reject")
    ? "admin/rejectPayment"
    : "admin/aprovePayment";
  res.render(view, {
    orderId: order.id,
  });
};

export const aprovePayment: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PROCESSING) {
    res.redirect("/admin");
    return;
  }

  MockResponses.makedOrders[orderIndex].status = OrderStatus.PAYMENT_APPROVED;
  MockResponses.makedOrders[orderIndex].statusObservation?.push(
    `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.PAYMENT_APPROVED]} - Seu pagamento foi aprovado, aguarde que logo o pedido será enviado.`,
  );
  res.redirect(`/admin/order/${orderId}`);
};

export const rejectPayment: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const { reason } = req.body;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PROCESSING) {
    res.redirect("/admin");
    return;
  }

  MockResponses.makedOrders[orderIndex].status = OrderStatus.PAYMENT_REJECTED;
  MockResponses.makedOrders[orderIndex].statusObservation?.push(
    `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.PAYMENT_REJECTED]} - Seu pagamento foi rejeitado, motivo: ${reason}`,
  );

  res.redirect(`/admin/order/${orderId}`);
};

export const checkOrderIsPayed: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PAYMENT_APPROVED) {
    res.redirect("/admin");
    return;
  }

  res.render("admin/prepareOrder", {
    orderId: order.id,
  });
};

export const registerOrderPreparing: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const { transport } = req.body;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PAYMENT_APPROVED) {
    res.redirect("/admin");
    return;
  }

  MockResponses.makedOrders[orderIndex].status = OrderStatus.PREPARING;
  MockResponses.makedOrders[orderIndex].statusObservation?.push(
    `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.PREPARING]} - Seu pedido está sendo preparado para envio, logo você receberá o código de rastreio.`,
  );

  res.redirect(`/admin/order/${orderId}`);
};

export const checkOrderIsPreparable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PAYMENT_APPROVED) {
    res.redirect("/admin");
    return;
  }

  res.render("admin/startPreparing", {
    orderId: order.id,
  });
};

export const checkOrderIsInPreparableState: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PREPARING) {
    res.redirect("/admin");
    return;
  }

  res.render("admin/sendOrder", {
    orderId: order.id,
  });
};

export const sendOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const { transporter, trackingCode } = req.body;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.PREPARING) {
    res.redirect("/admin");
    return;
  }

  MockResponses.makedOrders[orderIndex].status = OrderStatus.SENDING;
  MockResponses.makedOrders[orderIndex].statusObservation?.push(
    `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.SENDING]} - Seu pedido está com a transportadora ${transporter}, o código de rastreio é: ${trackingCode}.`,
  );

  res.redirect(`/admin/order/${orderId}`);
};

export const checkOrderIsSended: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.SENDING) {
    res.redirect("/admin");
    return;
  }

  res.render("admin/sendedOrder", {
    orderId: order.id,
  });
};

export const finishOrder: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.SENDING) {
    res.redirect("/admin");
    return;
  }

  MockResponses.makedOrders[orderIndex].status = OrderStatus.SENDED;
  MockResponses.makedOrders[orderIndex].statusObservation?.push(
    `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.SENDED]} - Seu pedido foi entregue com sucesso.`,
  );

  res.redirect(`/admin/order/${orderId}`);
};

export const checkOrderIsExchangeable: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.EXCHANGING) {
    res.redirect("/admin");
    return;
  }
  const view = req.originalUrl.includes("reject")
    ? "admin/rejectExchange"
    : "admin/aproveExchange";
  res.render(view, {
    orderId: order.id,
  });
};

export const aproveExchange: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.EXCHANGING) {
    res.redirect("/admin");
    return;
  }

  MockResponses.makedOrders[orderIndex].status = OrderStatus.EXCHANGED;
  MockResponses.makedOrders[orderIndex].statusObservation?.push(
    `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.EXCHANGED]} - Seu pedido de troca foi aprovado`,
  );

  res.redirect(`/admin/order/${orderId}`);
};

export const rejectExchange: Controller = (req, res) => {
  const orderId = req.params.orderId;
  const { reason } = req.body;
  const orderIndex = MockResponses.makedOrders.findIndex(
    (order) => order.id === orderId,
  );
  if (orderIndex === -1) {
    res.redirect("/admin");
    return;
  }

  const order = MockResponses.makedOrders[orderIndex];
  if (order.status !== OrderStatus.EXCHANGING) {
    res.redirect("/admin");
    return;
  }

  MockResponses.makedOrders[orderIndex].status = OrderStatus.EXCHANGE_REJECTED;
  MockResponses.makedOrders[orderIndex].statusObservation?.push(
    `${new Date().toLocaleString()} - ${orderStatusText[OrderStatus.EXCHANGE_REJECTED]} - Seu pedido de troca foi rejeitado, motivo: ${reason}. O produto será reenviado para o endereço de entrega.`,
  );

  res.redirect(`/admin/order/${orderId}`);
};
