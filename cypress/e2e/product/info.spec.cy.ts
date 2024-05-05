/// <reference types="cypress" />

import { booksFixtures } from "../../fixtures/books";
import * as utils from "../../utils";

function escapeTextAndSanitize(text: string): string {
  return text.replace(/\n/g, "").replace(/\s+/g, " ").trim();
}

describe("Informações sobre o produto", function () {
  const [books] = booksFixtures;
  beforeEach(() => {
    cy.downDatabase();
    cy.createBook(books);
  });

  it("Verifica dados do livro", function () {
    const book = books.books.find((book) => book.title.includes("Kaguya"));
    if (book == null) throw new Error("Book not found");
    const skus = books.booksSkus.filter((sku) => sku.bookId === book.id);
    const sku = utils.getRandomItemFromArray(skus);
    const bookAuthorsIds = books.booksAuthors
      .filter((author) => author.bookId === book.id)
      .map((author) => author.authorId);
    const authors = books.authors.filter((author) =>
      bookAuthorsIds.includes(author.id),
    );
    const bookCategoriesIds = books.booksCategories
      .filter((category) => category.bookId === book.id)
      .map((category) => category.categoryId);
    const categories = books.categories.filter((category) =>
      bookCategoriesIds.includes(category.id),
    );
    cy.visit(`http://localhost:3000/books/${sku.id}`);
    cy.get(".book-name").should("contain.text", sku.title);
    cy.get("div.col-6 > :nth-child(2)").should(
      "contains.text",
      escapeTextAndSanitize(utils.getFirstWords(sku.description, 10)),
    );
    cy.get(".mb-0")
      .invoke("text")
      .then((text) => {
        const pdpAuthors = text.replace("Autores: ", "").split(", ");
        expect(pdpAuthors).to.have.length(authors.length);
        authors.forEach((author) => {
          expect(pdpAuthors).to.include(author.name);
        });
      });

    cy.get("div.col-6 > :nth-child(4)")
      .invoke("text")
      .then((text) => {
        const pdpCategories = text.replace("Categorias: ", "").split(", ");
        expect(pdpCategories).to.have.length(categories.length);
        categories.forEach((category) => {
          expect(pdpCategories).to.include(category.name);
        });
      });

    cy.get(".book-price").should(
      "contain.text",
      utils.formatMoney(sku.price / 100),
    );
    cy.get("img.mx-auto").should("have.attr", "src", `${sku.cover}.512.jpg`);
  });
});
