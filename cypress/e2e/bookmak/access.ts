/// <reference types="cypress" />

import { addressesFixtures } from "../../fixtures/address";
import { bookmarkFixtures } from "../../fixtures/bookmark";
import { booksFixtures } from "../../fixtures/books";
import { customersFixtures } from "../../fixtures/customer";
import { ordersFixtures } from "../../fixtures/orders";

import { faker } from "@faker-js/faker";
export default function access(): void {
  const order = ordersFixtures[6];
  const [customer] = customersFixtures;
  const [address] = addressesFixtures;

  const [books] = booksFixtures;
  const sku = books.booksSkus.find(
    (sku) => sku.id === order.orderItem[0].skuId,
  );
  if (sku == null) throw new Error("Sku not found");
  const book = books.books.find((book) => book.id === sku.bookId);
  if (book == null) throw new Error("Book not found");

  beforeEach(function () {
    cy.downDatabase();
    cy.createCustomer([
      {
        customer,
        address,
      },
    ]);

    cy.createBook(books);
    cy.createOrder(order);
    cy.setCookie("orderId", order.orders[0].id);
  });

  it("Acesso ao Bookmak", function () {
    cy.visit("http://localhost:3000/checkout/cart");
    // Continua a compra
    cy.get(".continue-btn").click();
    // Aguarda o termino da request
    cy.wait(1000);
    // Loga
    cy.get("input[name='email']").type(customer.email);
    cy.get("input[name='password']").type(customer.password);
    const [bookmarks] = bookmarkFixtures;

    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    cy.get("button[type='submit']").click();

    // Aguarda o termino da request
    cy.wait(1000);

    cy.url().should("be.equal", "http://localhost:3000/checkout/bookmark");
  });

  it("Erro: Não seleciona nada", function () {
    cy.setCookie("accountId", customer.id);
    const [bookmarks] = bookmarkFixtures;

    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    // Aguarda o termino da request
    cy.wait(1000);
    cy.visit("http://localhost:3000/checkout/bookmark");
    cy.get("button[type='submit']").click();
    cy.get("#errorAlert")
      .should("be.visible")
      .should("contain.text", "Escolha um estilo de marca página");
  });

  it("Erro: Seleciona somente um estilo", function () {
    cy.setCookie("accountId", customer.id);
    const [bookmarks] = bookmarkFixtures;
    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    cy.visit("http://localhost:3000/checkout/bookmark");
    // Aguarda o termino da request
    cy.wait(1000);
    // Seleciona um estilo de marca-página
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
    cy.get("button[type='submit']").click();
    cy.get("#errorAlert")
      .should("be.visible")
      .should("contain.text", "Escolha um texto para o marca página");
  });

  it("Erro: Seleciona somente um texto", function () {
    cy.setCookie("accountId", customer.id);
    const [bookmarks] = bookmarkFixtures;
    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    cy.visit("http://localhost:3000/checkout/bookmark");
    // Aguarda o termino da request
    cy.wait(1000);
    // Seleciona um texto de marca-página
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
    cy.get("button[type='submit']").click();
    cy.get("#errorAlert")
      .should("be.visible")
      .should("contain.text", "Escolha um estilo de marca página");
  });

  it("Erro: Digita somente um texto", function () {
    cy.setCookie("accountId", customer.id);
    const [bookmarks] = bookmarkFixtures;
    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    cy.visit("http://localhost:3000/checkout/bookmark");
    // Aguarda o termino da request
    cy.wait(1000);
    const randomPharse = faker.lorem.paragraph({
      min: 1,
      max: 5,
    });
    cy.get("#text-bookmark").type(randomPharse);
    cy.get("button[type='submit']").click();
    cy.get("#errorAlert")
      .should("be.visible")
      .should("contain.text", "Escolha um estilo de marca página");
  });

  it("Erro: Carrinho Vazio", function () {
    cy.setCookie("accountId", customer.id);
    cy.clearCookie("orderId");
    cy.visit("http://localhost:3000");
    cy.visit("http://localhost:3000/checkout/bookmark");
    cy.wait(1000);
    cy.get("#errorAlert")
      .should("be.visible")
      .should("contain.text", "Esse pedido não possui itens.");
  });

  it("Erro: Digita mais de 200 caracteres", function () {
    cy.setCookie("accountId", customer.id);
    const [bookmarks] = bookmarkFixtures;
    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    cy.visit("http://localhost:3000/checkout/bookmark");
    // Aguarda o termino da request
    cy.wait(1000);
    // Seleciona um estilo de marca-página
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
    const randomPharse = faker.lorem.paragraph({
      min: 6,
      max: 6,
    });
    cy.get("#text-bookmark").type(randomPharse);
    cy.get("button[type='submit']").click();
    cy.get("#errorAlert")
      .should("be.visible")
      .should(
        "contain.text",
        "O texto do marcador não pode ter mais de 200 caracteres.",
      );
  });

  it("Sucesso: Escolhe o estilo e o texto", function () {
    cy.setCookie("accountId", customer.id);
    const [bookmarks] = bookmarkFixtures;
    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    cy.visit("http://localhost:3000/checkout/bookmark");
    // Aguarda o termino da request
    cy.wait(1000);
    // Seleciona um estilo de marca-página
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
    // Seleciona um texto de marca-página
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
    cy.get("button[type='submit']").click();
    cy.wait(1000);
    cy.url().should("not.be.equal", "http://localhost:3000/checkout/bookmark");
  });

  it("Sucesso: Escolhe estilo e digita o texto", function () {
    cy.setCookie("accountId", customer.id);
    const [bookmarks] = bookmarkFixtures;
    cy.intercept("/checkout/bookmark/getInfo", bookmarks);

    cy.visit("http://localhost:3000/checkout/bookmark");
    // Aguarda o termino da request
    cy.wait(1000);
    // Seleciona um estilo de marca-página
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
    const randomPharse = faker.lorem.paragraph({
      min: 1,
      max: 3,
    });
    cy.get("#text-bookmark").type(randomPharse);
    cy.get("button[type='submit']").click();
    cy.wait(1000);
    cy.url().should("not.be.equal", "http://localhost:3000/checkout/bookmark");
  });
}
