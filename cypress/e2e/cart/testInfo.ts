/// <reference types="cypress" />

import { booksFixtures } from "../../fixtures/books";
import { ordersFixtures } from "../../fixtures/orders";
import * as utils from "../../utils";

export default function testInfo(): void {
  const order = ordersFixtures[6];
  const [books] = booksFixtures;
  const sku = books.booksSkus.find(
    (sku) => sku.id === order.orderItem[0].skuId,
  );
  if (sku == null) throw new Error("Sku not found");
  const book = books.books.find((book) => book.id === sku.bookId);
  if (book == null) throw new Error("Book not found");
  beforeEach(function () {
    cy.downDatabase();
    cy.createBook(books);
    cy.createOrder(order);
    cy.setCookie("orderId", order.orders[0].id);
  });

  it("Verifica Infomações", function () {
    cy.visit("http://localhost:3000/checkout/cart");
    cy.get(".cart-item-title").first().should("contains.text", sku.title);

    cy.get(".cart-item-price")
      .first()
      .should(
        "contains.text",
        `Preço Unitário: ${utils.formatMoney(sku.price / 100)}`,
      );

    const precoSubtotal = utils.formatMoney(
      (sku.price / 100) * order.orderItem[0].quantity,
    );

    cy.get(".cart-item-subtotal")
      .first()
      .should("contains.text", `Subtotal: ${precoSubtotal}`);

    cy.get(".total-price").should("contain.text", `Total: ${precoSubtotal}`);
  });
}
