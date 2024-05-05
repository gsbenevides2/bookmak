/// <reference types="cypress" />

Cypress.Commands.add("downDatabase", () => {
  return cy.task("db:downDatabase");
});
Cypress.Commands.add("createCustomer", (data) => {
  return cy.task("db:createCustomer", data);
});
Cypress.Commands.add("createAddress", (data) => {
  return cy.task("db:createAddress", data);
});
Cypress.Commands.add("createCard", (data) => {
  return cy.task("db:createCard", data);
});
Cypress.Commands.add("createBook", (data) => {
  return cy.task("db:createBook", data);
});
Cypress.Commands.add("createOrder", (data) => {
  return cy.task("db:createOrder", data);
});
Cypress.Commands.add("createCoupon", (data) => {
  return cy.task("db:createCoupon", data);
});
