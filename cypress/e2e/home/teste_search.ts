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
}
