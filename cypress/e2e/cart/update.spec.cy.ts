/// <reference types="cypress" />

import { booksFixtures } from "../../fixtures/books";
import { ordersFixtures } from "../../fixtures/orders";
import * as utils from "../../utils";
import { faker } from "@faker-js/faker";

describe("Atualizações de Carrinho", function () {
  const order = ordersFixtures[6];
  const [books] = booksFixtures;
  const orderItem = order.orderItem[0];
  const sku = books.booksSkus.find((sku) => sku.id === orderItem.skuId);
  if (sku == null) throw new Error("Sku not found");
  const book = books.books.find((book) => book.id === sku.bookId);
  if (book == null) throw new Error("Book not found");
  beforeEach(function () {
    cy.downDatabase();
    cy.createBook(books);
    cy.createOrder(order);
    cy.setCookie("orderId", order.orders[0].id);
  });

  it("Atualiza a quantidade", function () {
    cy.visit("http://localhost:3000/checkout/cart");

    // Adiciona um livro ao carrinho
    const qtdDeLivros = faker.number.int({
      min: orderItem.quantity,
      max: orderItem.quantity + 3,
    });

    cy.get(".form-control").clear().type(qtdDeLivros.toString());
    cy.get(":nth-child(1) > .btn").click();
    cy.get(".cart-item-price")
      .first()
      .should(
        "contains.text",
        `Preço Unitário: ${utils.formatMoney(sku.price / 100)}`,
      );

    const precoSubtotal = utils.formatMoney((sku.price / 100) * qtdDeLivros);

    cy.get(".cart-item-subtotal")
      .first()
      .should("contains.text", `Subtotal: ${precoSubtotal}`);

    cy.get(".total-price").should("contain.text", `Total: ${precoSubtotal}`);
  });

  it("Remove um livro", function () {
    cy.visit("http://localhost:3000/checkout/cart");
    cy.get(".d-flex.mt-2 > .btn").click();
    cy.get(".text-center").should("contain.text", "Seu carrinho está vazio");
  });
});
