/// <reference types="cypress" />

// import { formatCardNumber, maskCPF } from "../utils";

describe("Fluxo de Compra", function () {
  beforeEach(function () {
    cy.task("db:down");
  });
  it("Fluxo de compra: Desde a vitrine a confirmação.", function () {
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
    const qtdDeLivros = 1;

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
      // Replace all not numbers and commas
      const precoVitrineStr = parseInt(precoVitrine.replace(/[^\d]/g, ""));

      const precoSubtotal = (
        (precoVitrineStr * qtdDeLivros) /
        100
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      cy.get(".cart-item-subtotal")
        .first()
        .should("contains.text", `Subtotal: ${precoSubtotal}`);

      cy.get(".total-price").should("contain.text", `Total: ${precoSubtotal}`);
    });

    // Continua a compra
    cy.get(".continue-btn").click();
    /*
    // Loga o cliente
    cy.get<Customer>("@user").then((user) => {
      cy.get("input[name='email']").type(user.email);
      cy.get("input[name='password']").type(user.password);
      cy.get("button[type='submit']").click();
    });

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
    // Escolhe o endereço de  entrega
    cy.get<Customer>("@user").then((user) => {
      cy.get("#deliveryAddress")
        .find(":selected")
        .should("contain.text", user.addresses[0].nickname);

      cy.get("#billingAddress")
        .find(":selected")
        .should("contain.text", user.addresses[0].nickname);
    });

    cy.get("button[type='submit']").click();

    // Verifica os dados e faz pagamento
    cy.get<string>("@nomeVitrine").then((nomeVitrine) => {
      cy.get(".list-group-item").find("h6").should("have.text", nomeVitrine);
    });

    cy.get<string>("@precoVitrine").then((precoVitrine) => {
      cy.get(".list-group-item").should(
        "contains.text",
        `Preço Unitário: ${precoVitrine}`,
      );

      const precoVitrineStr = parseInt(precoVitrine.replace(/[^\d]/g, ""));

      const precoSubtotal = (
        (precoVitrineStr * qtdDeLivros) /
        100
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      cy.get(".list-group-item").should(
        "contains.text",
        `Subtotal: ${precoSubtotal}`,
      );

      cy.get(".sumarizer .subtotal").should("contains.text", precoSubtotal);
    });

    cy.get<Customer>("@user").then((user) => {
      cy.get(".name").should("contains.text", user.name);
      cy.get(".email").should("contains.text", user.email);
      cy.get(".cpf").should("contains.text", maskCPF(user.cpf));
      cy.get(".deliveryAddressNickname").should(
        "contains.text",
        user.addresses[0].nickname,
      );
      cy.get(".deliveryAddress").should(
        "contains.text",
        user.addresses[0].street,
      );

      cy.get(".billingAddressNickname").should(
        "contains.text",
        user.addresses[0].nickname,
      );

      cy.get(".billingAddress").should(
        "contains.text",
        user.addresses[0].street,
      );

      cy.get(".cardSelect").select(
        `${formatCardNumber(user.cards[0].number)} - ${user.cards[0].flag}`,
      );
    });

    cy.get("button.pay").click();

    // Verifica novamente os dados
    cy.get<string>("@nomeVitrine").then((nomeVitrine) => {
      cy.get(".list-group-item").find("h6").should("have.text", nomeVitrine);
    });

    cy.get<string>("@precoVitrine").then((precoVitrine) => {
      cy.get(".list-group-item").should(
        "contains.text",
        `Preço Unitário: ${precoVitrine}`,
      );

      const precoVitrineStr = parseInt(precoVitrine.replace(/[^\d]/g, ""));

      const precoSubtotal = (
        (precoVitrineStr * qtdDeLivros) /
        100
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      cy.get(".list-group-item").should(
        "contains.text",
        `Subtotal: ${precoSubtotal}`,
      );

      cy.get(".sumarizer .subtotal").should("contains.text", precoSubtotal);
    });

    cy.get<Customer>("@user").then((user) => {
      cy.get(".name").should("contains.text", user.name);
      cy.get(".email").should("contains.text", user.email);
      cy.get(".cpf").should("contains.text", maskCPF(user.cpf));
      cy.get(".deliveryAddressNickname").should(
        "contains.text",
        user.addresses[0].nickname,
      );
      cy.get(".deliveryAddress").should(
        "contains.text",
        user.addresses[0].street,
      );

      cy.get(".billingAddressNickname").should(
        "contains.text",
        user.addresses[0].nickname,
      );

      cy.get(".billingAddress").should(
        "contains.text",
        user.addresses[0].street,
      );

      cy.get(".card").should(
        "contains.text",
        `${formatCardNumber(user.cards[0].number)} - ${user.cards[0].flag}`,
      );
    });
    cy.get(".status").should("contains.text", "Em processamento");
    */
  });
});
