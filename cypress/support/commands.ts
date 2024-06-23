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
Cypress.Commands.add("login", (email, password) => {
  cy.clearCookie("connect.sid");
  cy.visit("http://localhost:3000/login?redirectTo=/");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get("form").submit();
});
