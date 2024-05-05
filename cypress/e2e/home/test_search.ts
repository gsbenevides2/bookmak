/// <reference types="cypress" />

import * as utils from "../../utils";
import { booksFixtures } from "../../fixtures/books";

export default function testSeach(): void {
  const [books] = booksFixtures;
  beforeEach(() => {
    cy.downDatabase();
    cy.createBook(books);
  });

  it("Buscar por nome", function () {
    cy.visit("http://localhost:3000");
    const randomBook = utils.getRandomItemFromArray(books.booksSkus);
    const sanitizedTitle = randomBook.title.replace(/ - Volume \d+/gm, "");
    const randonWordInTtitle = utils.getRandomWordInText(sanitizedTitle);
    cy.get("input[name='searchQuery']").type(randonWordInTtitle);
    cy.get("button:contains('Pesquisar / Filtrar')").click();
    cy.get(".card-title").should("contain.text", randomBook.title);
  });

  it("Buscar por descrição", function () {
    cy.visit("http://localhost:3000");
    const randomBook = utils.getRandomItemFromArray(books.booksSkus);
    const randonWordInDescription = utils.getRandomFisrtWordInText(
      randomBook.description,
      20,
      6,
    );
    cy.get("input[name='searchQuery']").type(randonWordInDescription);
    cy.get("button:contains('Pesquisar / Filtrar')").click();
    cy.get(".card-body :nth-child(3)").should(
      "include.text",
      randonWordInDescription,
    );
  });

  it("Buscar por autor", function () {
    cy.visit("http://localhost:3000");
    const author = utils.getRandomItemFromArray(books.authors);
    cy.get("#filter-author").select(author.name);
    cy.get("button:contains('Pesquisar / Filtrar')").click();
    cy.get(".card-body :nth-child(2)").should("contain.text", author.name);
  });

  it("Buscar por categoria", function () {
    cy.visit("http://localhost:3000");
    const category = utils.getRandomItemFromArray(books.categories);
    const booksCategories = books.booksCategories.filter(
      (bookCategory) => bookCategory.categoryId === category.id,
    );
    const randomBook = utils.getRandomItemFromArray(booksCategories);
    if (randomBook == null) throw new Error("Book not found");
    const book = books.books.find(
      (bookSku) => bookSku.id === randomBook.bookId,
    );
    if (book == null) throw new Error("Book not found");
    cy.get("#filter-category").select(category.name);
    cy.get("button:contains('Pesquisar / Filtrar')").click();
    cy.get(".card-body > .card-title").should("contain.text", book.title);
  });

  it("Busca por Preço", function () {
    cy.visit("http://localhost:3000");
    const randomSku = utils.getRandomItemFromArray(books.booksSkus);
    const price = randomSku.price;
    cy.get("#filter-price-min").type((price / 100).toFixed(2));
    cy.get("#filter-price-max").type((price / 100).toFixed(2));
    cy.get("button:contains('Pesquisar / Filtrar')").click();
    cy.get(".fw-bold").should("contain.text", utils.formatMoney(price / 100));
  });
}
