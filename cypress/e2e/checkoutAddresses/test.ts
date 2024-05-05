/// <reference types="cypress" />

import { addressesFixtures } from "../../fixtures/address";
import { booksFixtures } from "../../fixtures/books";
import { customersFixtures } from "../../fixtures/customer";
import { ordersFixtures } from "../../fixtures/orders";

export default function testAddress(): void {
  const [address] = addressesFixtures;
  beforeEach(function () {
    const [customer] = customersFixtures;
    const [books] = booksFixtures;
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
  it("Escolha de Endereço", function () {
    const order = ordersFixtures[7];
    cy.createOrder(order);
    cy.setCookie("orderId", order.orders[0].id);
    cy.visit("http://localhost:3000/checkout/addresses");

    // Escolhe o endereço de  entrega
    cy.get("#deliveryAddress")
      .find(":selected")
      .should("contain.text", address.nickname);

    cy.get("#billingAddress")
      .find(":selected")
      .should("contain.text", address.nickname);

    cy.get("button[type='submit']").click();
    cy.url().should("be.equal", "http://localhost:3000/checkout/payment");
  });
  it("Erro: Usuário não logado", function () {
    cy.clearCookie("accountId");
    cy.visit("http://localhost:3000/checkout/addresses");
    cy.get(".alert").should("contain.text", "Você precisa estar logado");
  });
  it("Erro: Carrinho vazio", function () {
    cy.visit("http://localhost:3000/checkout/addresses");
    cy.url().should("be.equal", "http://localhost:3000/checkout/cart");
  });
}
