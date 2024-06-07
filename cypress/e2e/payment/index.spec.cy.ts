/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import { addressesFixtures } from "../../fixtures/address";
import { booksFixtures } from "../../fixtures/books";
import { cardsFixtures } from "../../fixtures/card";
import { customersFixtures } from "../../fixtures/customer";
import { ordersFixtures } from "../../fixtures/orders";
import * as utils from "../../utils";

describe("Pagamento", function () {
  const [customer] = customersFixtures;

  beforeEach(function () {
    const [books] = booksFixtures;
    const [address] = addressesFixtures;
    cy.downDatabase();
    cy.createCustomer([
      {
        customer,
        address,
      },
    ]);

    cy.createBook(books);

    cy.setCookie("accountId", customer.id);
  });

  it("Um cartão para pagar o todo.", function () {
    const order = ordersFixtures[8];
    const [card] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card,
        customer_id: customer.id,
      },
    ]);
    cy.setCookie("orderId", order.orders[0].id);

    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".totalPrice").as("totalPrice");

    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(card.number)} - ${utils.parseCardFlag(card.flag)}`,
    );

    cy.get(".totalPrice")
      .invoke("text")
      .then((totalPrice) => {
        const totalPriceParsed = totalPrice.replace(/[^\d]/g, "");
        cy.get("#value").then((input) => {
          input.val((parseInt(totalPriceParsed) / 100).toFixed(2));
        });
      });
    cy.get("#addCard").click();

    cy.get("button.pay").click();
    cy.get(".card").should(
      "contains.text",
      `${utils.formatCardNumber(card.number)} - ${utils.parseCardFlag(card.flag)}`,
    );
    cy.get(".status").should("contains.text", "Em processamento");
  });

  it("Tentar passar somente um cartão com valor menor da compra.", function () {
    const order = ordersFixtures[8];
    const [card] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card,
        customer_id: customer.id,
      },
    ]);
    cy.setCookie("orderId", order.orders[0].id);

    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".totalPrice").as("totalPrice");

    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(card.number)} - ${utils.parseCardFlag(card.flag)}`,
    );

    cy.get(".totalPrice")
      .invoke("text")
      .then((totalPrice) => {
        const totalPriceParsed = totalPrice.replace(/[^\d]/g, "");
        cy.get("#value").then((input) => {
          const value = parseInt(totalPriceParsed) / 100 - 1;
          input.val(value.toFixed(2));
        });
      });
    cy.get("#addCard").click();

    cy.get("button.pay").click();
    cy.get(".alert").should(
      "contains.text",
      "O valor dos cartões não é suficiente para pagar o pedido",
    );
  });

  it("Usar dois cartões e pagar meio a meio", function () {
    const order = ordersFixtures[8];
    const [cardOne, cardTwo] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card: cardOne,
        customer_id: customer.id,
      },
      {
        card: cardTwo,
        customer_id: customer.id,
      },
    ]);
    cy.setCookie("orderId", order.orders[0].id);

    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".totalPrice").as("totalPrice");

    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(cardOne.number)} - ${utils.parseCardFlag(cardOne.flag)}`,
    );

    cy.get(".totalPrice")
      .invoke("text")
      .then((totalPrice) => {
        const totalPriceParsed = totalPrice.replace(/[^\d]/g, "");
        cy.get("#value").then((input) => {
          const value = parseInt(totalPriceParsed) / 2 / 100;
          input.val(value.toFixed(2));
        });
      });
    cy.get("#addCard").click();

    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(cardTwo.number)} - ${utils.parseCardFlag(cardTwo.flag)}`,
    );

    cy.get(".totalPrice")
      .invoke("text")
      .then((totalPrice) => {
        const totalPriceParsed = totalPrice.replace(/[^\d]/g, "");
        cy.get("#value").then((input) => {
          const total = parseInt(totalPriceParsed) / 100;
          const value = total - parseFloat((total / 2).toFixed(2));
          input.val(value.toFixed(2));
        });
      });
    cy.get("#addCard").click();

    cy.get("button.pay").click();
    cy.get(".card").should(
      "contains.text",
      `${utils.formatCardNumber(cardOne.number)} - ${utils.parseCardFlag(cardOne.flag)}`,
    );
    cy.get(".card").should(
      "contains.text",
      `${utils.formatCardNumber(cardTwo.number)} - ${utils.parseCardFlag(cardTwo.flag)}`,
    );
    cy.get(".status").should("contains.text", "Em processamento");
  });

  it("Usar dois cartões porém ainda não pagar a compra toda.", function () {
    const order = ordersFixtures[8];
    const [cardOne, cardTwo] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card: cardOne,
        customer_id: customer.id,
      },
      {
        card: cardTwo,
        customer_id: customer.id,
      },
    ]);
    cy.setCookie("orderId", order.orders[0].id);

    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".totalPrice").as("totalPrice");

    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(cardOne.number)} - ${utils.parseCardFlag(cardOne.flag)}`,
    );

    cy.get(".totalPrice")
      .invoke("text")
      .then((totalPrice) => {
        const totalPriceParsed = totalPrice.replace(/[^\d]/g, "");
        cy.get("#value").then((input) => {
          const value = parseInt(totalPriceParsed) / 2 / 100;
          input.val(value.toFixed(2));
        });
      });
    cy.get("#addCard").click();

    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(cardTwo.number)} - ${utils.parseCardFlag(cardTwo.flag)}`,
    );

    cy.get(".totalPrice")
      .invoke("text")
      .then((totalPrice) => {
        const totalPriceParsed = totalPrice.replace(/[^\d]/g, "");
        cy.get("#value").then((input) => {
          const total = parseInt(totalPriceParsed) / 100;
          const value = total - 1 - parseFloat((total / 2).toFixed(2));
          input.val(value.toFixed(2));
        });
      });
    cy.get("#addCard").click();

    cy.get("button.pay").click();
    cy.get(".alert").should(
      "contains.text",
      "O valor dos cartões não é suficiente para pagar o pedido",
    );
  });

  it("Usar um cupom para pagar o todo.", function () {
    const order = ordersFixtures[8];
    cy.createOrder(order);
    const couponCode = "CUPOM-DE-DESCONTO";
    const couponUUID = faker.string.uuid();
    cy.createCoupon({
      coupon: {
        code: couponCode,
        id: couponUUID,
        description: "Cupom de desconto",
        type: "discount",
        value: order.orders[0].totalPrice,
      },
    });

    cy.setCookie("orderId", order.orders[0].id);
    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".input-group > .form-control").type(couponCode);
    cy.get("#button-addon2").click();
    cy.get(".totalPrice").should("contains.text", utils.formatMoney(0));
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponCode} - Valor Abatido: ${utils.formatMoney((order.orders[0].totalPrice / 100) * -1)}`,
    );
    cy.get(".discount").should(
      "contains.text",
      utils.formatMoney((order.orders[0].totalPrice / 100) * -1),
    );
    cy.get("button.pay").click();

    cy.get(".status").should("contains.text", "Em processamento");
    cy.get(".totalPrice").should("contains.text", utils.formatMoney(0));
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponCode} - Valor Abatido: ${utils.formatMoney((order.orders[0].totalPrice / 100) * -1)}`,
    );
    cy.get(".discount").should(
      "contains.text",
      utils.formatMoney((order.orders[0].totalPrice / 100) * -1),
    );
  });

  it("Metade Cartão e outra metade com um cupom", function () {
    const order = ordersFixtures[8];
    cy.createOrder(order);

    const couponCode = "CUPOM-DE-DESCONTO";
    const couponUUID = faker.string.uuid();
    const couponValue = parseInt((order.orders[0].totalPrice / 2).toFixed(2));
    const missingValue = order.orders[0].totalPrice - couponValue;
    cy.createCoupon({
      coupon: {
        code: couponCode,
        id: couponUUID,
        description: "Cupom de desconto",
        type: "discount",
        value: couponValue,
      },
    });

    const [card] = cardsFixtures;
    cy.createCard([
      {
        card,
        customer_id: customer.id,
      },
    ]);

    cy.setCookie("orderId", order.orders[0].id);
    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".input-group > .form-control").type(couponCode);
    cy.get("#button-addon2").click();
    cy.get(".totalPrice").should(
      "contains.text",
      utils.formatMoney(missingValue / 100),
    );
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponCode} - Valor Abatido: ${utils.formatMoney((couponValue / 100) * -1)}`,
    );
    cy.get(".discount").should(
      "contains.text",
      utils.formatMoney((couponValue / 100) * -1),
    );

    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(card.number)} - ${utils.parseCardFlag(card.flag)}`,
    );

    cy.get("#value").type((missingValue / 100).toFixed(2));
    cy.get("#addCard").click();

    cy.get("button.pay").click();

    cy.get(".status").should("contains.text", "Em processamento");
    cy.get(".totalPrice").should(
      "contains.text",
      utils.formatMoney(missingValue / 100),
    );
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponCode} - Valor Abatido: ${utils.formatMoney((couponValue / 100) * -1)}`,
    );
    cy.get(".discount").should(
      "contains.text",
      utils.formatMoney((couponValue / 100) * -1),
    );

    cy.get(".card").should(
      "contains.text",
      `${utils.formatCardNumber(card.number)} - ${utils.parseCardFlag(card.flag)} - ${utils.formatMoney(missingValue / 100)}`,
    );
  });

  it("Pagamento com um cupom de valor maior de compra, gera um cupom de troca.", function () {
    const order = ordersFixtures[8];
    cy.createOrder(order);
    const couponCode = "CUPOM-DE-DESCONTO";
    const couponUUID = faker.string.uuid();
    const couponValue = parseInt((order.orders[0].totalPrice * 1.1).toString());
    const missingValue = order.orders[0].totalPrice - couponValue;
    cy.createCoupon({
      coupon: {
        code: couponCode,
        id: couponUUID,
        description: "Cupom de desconto",
        type: "discount",
        value: couponValue,
      },
    });

    cy.setCookie("orderId", order.orders[0].id);
    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".input-group > .form-control").type(couponCode);
    cy.get("#button-addon2").click();
    cy.get(".alert").should(
      "contains.text",
      "Identificamos uso de cupons que geraram um valor negativo, o valor negativo será convertido em um cupom de troco, após a confirmação do pagamento. Você pode prosseguir com o pagamento sem usar cartões.",
    );
    cy.get(".totalPrice").should(
      "contains.text",
      utils.formatMoney(missingValue / 100),
    );
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponCode} - Valor Abatido: ${utils.formatMoney((couponValue / 100) * -1)}`,
    );
    cy.get(".discount").should(
      "contains.text",
      utils.formatMoney((couponValue / 100) * -1),
    );

    cy.get("button.pay").click();

    cy.get(".status").should("contains.text", "Em processamento");
    cy.get(".totalPrice").should(
      "contains.text",
      utils.formatMoney(missingValue / 100),
    );
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponCode} - Valor Abatido: ${utils.formatMoney((couponValue / 100) * -1)}`,
    );
    cy.get(".discount").should(
      "contains.text",
      utils.formatMoney((couponValue / 100) * -1),
    );
    cy.get(".statusObs").should(
      "contains.text",
      "Em processamento - Identificamos um valor excedente em seu pedido. Seu cupom de troca é: ",
    );
  });

  it("Pagamento com dois cupons sendo que o primeiro já paga o pedido todo. Ao tentar usar o segundo gera um aviso", function () {
    const order = ordersFixtures[8];
    cy.createOrder(order);
    const couponCodeOne = "CUPOM-DE-DESCONTO";
    const couponUUIDOne = faker.string.uuid();
    const couponValueOne = order.orders[0].totalPrice + 10;
    const couponCodeTwo = "CUPOM-DE-DESCONTO-2";
    const couponUUIDTwo = faker.string.uuid();
    const couponValueTwo = 10;
    cy.createCoupon({
      coupon: {
        code: couponCodeOne,
        id: couponUUIDOne,
        description: "Cupom de desconto",
        type: "discount",
        value: couponValueOne,
      },
    });
    cy.createCoupon({
      coupon: {
        code: couponCodeTwo,
        id: couponUUIDTwo,
        description: "Cupom de troca",
        type: "discount",
        value: couponValueTwo,
      },
    });

    cy.setCookie("orderId", order.orders[0].id);
    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".input-group > .form-control").type(couponCodeOne);
    cy.get("#button-addon2").click();

    cy.get(".input-group > .form-control").type(couponCodeTwo);
    cy.get("#button-addon2").click();
    cy.get(".alert.alert-danger").should(
      "contains.text",
      "Não é possível adicionar mais cupons ao pedido.",
    );
  });

  it("Pagamento com cupom e cartão, porem ainda não paga toda a compra.", function () {
    const order = ordersFixtures[8];
    cy.createOrder(order);
    const couponCode = "CUPOM-DE-DESCONTO";
    const couponUUID = faker.string.uuid();
    const couponValue = parseInt((order.orders[0].totalPrice - 10).toFixed(2));
    const missingValue = order.orders[0].totalPrice - couponValue;
    cy.createCoupon({
      coupon: {
        code: couponCode,
        id: couponUUID,
        description: "Cupom de desconto",
        type: "discount",
        value: couponValue,
      },
    });

    const [card] = cardsFixtures;
    cy.createCard([
      {
        card,
        customer_id: customer.id,
      },
    ]);

    cy.setCookie("orderId", order.orders[0].id);
    cy.visit("http://localhost:3000/checkout/payment");
    cy.get(".input-group > .form-control").type(couponCode);
    cy.get("#button-addon2").click();
    cy.get(".totalPrice").should(
      "contains.text",
      utils.formatMoney(missingValue / 100),
    );
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponCode} - Valor Abatido: ${utils.formatMoney((couponValue / 100) * -1)}`,
    );
    cy.get(".discount").should(
      "contains.text",
      utils.formatMoney((couponValue / 100) * -1),
    );

    cy.get("#addCard").click();

    cy.get("button.pay").click();

    cy.get(".alert").should(
      "contains.text",
      "O valor dos cartões não é suficiente para pagar o pedido",
    );
  });

  it("Tentar pagar uma compra menor que 10 reais. Usando um cartão no valor menor que 10 reais", function () {
    const order = ordersFixtures[8];
    const [card] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card,
        customer_id: customer.id,
      },
    ]);
    cy.setCookie("orderId", order.orders[0].id);
    cy.visit("http://localhost:3000/checkout/payment");
    // Seleciona o cartão
    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(card.number)} - ${utils.parseCardFlag(card.flag)}`,
    );
    // Digita um valor menor de 10 reais
    cy.get("#value").type("1.00");
    cy.get("#addCard").click();
    // Verificar se um alert do js foi disparado
    cy.on("window:alert", (str) => {
      expect(str).to.include(
        `Valor mínimo para pagamento é de ${utils.formatMoney(10)}`,
      );
    });
  });

  it("Pagamento múltiplos cupons e múltiplos cartões sendo que o valor da compra após os cupons é menor que 10 reais", function () {
    // Criar Um Cupon com valor da compra menos 20
    const order = ordersFixtures[8];
    cy.createOrder(order);
    const couponOneCode = "CUPOM-DE-DESCONTO-1";
    const couponOneUUID = faker.string.uuid();
    const couponOneValue = order.orders[0].totalPrice - 2000;
    cy.createCoupon({
      coupon: {
        code: couponOneCode,
        id: couponOneUUID,
        description: "Cupom de desconto",
        type: "discount",
        value: couponOneValue,
      },
    });

    // Cria um Outro cupom com valor de 20 - 8
    const couponTwoCode = "CUPOM-DE-DESCONTO-2";
    const couponTwoUUID = faker.string.uuid();
    const couponTwoValue = (20 - 8) * 100;
    cy.createCoupon({
      coupon: {
        code: couponTwoCode,
        id: couponTwoUUID,
        description: "Cupom de desconto",
        type: "discount",
        value: couponTwoValue,
      },
    });
    // Valor restante a ser pago em cada cartão
    const cardValue = (8 * 100) / 2;
    // Criar dois cartões
    const [cardOne, cardTwo] = cardsFixtures;
    cy.createCard([
      {
        card: cardOne,
        customer_id: customer.id,
      },
      {
        card: cardTwo,
        customer_id: customer.id,
      },
    ]);

    cy.setCookie("orderId", order.orders[0].id);

    cy.visit("http://localhost:3000/checkout/payment");

    // Usa o cupom
    cy.get(".input-group > .form-control").type(couponOneCode);
    cy.get("#button-addon2").click();

    // Usa o segundo cupom
    cy.get(".input-group > .form-control").type(couponTwoCode);
    cy.get("#button-addon2").click();

    // Paga com o primeiro cartão
    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(cardOne.number)} - ${utils.parseCardFlag(cardOne.flag)}`,
    );
    cy.get("#value").type(cardValue.toFixed(2));
    cy.get("#addCard").click();

    // Paga com o segundo cartão
    cy.get(".cardSelect").select(
      `${utils.formatCardNumber(cardTwo.number)} - ${utils.parseCardFlag(cardTwo.flag)}`,
    );
    cy.get("#value").clear().type(cardValue.toFixed(2));
    cy.get("#addCard").click();

    cy.get("button.pay").click();

    // Verifica o Status
    cy.get(".status").should("contains.text", "Em processamento");

    // Verifica os dois cartões
    cy.get(".card").should(
      "contains.text",
      `${utils.formatCardNumber(cardOne.number)} - ${utils.parseCardFlag(cardOne.flag)} - ${utils.formatMoney(cardValue / 100)}`,
    );
    cy.get(".card").should(
      "contains.text",
      `${utils.formatCardNumber(cardTwo.number)} - ${utils.parseCardFlag(cardTwo.flag)} - ${utils.formatMoney(cardValue / 100)}`,
    );

    // Verifica os cupons
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponOneCode} - Valor Abatido: ${utils.formatMoney((couponOneValue / 100) * -1)}`,
    );
    cy.get(".d-flex > .mb-0").should(
      "contains.text",
      `Cupom de Desconto: ${couponTwoCode} - Valor Abatido: ${utils.formatMoney((couponTwoValue / 100) * -1)}`,
    );
  });
});
