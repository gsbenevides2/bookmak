/// <reference types="cypress" />

import {
  type AuthorFixureData,
  type CategoryFixureData,
  type BookFixureData,
  type BookAuthorFixureData,
  type BookCategoryFixureData,
  type BookSkuFixureData,
} from "../typings/fixures";

Cypress.Commands.add("populateBooks", () => {
  Promise.all([
    cy.fixture<AuthorFixureData[]>("authors/authors"),
    cy.fixture<CategoryFixureData[]>("categories/categories"),
    cy.fixture<BookFixureData[]>("books/books"),
    cy.fixture<BookAuthorFixureData[]>("book_authors/book_authors"),
    cy.fixture<BookCategoryFixureData[]>("book_categories/book_categories"),
    cy.fixture<BookSkuFixureData[]>("book_skus/book_skus"),
  ])
    .then(
      ([authors, categories, books, bookAuthors, bookCategories, bookSkus]) => {
        cy.task("db:populateBooks", {
          authors,
          categories,
          books,
          bookAuthors,
          bookCategories,
          bookSkus,
        });
      },
    )
    .catch(() => {});
});
