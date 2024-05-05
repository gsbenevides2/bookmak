/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import { booksFixtures } from "../../fixtures/books";
import * as utils from "../../utils";

describe("Adicionar ao Carrinho", function () {
  const [books] = booksFixtures;
  beforeEach(() => {
    cy.downDatabase();
    cy.createBook(books);
  });
  it("Adicionar ao carrinho", function () {
    const book = utils.getRandomItemFromArray(books.books);
    const skus = books.booksSkus.filter((sku) => sku.bookId === book.id);
    const sku = utils.getRandomItemFromArray(skus);
    cy.visit(`http://localhost:3000/books/${sku.id}`);
    // Adiciona um livro ao carrinho
    const qtdDeLivros = faker.number.int({
      min: 1,
      max: 3,
    });

    cy.get("input#quantity").clear().type(qtdDeLivros.toString());
    cy.get(".buy-button").click();

    // Verifica se o nome e o preço do livro na página de detalhes é o mesmo que o livro do cadastro
    cy.get(".cart-item-title").first().should("contains.text", sku.title);

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
});
