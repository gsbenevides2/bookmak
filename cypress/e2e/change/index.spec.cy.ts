/// <reference types="cypress" />

import { addressesFixtures } from "../../fixtures/address";
import { booksFixtures } from "../../fixtures/books";
import { cardsFixtures } from "../../fixtures/card";
import { customersFixtures } from "../../fixtures/customer";
import { ordersFixtures } from "../../fixtures/orders";
import * as utils from "../../utils";
describe("Fluxo de Troca", function () {
  const [customer, admin] = customersFixtures;
  beforeEach(function () {
    const [addressCustomer, addressAdmin] = addressesFixtures;
    const [card] = cardsFixtures;
    const [books] = booksFixtures;
    cy.downDatabase();
    cy.createCustomer([
      {
        customer,
        address: addressCustomer,
      },
    ]);
    cy.createCustomer([
      {
        customer: admin,
        address: addressAdmin,
        isAdmin: true,
      },
    ]);
    cy.createCard([
      {
        card,
        customerId: customer.id,
      },
    ]);
    cy.createBook(books);
    cy.setCookie("accountId", customer.id);
  });

  it("Fazer um pedido de troca", function () {
    const order = ordersFixtures[4];
    cy.createOrder(order);
    cy.setCookie("accountId", customer.id);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(
      '[href="/accounts/me/orders/f30640a6-8453-469e-a551-b0d14ff6955a/change"]',
    ).click();
    for (const item of order.orderItem) {
      cy.get(`input[name="quantity[${item.id}]"]`)
        .clear()
        .type((item.quantity - 1).toString());
    }
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Em troca");
    cy.get(".badge").should("contain.text", "1 Item(s) Em Troca");
  });

  it("Aprovar troca: Todos os Items", function () {
    const order = ordersFixtures[5];
    cy.createOrder(order);
    cy.setCookie("accountId", admin.id);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".aproveExchange").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Trocado");
    cy.setCookie("accountId", customer.id);
    cy.visit(`http://localhost:3000/accounts/me/orders/${order.orders[0].id}`);
    cy.get(".status").should("contain.text", "Trocado");
    cy.visit("http://localhost:3000/accounts/me/coupons");
    cy.get("#couponValueValue").should(
      "contain.text",
      utils.formatMoney(order.orders[0].totalPrice / 100),
    );
  });

  it("Aprovar troca: Um dos Items", function () {
    const order = ordersFixtures[9];
    cy.createOrder(order);
    cy.setCookie("accountId", admin.id);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".aproveExchange").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Trocado");
    cy.setCookie("accountId", customer.id);
    cy.visit(`http://localhost:3000/accounts/me/orders/${order.orders[0].id}`);
    cy.get(".status").should("contain.text", "Trocado");
    cy.visit("http://localhost:3000/accounts/me/coupons");
    const value = order.orderItem.reduce(
      (acc, item) => acc + item.unitSellPrice * (item.changeQuantity ?? 0),
      0,
    );
    cy.get("#couponValueValue").should(
      "contain.text",
      utils.formatMoney(value / 100),
    );
  });

  it("Reprovar troca", function () {
    const order = ordersFixtures[5];
    cy.createOrder(order);
    cy.setCookie("accountId", admin.id);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".rejectExchange").click();
    cy.get(".form-control").type("O livro não está em condições de troca");
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Troca recusada");
    cy.get(".statusObs").should(
      "contain.text",
      "O livro não está em condições de troca",
    );
  });
});
