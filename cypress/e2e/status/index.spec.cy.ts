/// <reference types="cypress" />

import { addressesFixtures } from "../../fixtures/address";
import { booksFixtures } from "../../fixtures/books";
import { cardsFixtures } from "../../fixtures/card";
import { customersFixtures } from "../../fixtures/customer";
import { ordersFixtures } from "../../fixtures/orders";

describe("Alteração de Status", function () {
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

  it("Aprovar Pagamento", function () {
    const [order] = ordersFixtures;
    cy.createOrder(order);
    cy.setCookie("accountId", admin.id);

    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".aprovePayment").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Pagamento aprovado");
    cy.visit("http://localhost:3000");
    cy.setCookie("accountId", customer.id);
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Pagamento aprovado");
  });

  it("Reprovar Pagamento", function () {
    cy.setCookie("accountId", admin.id);

    const [order] = ordersFixtures;
    cy.createOrder(order);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".rejectPayment").click();
    cy.get(".form-control").type(
      "A operadora de cartão não aprovou o pagamento",
    );
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Pagamento recusado");
    cy.get(".statusObs").should(
      "contains.text",
      "A operadora de cartão não aprovou o pagamento",
    );
    cy.visit("http://localhost:3000");
    cy.setCookie("accountId", customer.id);
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Pagamento recusado");
    cy.get(".statusObs").should(
      "contains.text",
      "A operadora de cartão não aprovou o pagamento",
    );
  });

  it("Inciar Preparação", function () {
    const order = ordersFixtures[1];
    cy.createOrder(order);
    cy.setCookie("accountId", admin.id);

    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".startPreparing").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Em preparação");
    cy.visit("http://localhost:3000");

    cy.setCookie("accountId", customer.id);

    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Em preparação");
  });

  it("Enviar Pedido", function () {
    cy.setCookie("accountId", admin.id);
    const order = ordersFixtures[2];
    cy.createOrder(order);
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".sendOrder").click();
    cy.get('[name="transporter"]').type("Correios");
    cy.get('[name="trackingCode"]').type("BR123456789BR");
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Em transporte");
    cy.get(".statusObs").should("contains.text", "Correios");
    cy.get(".statusObs").should("contains.text", "BR123456789BR");
    cy.visit("http://localhost:3000");

    cy.setCookie("accountId", customer.id);

    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Em transporte");
    cy.get(".statusObs").should("contains.text", "Correios");
    cy.get(".statusObs").should("contains.text", "BR123456789BR");
  });

  it("Confirmar Entrega", function () {
    const order = ordersFixtures[3];
    cy.createOrder(order);
    cy.setCookie("accountId", admin.id);

    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".sendedOrder").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Entregue");
    cy.visit("http://localhost:3000");
    cy.setCookie("accountId", customer.id);

    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Entregue");
  });
});
