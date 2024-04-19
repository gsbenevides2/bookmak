import { type CardFixtureData } from "../../typings/fixtures";

export default function clientCardTests(): void {
  beforeEach(function () {
    cy.task("db:down");
    cy.createDemoCustomer();
  });

  it("Cadastrar Cartão", function () {
    cy.fixture<CardFixtureData>("cards/01").then((card) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Cartões')").click();
      cy.get("a:contains('Novo Cartão')").click();
      cy.get("input[name='cardNumber']").type(card.number);
      cy.get("select[name='cardBrand']").select(card.flag);
      cy.get("input[name='cardName']").type(card.holderName);
      cy.get("input[name='cardExpiry']").type(
        `${card.yearOfValidity}-${card.monthOfValidity}`,
      );
      cy.get("input[name='cardCVV']").type(card.cvv);
      cy.get("button:contains('Continuar')").click();
      cy.get("div.col-12 > .mt-3").as("element");

      cy.get("@element")
        .find(":nth-child(1)")
        .should(
          "contain.text",
          "Número do Cartão: ****.****.****." + card.number.slice(-4),
        );
      cy.get("@element")
        .find(":nth-child(2)")
        .should("contain.text", "Bandeira: " + card.flag);
      cy.get("@element")
        .find(":nth-child(3)")
        .should("contain.text", "Nome: " + card.holderName);
      cy.get("@element")
        .find(":nth-child(4)")
        .should(
          "contain.text",
          `Vencimento: ${card.monthOfValidity}/${card.yearOfValidity}`,
        );
      cy.get("@element")
        .find(":nth-child(5)")
        .should("contain.text", "CVV: ***");
      cy.get(".alert").should("contain.text", "Novo cartão cadastrado");
    });
  });

  it("Ver Cartão", function () {
    cy.fixture<CardFixtureData>("cards/01").then((card) => {
      cy.get<string>("@accountId").then((customerId) => {
        cy.task("db:createCard", { cardData: card, customerId });
        cy.wrap(card).as("card");
      });
    });
    cy.get<CardFixtureData>("@card").then((card) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Cartões')").click();
      cy.get("div.col-12 > .mt-3").as("element");

      cy.get("@element")
        .find(":nth-child(1)")
        .should(
          "contain.text",
          "Número do Cartão: ****.****.****." + card.number.slice(-4),
        );
      cy.get("@element")
        .find(":nth-child(2)")
        .should("contain.text", "Bandeira: " + card.flag);
      cy.get("@element")
        .find(":nth-child(3)")
        .should("contain.text", "Nome: " + card.holderName);
      cy.get("@element")
        .find(":nth-child(4)")
        .should(
          "contain.text",
          "Vencimento: " + card.monthOfValidity + "/" + card.yearOfValidity,
        );
      cy.get("@element")
        .find(":nth-child(5)")
        .should("contain.text", "CVV: ***");
    });
  });

  it("Remover Cartão", function () {
    cy.fixture<CardFixtureData>("cards/01").then((card) => {
      cy.get<string>("@accountId").then((customerId) => {
        cy.task("db:createCard", { cardData: card, customerId });
        cy.wrap(card).as("card");
      });
    });

    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("a:contains('Meus Cartões')").click();
    cy.get("div.col-12 > .mt-3").find("button:contains('Excluir')").click();
    cy.get(".alert").should("contain.text", "Cartão removido");
  });
}
