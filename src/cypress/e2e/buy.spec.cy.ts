/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("compra", () => {
  it("efetuar um pedido", async () => {
    const qtdDeLivros = faker.number.int({
      min: 1,
      max: 3,
    });

    let nomeVitrine = "";
    let precoVitrine = "";

    cy.visit("http://localhost:3000")
      .get(".book-shelf-item")
      .then((books) => {
        // Pega o primeiro livro da vitrine e clica no botão de comprar
        const firstBook = books.first();
        nomeVitrine = firstBook.find(".book-shelf-item-title").text();
        precoVitrine = firstBook.find(".book-shelf-item-price").text();
        return cy.wrap(firstBook).find(".btn").click();
      })
      .then(() => {
        // Verica se o nome e o preço do livro na vitrine é o mesmo que o livro na página de detalhes
        cy.get(".book-name").should("contains.text", nomeVitrine);
        cy.get(".book-price").should("contains.text", precoVitrine);
        cy.get("input#quantity").clear().type(qtdDeLivros.toString());
        return cy.get(".buy-button").click();
      })
      .then(() => {
        // Verifica se o nome e o preço do livro na página de detalhes é o mesmo que o livro no carrinho
        cy.get(".cart-item-title").first().should("contains.text", nomeVitrine);
        cy.get(".cart-item-price")
          .first()
          .should("contains.text", `Preço Unitário: ${precoVitrine}`);
        cy.get(".cart-item-quantity")
          .first()
          .should("contains.text", `Quantidade: ${qtdDeLivros}`);
        const precoVitrineFloat = parseFloat(precoVitrine.replace("R$ ", ""));
        const precoSubtotal = (precoVitrineFloat * qtdDeLivros).toFixed(2);
        cy.get(".cart-item-subtotal")
          .first()
          .should("contains.text", `Subtotal: R$ ${precoSubtotal}`);
      });
  });
});
