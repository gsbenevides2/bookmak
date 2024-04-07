/// <reference types="cypress" />

import { Customer } from "../plugins/db";

describe("Alteração de Status", function () {
  beforeEach(function () {
    cy.task("db:down");
    cy.task<Customer>("db:createDemoCustomer").then((user) => {
      cy.wrap(user).as("user");
    });
    cy.task<Customer>("db:createDemoAdmin").then((admin) => {
      cy.wrap(admin).as("admin");
    });
    cy.task("mock:clear");
  });

  it("Aprovar Pagamento", function () {
    cy.task("mock:set", "processing.json");
    cy.get<Customer>("@admin").then((admin) => {
      cy.setCookie("accountId", admin.id);
    });
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".aprovePayment").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Pagamento aprovado");
    cy.visit("http://localhost:3000");
    cy.get<Customer>("@user").then((user) => {
      cy.setCookie("accountId", user.id);
    });
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Pagamento aprovado");
  });
  it("Reprovar Pagamento", function () {
    cy.task("mock:set", "processing.json");
    cy.get<Customer>("@admin").then((admin) => {
      cy.setCookie("accountId", admin.id);
    });
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".rejectPayment").click();
    cy.get(".form-control").type(
      "A operadora de cartão não aprovou o pagamento",
    );
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Pagamento recusado");
    cy.get(".statusObs").should(
      "contains.text",
      "A operadora de cartão não aprovou o pagamento",
    );
    cy.visit("http://localhost:3000");
    cy.get<Customer>("@user").then((user) => {
      cy.setCookie("accountId", user.id);
    });
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Pagamento recusado");
    cy.get(".statusObs").should(
      "contains.text",
      "A operadora de cartão não aprovou o pagamento",
    );
  });
  it("Inciar Preparação", function () {
    cy.task("mock:set", "payment_aproved.json");
    cy.get<Customer>("@admin").then((admin) => {
      cy.setCookie("accountId", admin.id);
    });
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".startPreparing").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Em preparação");
    cy.visit("http://localhost:3000");
    cy.get<Customer>("@user").then((user) => {
      cy.setCookie("accountId", user.id);
    });
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Em preparação");
  });
  it("Enviar Pedido", function () {
    cy.task("mock:set", "preparing.json");
    cy.get<Customer>("@admin").then((admin) => {
      cy.setCookie("accountId", admin.id);
    });
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".sendOrder").click();
    cy.get('[name="transporter"]').type("Correios");
    cy.get('[name="trackingCode"]').type("BR123456789BR");
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Em transporte");
    cy.get(".statusObs").should("contains.text", "Correios");
    cy.get(".statusObs").should("contains.text", "BR123456789BR");
    cy.visit("http://localhost:3000");
    cy.get<Customer>("@user").then((user) => {
      cy.setCookie("accountId", user.id);
    });
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Em transporte");
    cy.get(".statusObs").should("contains.text", "Correios");
    cy.get(".statusObs").should("contains.text", "BR123456789BR");
  });
  it("Confirmar Entrega", function () {
    cy.task("mock:set", "sending.json");
    cy.get<Customer>("@admin").then((admin) => {
      cy.setCookie("accountId", admin.id);
    });
    cy.visit("http://localhost:3000");
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/admin"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".sendedOrder").click();
    cy.get("form > .btn").click();
    cy.get(".status").should("have.text", "Entregue");
    cy.visit("http://localhost:3000");
    cy.get<Customer>("@user").then((user) => {
      cy.setCookie("accountId", user.id);
    });
    cy.get('[href="/accounts/me"]').click();
    cy.get('[href="/accounts/me/orders"]').click();
    cy.get(".mt-3 > .btn").click();
    cy.get(".status").should("have.text", "Entregue");
  });
});
