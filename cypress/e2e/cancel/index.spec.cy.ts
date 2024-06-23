/// <reference types="cypress" />

import { addressesFixtures } from "../../fixtures/address";
import { booksFixtures } from "../../fixtures/books";
import { cardsFixtures } from "../../fixtures/card";
import { customersFixtures } from "../../fixtures/customer";
import { ordersFixtures } from "../../fixtures/orders";
import * as utils from "../../utils";

describe("Fluxo de Cancelamento", function () {
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
        is_admin: true,
      },
    ]);
    cy.createCard([
      {
        card,
        customer_id: customer.id,
      },
    ]);
    cy.createBook(books);

    cy.login(customer.email, customer.password);
  });

  it("Fazer um pedido de cancelamento, sem o produto ter sido enviado", function () {
    const order = ordersFixtures[1];
    cy.createOrder(order);
    cy.setCookie("accountId", customer.id);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(
      '[href="/accounts/me/orders/f30640a6-8453-469e-a551-b0d14ff6955a/cancel"]',
    ).click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Cancelado");
    cy.visit("http://localhost:3000/accounts/me/coupons");
    cy.get("#couponValueValue").should(
      "contain.text",
      utils.formatMoney(order.orders[0].totalPrice / 100),
    );
  });
  it("Fazer um pedido de cancelamento, com o produto enviado", function () {
    const order = ordersFixtures[4];
    cy.createOrder(order);
    cy.setCookie("accountId", customer.id);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(
      '[href="/accounts/me/orders/f30640a6-8453-469e-a551-b0d14ff6955a/cancel"]',
    ).click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Cancelando");
  });

  it("Admin Aprovar Cancelamento", function () {
    const order = ordersFixtures[10];
    cy.createOrder(order);

    cy.login(admin.email, admin.password);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get('[href="/admin/orders"]').click();
    cy.get(":nth-child(7) > .btn").click();
    cy.get('.btn:contains("Aprovar Cancelamento")').click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Cancelado");

    cy.login(customer.email, customer.password);
    cy.visit(`http://localhost:3000/accounts/me/orders/${order.orders[0].id}`);
    cy.get(".status").should("contain.text", "Cancelado");
    cy.visit("http://localhost:3000/accounts/me/coupons");
    cy.get("#couponValueValue").should(
      "contain.text",
      utils.formatMoney(order.orders[0].totalPrice / 100),
    );
  });

  it("Admin Reprovar cancelamento", function () {
    const order = ordersFixtures[10];
    cy.createOrder(order);

    cy.login(admin.email, admin.password);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get('[href="/admin/orders"]').click();
    cy.get(":nth-child(7) > .btn").click();
    cy.get('.btn:contains("Rejeitar Cancelamento")').click();
    cy.get(".form-control").type(
      "O livro não está em condições de cancelamento",
    );
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Cancelamento recusado");
    cy.get(".statusObs").should(
      "contain.text",
      "O livro não está em condições de cancelamento",
    );
  });
});
