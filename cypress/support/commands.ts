/// <reference types="cypress" />

import { type CreateUserResponse } from "../plugins/database/createUser";
import {
  type AuthorFixtureData,
  type CategoryFixtureData,
  type BookFixtureData,
  type BookAuthorFixtureData,
  type BookCategoryFixtureData,
  type BookSkuFixtureData,
  type AddressFixtureData,
  type UserFixtureData,
  type CardFixtureData,
} from "../typings/fixtures";

Cypress.Commands.add("populateBooks", () => {
  Promise.all([
    cy.fixture<AuthorFixtureData[]>("authors/authors"),
    cy.fixture<CategoryFixtureData[]>("categories/categories"),
    cy.fixture<BookFixtureData[]>("books/books"),
    cy.fixture<BookAuthorFixtureData[]>("book_authors/book_authors"),
    cy.fixture<BookCategoryFixtureData[]>("book_categories/book_categories"),
    cy.fixture<BookSkuFixtureData[]>("book_skus/book_skus"),
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

Cypress.Commands.add("createDemoCustomer", (autenticated = true) => {
  cy.fixture<UserFixtureData>("users/01").then((user) => {
    cy.fixture<AddressFixtureData>("addresses/01").then((address) => {
      cy.task<CreateUserResponse>("db:createUser", {
        userData: user,
        addressData: address,
      }).then((data) => {
        if (autenticated) cy.setCookie("accountId", data.userId);
        cy.wrap(data.userId).as("accountId");
        cy.wrap(user).as("user");
        cy.wrap(address).as("address");
      });
    });
  });
});

Cypress.Commands.add("createDemoAdmin", (autenticated = true) => {
  cy.fixture<UserFixtureData>("users/02").then((user) => {
    cy.fixture<AddressFixtureData>("addresses/02").then((address) => {
      cy.task<CreateUserResponse>("db:createUser", {
        userData: user,
        addressData: address,
      }).then((data) => {
        if (autenticated) cy.setCookie("accountId", data.userId);
        cy.wrap(data.userId).as("accountAdminId");
        cy.wrap(user).as("userAdmin");
        cy.wrap(address).as("addressAdmin");
      });
    });
  });
});

Cypress.Commands.add("addCardToDemoCustomer", () => {
  cy.get<string>("@accountId").then((accountId) => {
    cy.fixture<CardFixtureData>("cards/01").then((card) => {
      cy.task("db:createCard", { cardData: card, customerId: accountId });
      cy.wrap(card).as("card");
    });
  });
});

Cypress.Commands.add("createDemoOrder", () => {
  cy.populateBooks();
  cy.createDemoCustomer();
  cy.addCardToDemoCustomer();
  cy.createDemoAdmin();
});
