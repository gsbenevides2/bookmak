/// <reference types="cypress" />
import { type Customer } from "../plugins/database/downDatabase";

describe("Fluxo de Troca", function () {
  beforeEach(function () {
    cy.task("db:down");
    cy.task("mock:clear");
    cy.task<Customer>("db:createDemoCustomer").then((user) => {
      cy.wrap(user).as("user");
    });
    cy.task<Customer>("db:createDemoAdmin").then((admin) => {
      cy.wrap(admin).as("admin");
    });
    cy.task("mock:set", "sended.json");
  });
  it("Fazer um pedido de troca", function () {
    cy.get<Customer>("@user").then((user) => {
      cy.setCookie("accountId", user.id);
    });
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".change").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Em troca");
  });

  it("Aprovar troca", function () {
    cy.get<Customer>("@admin").then((admin) => {
      cy.setCookie("accountId", admin.id);
    });
    cy.task("mock:set", "exchanging.json");
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".aproveExchange").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Trocado");
  });

  it("Reprovar troca", function () {
    cy.get<Customer>("@admin").then((admin) => {
      cy.setCookie("accountId", admin.id);
    });
    cy.task("mock:set", "exchanging.json");
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".rejectExchange").click();
    cy.get(".form-control").type("O livro não está em condições de troca");
    cy.get("form > .btn").click();
    cy.get(".status").should("contain.text", "Troca recusada");
    cy.get(".statusObs").should(
      "contain.text",
      "O livro não está em condições de troca",
    );
  });
});
