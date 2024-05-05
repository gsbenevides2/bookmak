/// <reference types="cypress" />

import { booksFixtures } from "../../fixtures/books";

describe("Item", function () {
  beforeEach(() => {
    const [books] = booksFixtures;
    cy.downDatabase();
    cy.createBook(books);
  });

  it("Entrar na PDP", function () {
    cy.visit("http://localhost:3000");
    // Pega o primeiro livro da vitrine
    cy.get(".book-shelf-item").first().as("firstBook");

    // Pega o nome  do livro
    cy.get("@firstBook")
      .find(".book-shelf-item-title")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("nomeVitrine");
        cy.log("Nome do livro: " + text);
      });

    // Pega o preço do livro
    cy.get("@firstBook")
      .find(".book-shelf-item-price")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("precoVitrine");
        cy.log("Preço do livro: " + text);
      });

    // Clica no botão de comprar
    cy.get("@firstBook").find(".btn").click();

    // Verifica se o nome e o preço do livro na página de detalhes é o mesmo que o livro na vitrine
    cy.get("@nomeVitrine").then((nomeVitrine) => {
      cy.get(".book-name").should("contains.text", nomeVitrine);
    });
    cy.get("@precoVitrine").then((precoVitrine) => {
      cy.get(".book-price").should("contains.text", precoVitrine);
    });
  });
});
