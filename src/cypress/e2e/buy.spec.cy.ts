/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

/*
Colocar a task, para que o banco seja limpo antes de cada teste
Mudar para function para que o this seja acessível
*/

interface User {
  email: string;
  password: string;
}

describe("fluxo de compra", function () {
  beforeEach(function () {
    cy.task("db:createDemoCustomer:down");
    cy.task("db:createDemoCustomer:up").then((user) => {
      cy.wrap(user).as("user");
    });
  });
  it("Ir para página de produto", function () {
    cy.visit("http://localhost:3000");
    // Pega o primeiro livro da vitrine
    cy.get(".book-shelf-item").first().as("firstBook");

    // Pega o nome  do livro
    cy.get("@firstBook")
      .find(".book-shelf-item-title")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("nomeVitrine");
        cy.log("Nome do livro: " + text);
      });

    // Pega o preço do livro
    cy.get("@firstBook")
      .find(".book-shelf-item-price")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("precoVitrine");
        cy.log("Preço do livro: " + text);
      });

    // Clica no botão de comprar
    cy.get("@firstBook").find(".btn").click();

    // Verifica se o nome e o preço do livro na página de detalhes é o mesmo que o livro na vitrine
    cy.get("@nomeVitrine").then((nomeVitrine) => {
      cy.get(".book-name").should("contains.text", nomeVitrine);
    });
    cy.get("@precoVitrine").then((precoVitrine) => {
      cy.get(".book-price").should("contains.text", precoVitrine);
    });

    // Adiciona um livro ao carrinho
    const qtdDeLivros = faker.number.int({
      min: 1,
      max: 3,
    });

    cy.get("input#quantity").clear().type(qtdDeLivros.toString());
    cy.get(".buy-button").click();

    // Verifica se o nome e o preço do livro na página de detalhes é o mesmo que o livro no carrinho
    cy.get("@nomeVitrine").then((nomeVitrine) => {
      cy.get(".cart-item-title").first().should("contains.text", nomeVitrine);
    });
    cy.get<string>("@precoVitrine").then((precoVitrine) => {
      cy.get(".cart-item-price")
        .first()
        .should("contains.text", `Preço Unitário: ${precoVitrine}`);

      const precoVitrineFloat = parseFloat(precoVitrine.replace("R$ ", ""));

      const precoSubtotal = (precoVitrineFloat * qtdDeLivros).toFixed(2);

      cy.get(".cart-item-subtotal")
        .first()
        .should("contains.text", `Subtotal: R$ ${precoSubtotal}`);

      cy.get(".total-price").should(
        "contain.text",
        `Total: R$ ${precoSubtotal}`,
      );
    });

    // Continua a compra
    cy.get(".continue-btn").click();

    // Escolhe um estilo de marca página
    cy.get("#style-bookmark")
      .find("option")
      .then((listing) => {
        const randonIndex = faker.number.int({
          min: 1,
          max: listing.length - 1,
        });
        const estiloSelecionado = listing.eq(randonIndex).text();
        cy.wrap(estiloSelecionado).as("estiloSelecionado");
        cy.get("#style-bookmark").select(randonIndex);
      });

    // Escolhe um texto gerado por IA
    cy.get("input[name='text']").then((inputs) => {
      const randomIndex = faker.number.int({
        min: 1,
        max: inputs.length - 1,
      });

      const input = inputs.eq(randomIndex);
      const textoMarcaPagina = input.val() as string;
      cy.wrap(textoMarcaPagina).as("textoMarcaPagina");
      cy.wrap(input).check();
    });

    // Continua a compra
    cy.get("button[type='submit']").click();

    // Loga o cliente
    cy.get<User>("@user").then((user) => {
      cy.get("input[name='email']").type(user.email);
      cy.get("input[name='password']").type(user.password);
      cy.get("button[type='submit']").click();
    });
  });

  afterEach(function () {
    cy.task("db:createDemoCustomer:down");
  });
});
