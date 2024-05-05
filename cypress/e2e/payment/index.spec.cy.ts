/// <reference types="cypress" />

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

  it("Pagamento Simples: Somente um Cartão", function () {
    const order = ordersFixtures[8];
    const [card] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card,
        customerId: customer.id,
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

  it("Pagamento Simples Erro: Somente um Cartão, com valor menor", function () {
    const order = ordersFixtures[8];
    const [card] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card,
        customerId: customer.id,
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

  it("Pagamento Simples: Dois Cartões", function () {
    const order = ordersFixtures[8];
    const [cardOne, cardTwo] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card: cardOne,
        customerId: customer.id,
      },
      {
        card: cardTwo,
        customerId: customer.id,
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

  it("Pagamento Simples Erro: Dois Cartões, com valor menor", function () {
    const order = ordersFixtures[8];
    const [cardOne, cardTwo] = cardsFixtures;
    cy.createOrder(order);

    cy.createCard([
      {
        card: cardOne,
        customerId: customer.id,
      },
      {
        card: cardTwo,
        customerId: customer.id,
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
});
