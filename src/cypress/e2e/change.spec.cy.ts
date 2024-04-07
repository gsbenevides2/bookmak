/// <reference types="cypress" />
import { Customer } from "../plugins/db";

describe("fluxo de troca", function () {
  beforeEach(function () {
    cy.task("db:down");
    cy.task("mock:clear");
    cy.task<Customer>("db:createDemoCustomer").then((user) => {
      cy.wrap(user).as("user");
      cy.setCookie("accountId", user.id);
    });

    cy.task("mock:set", "sended.json");
  });
  it("Fluxo de troca: Fazer um pedido de troca", function () {
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".change").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Em troca");
  });
});
