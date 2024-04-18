// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

import { type Address, type Card, type Customer } from "../plugins/db";
import { maskCPF, maskPhone } from "../utils";

describe("CRUD de Cliente", function () {
  beforeEach(function () {
    cy.task("db:down");
    cy.task("mock:clear");
  });

  it("Cadastrar Cliente", function () {
    const fakeName = "Fulano da Silva";
    const fakeEmail = "fulanodasilva@gmail.com";
    const fakeCPF = "01268095850";
    const fakeDate = "1990-01-12";

    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("a:contains('Cadastre-se')").click();
    cy.get("input[name='name']").type(fakeName);
    cy.get("input[name='email']").type(fakeEmail);
    cy.get("input[name='cpf']").type(fakeCPF);
    cy.get("input[name='dateOfBirth']").type(fakeDate);
    cy.get("select[name='phoneType']").select("Celular");
    cy.get("input[name='phoneAreaCode']").type("11");
    cy.get("input[name='phoneNumber']").type("987654321");
    cy.get("select[name='gender']").select("Masculino");
    cy.get("input[name='password']").type("UmaSenhaBoa123#");
    cy.get("input[name='passwordConfirm']").type("UmaSenhaBoa123#");
    cy.get("input[name='nickname']").type("Casa de Campo");
    cy.get("select[name='houseType']").select("Casa");
    cy.get("select[name='streetType']").select("Rua");
    cy.get("input[name='street']").type("das Flores");
    cy.get("input[name='number']").type("123");
    cy.get("input[name='district']").type("Jardim das Rosas");
    cy.get("input[name='zipCode']").type("08633138");
    cy.wait(1000);
    cy.get("input[name='city']").should("have.value", "Suzano");
    cy.get("input[name='state']").should("have.value", "São Paulo");
    cy.get("input[name='country']").should("have.value", "Brasil");
    cy.get("textarea[name='observations']").type("Observação qualquer");
    cy.get("button:contains('Salvar')").click();
    cy.get("input[name='name']").should("have.value", fakeName);
    cy.get("input[name='email']").should("have.value", fakeEmail);
    cy.get("input[name='cpf']").should("have.value", maskCPF(fakeCPF));
    cy.get("input[name='dateOfBirth']").should("have.value", fakeDate);
    cy.get("select[name='phoneType']").should("have.value", "cellphone");
    cy.get("input[name='phoneAreaCode']").should("have.value", "11");
    cy.get("input[name='phoneNumber']").should("have.value", "98765-4321");
    cy.get("select[name='gender']").should("have.value", "male");
    cy.get("select[name='billingAddressId'] > option[selected]").should(
      "have.text",
      "Casa de Campo",
    );
    cy.get("select[name='deliveryAddressId'] > option[selected]").should(
      "have.text",
      "Casa de Campo",
    );
    cy.get("a:contains('Meus Endereços')").click();
    cy.get(".mb-2").should("contain.text", "Nome do Endereço: Casa de Campo");
    cy.get(".mt-3 > :nth-child(2)").should(
      "contain.text",
      "Tipo de Residência: Casa",
    );
    cy.get(".mt-3 > :nth-child(3)").should(
      "contain.text",
      "Tipo de Logradouro: Rua",
    );
    cy.get(".col-6").should("contain.text", "Logradouro: das Flores");
    cy.get(".col-2").should("contain.text", "Número: 123");
    cy.get(":nth-child(6)").should("contain.text", "Bairro: Jardim das Rosas");
    cy.get(":nth-child(7)").should("contain.text", "CEP: 08633-138");
    cy.get(":nth-child(8)").should("contain.text", "Cidade: Suzano");
    cy.get(".container").should("contain.text", "Estado: São Paulo");
    cy.get(".container").should("contain.text", "País: Brasil");
    cy.get(".container").should(
      "contain.text",
      "Observações: Observação qualquer",
    );
  });

  it("Ver dados cadastrais do cliente", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("input[name='name']").should("have.value", customer.name);
      cy.get("input[name='email']").should("have.value", customer.email);
      cy.get("input[name='cpf']").should("have.value", maskCPF(customer.cpf));
      cy.get("input[name='dateOfBirth']").should(
        "have.value",
        customer.dateOfBirth.split("T")[0],
      );

      cy.get("select[name='phoneType']").should(
        "have.value",
        customer.phoneType,
      );
      cy.get("input[name='phoneAreaCode']").should(
        "have.value",
        customer.phoneAreaCode,
      );
      cy.get("input[name='phoneNumber']").should(
        "have.value",
        maskPhone(customer.phoneNumber),
      );
      cy.get("select[name='gender']").should("have.value", customer.gender);

      cy.get("select[name='billingAddressId'] > option[selected]").should(
        "have.text",
        customer.addresses[0].nickname,
      );
      cy.get("select[name='deliveryAddressId'] > option[selected]").should(
        "have.text",
        customer.addresses[0].nickname,
      );
      cy.get("a:contains('Meus Endereços')").click();
      cy.get(".mb-2").should(
        "contain.text",
        "Nome do Endereço: " + customer.addresses[0].nickname,
      );
      cy.get(".mt-3 > :nth-child(2)").should(
        "contain.text",
        "Tipo de Residência: Casa",
      );
      cy.get(".mt-3 > :nth-child(3)").should(
        "contain.text",
        "Tipo de Logradouro: Rua",
      );
      cy.get(".col-6").should(
        "contain.text",
        "Logradouro: " + customer.addresses[0].street,
      );
      cy.get(".col-2").should(
        "contain.text",
        "Número: " + customer.addresses[0].number,
      );
      cy.get(":nth-child(6)").should(
        "contain.text",
        "Bairro: " + customer.addresses[0].district,
      );
      cy.get(":nth-child(7)").should("contain.text", "CEP: 08633-138");
      cy.get(":nth-child(8)").should(
        "contain.text",
        "Cidade: " + customer.addresses[0].city,
      );
      cy.get(".container").should(
        "contain.text",
        "Estado: " + customer.addresses[0].state,
      );
      cy.get(".container").should(
        "contain.text",
        "País: " + customer.addresses[0].country,
      );
      cy.get(":nth-child(11)").should(
        "contain.text",
        customer.addresses[0].observations.length
          ? "Observações: " + customer.addresses[0].observations
          : "Observações:",
      );
    });
  });

  it("Editar dados cadastrais do cliente", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("input[name='name']").clear().type("Fulano da Silva");
      cy.get("input[name='email']").clear().type("fulanodasilva@gmail.com");
      cy.get("input[name='cpf']").clear().type("01268095850");
      cy.get("input[name='dateOfBirth']").clear().type("1990-01-12");
      cy.get("select[name='phoneType']").select("Celular");
      cy.get("input[name='phoneAreaCode']").clear().type("11");
      cy.get("input[name='phoneNumber']").clear().type("987654321");
      cy.get("select[name='gender']").select("Feminino");
      cy.get("button:contains('Alterar Cadastro')").click();
      cy.get("input[name='name']").should("have.value", "Fulano da Silva");
      cy.get("input[name='email']").should(
        "have.value",
        "fulanodasilva@gmail.com",
      );
      cy.get("input[name='cpf']").should("have.value", maskCPF("01268095850"));
      cy.get("input[name='dateOfBirth']").should("have.value", "1990-01-12");
      cy.get("select[name='phoneType']").should("have.value", "cellphone");
      cy.get("input[name='phoneAreaCode']").should("have.value", "11");
      cy.get("input[name='phoneNumber']").should(
        "have.value",
        maskPhone("987654321"),
      );
      cy.get("select[name='gender']").should("have.value", "female");
    });
  });

  it("Excluir usuário / Inativação", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("button:contains('Desativar Conta')").click();
      cy.get("a:contains('Desativar')").click();
      cy.get(".alert").should("contain.text", "Conta desativada");
      cy.get("input[type='email']").type(customer.email);
      cy.get("input[type='password']").type(customer.password);
      cy.get("button:contains('Entrar')").click();
      cy.get(".alert").should("contain.text", "conta inativa");
    });
  });

  it("Cadastrar Endereço", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Endereços')").click();
      cy.get("a:contains('Novo Endereço')").click();
      cy.get("input[name='nickname']").type("Casa de Campo");
      cy.get("select[name='houseType']").select("Casa");
      cy.get("select[name='streetType']").select("Rua");
      cy.get("input[name='street']").type("das Flores");
      cy.get("input[name='number']").type("123");
      cy.get("input[name='district']").type("Jardim das Rosas");
      cy.get("input[name='zipCode']").type("08633138");
      cy.wait(1000);
      cy.get("input[name='city']").should("have.value", "Suzano");
      cy.get("input[name='state']").should("have.value", "São Paulo");
      cy.get("input[name='country']").should("have.value", "Brasil");
      cy.get("textarea[name='observations']").type("Observação qualquer");
      cy.get("button:contains('Continuar')").click();
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(".mb-2")
        .should("contain.text", "Nome do Endereço: Casa de Campo");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(2)")
        .should("contain.text", "Tipo de Residência: Casa");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(3)")
        .should("contain.text", "Tipo de Logradouro: Rua");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(".col-6")
        .should("contain.text", "Logradouro: das Flores");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(".col-2")
        .should("contain.text", "Número: 123");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(6)")
        .should("contain.text", "Bairro: Jardim das Rosas");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(7)")
        .should("contain.text", "CEP: 08633-138");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(8)")
        .should("contain.text", "Cidade: Suzano");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(9)")
        .should("contain.text", "Estado: São Paulo");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(10)")
        .should("contain.text", "País: Brasil");
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(11)")
        .should("contain.text", "Observações: Observação qualquer");
      cy.get(".alert").should("contain.text", "Novo endereço cadastrado");
    });
  });

  it("Ver Endereço", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.task<Address>("db:createDemoAddress", customer.id).then((address) => {
        cy.visit("http://localhost:3000");
        cy.get("a:contains('Minha Conta')").click();
        cy.get("a:contains('Meus Endereços')").click();
        cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)").as("element");

        cy.get("@element")
          .find(".mb-2")
          .should("contain.text", "Nome do Endereço: " + address.nickname);
        cy.get("@element")
          .find(":nth-child(2)")
          .should("contain.text", "Tipo de Residência: Apartamento");
        cy.get("@element")
          .find(":nth-child(3)")
          .should("contain.text", "Tipo de Logradouro: Avenida");
        cy.get("@element")
          .find(".col-6")
          .should("contain.text", "Logradouro: " + address.street);
        cy.get("@element")
          .find(".col-2")
          .should("contain.text", "Número: " + address.number);
        cy.get("@element")
          .find(":nth-child(6)")
          .should("contain.text", "Bairro: " + address.district);
        cy.get("@element")
          .find(":nth-child(7)")
          .should("contain.text", "CEP: 01310-100");
        cy.get("@element")
          .find(":nth-child(8)")
          .should("contain.text", "Cidade: " + address.city);
        cy.get("@element")
          .find(":nth-child(9)")
          .should("contain.text", "Estado: " + address.state);
        cy.get("@element")
          .find(":nth-child(10)")
          .should("contain.text", "País: " + address.country);
        cy.get("@element")
          .find(":nth-child(11)")
          .should(
            "contain.text",
            address.observations.length
              ? "Observações: " + address.observations
              : "Observações:",
          );
      });
    });
  });

  it("Editar Endereço", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Endereços')").click();
      cy.get("a:contains('Editar')").click();
      cy.get("input[name='nickname']").clear().type("Casa de Praia");
      cy.get("select[name='houseType']").select("Apartamento");
      cy.get("select[name='streetType']").select("Avenida");
      cy.get("input[name='street']").clear().type("das Palmeiras");
      cy.get("input[name='number']").clear().type("321");
      cy.get("input[name='district']").clear().type("Jardim das Flores");
      cy.get("input[name='zipCode']").clear().type("08633138");
      cy.wait(1000);
      cy.get("input[name='city']").should("have.value", "Suzano");
      cy.get("input[name='state']").should("have.value", "São Paulo");
      cy.get("input[name='country']").should("have.value", "Brasil");
      cy.get("textarea[name='observations']")
        .clear()
        .type("Observação qualquer");
      cy.get("button:contains('Continuar')").click();
      cy.get(":nth-child(4) > .mt-3").as("element");

      cy.get("@element")
        .find(".mb-2")
        .should("contain.text", "Nome do Endereço: Casa de Praia");
      cy.get("@element")
        .find(":nth-child(2)")
        .should("contain.text", "Tipo de Residência: Apartamento");
      cy.get("@element")
        .find(":nth-child(3)")
        .should("contain.text", "Tipo de Logradouro: Avenida");
      cy.get("@element")
        .find(".col-6")
        .should("contain.text", "Logradouro: das Palmeiras");
      cy.get("@element").find(".col-2").should("contain.text", "Número: 321");
      cy.get("@element")
        .find(":nth-child(6)")
        .should("contain.text", "Bairro: Jardim das Flores");
      cy.get("@element")
        .find(":nth-child(7)")
        .should("contain.text", "CEP: 08633-138");
      cy.get("@element")
        .find(":nth-child(8)")
        .should("contain.text", "Cidade: Suzano");
      cy.get("@element")
        .find(":nth-child(9)")
        .should("contain.text", "Estado: São Paulo");
      cy.get("@element")
        .find(":nth-child(10)")
        .should("contain.text", "País: Brasil");
      cy.get("@element")
        .find(":nth-child(11)")
        .should("contain.text", "Observações: Observação qualquer");
      cy.get(".alert").should("contain.text", "Endereço atualizado");
    });
  });

  it("Excluir Endereço", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.task("db:createDemoAddress", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Endereços')").click();
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find("button:contains('Excluir')")
        .click();
      cy.get(".alert").should("contain.text", "Endereço removido");
    });
  });

  it("Cadastrar Cartão", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Cartões')").click();
      cy.get("a:contains('Novo Cartão')").click();
      cy.get("input[name='cardNumber']").type("1234567890123456");
      cy.get("select[name='cardBrand']").select("Visa");
      cy.get("input[name='cardName']").type("Fulano da Silva");
      cy.get("input[name='cardExpiry']").type("2025-12");
      cy.get("input[name='cardCVV']").type("123");
      cy.get("button:contains('Continuar')").click();
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)").as("element");

      cy.get("@element")
        .find(":nth-child(1)")
        .should("contain.text", "Número do Cartão: ****.****.****.3456");
      cy.get("@element")
        .find(":nth-child(2)")
        .should("contain.text", "Bandeira: visa");
      cy.get("@element")
        .find(":nth-child(3)")
        .should("contain.text", "Nome: Fulano da Silva");
      cy.get("@element")
        .find(":nth-child(4)")
        .should("contain.text", "Vencimento: 12/2025");
      cy.get("@element")
        .find(":nth-child(5)")
        .should("contain.text", "CVV: ***");
      cy.get(".alert").should("contain.text", "Novo cartão cadastrado");
    });
  });

  it("Ver Cartão", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.task<Card>("db:createDemoCard", customer.id).then((card) => {
        cy.visit("http://localhost:3000");
        cy.get("a:contains('Minha Conta')").click();
        cy.get("a:contains('Meus Cartões')").click();
        cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)").as("element");

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
  });

  it("Remover Cartão", function () {
    cy.task<Customer>("db:createDemoCustomer").then((customer) => {
      cy.setCookie("accountId", customer.id);
      cy.task("db:createDemoCard", customer.id);
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Cartões')").click();
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find("button:contains('Excluir')")
        .click();
      cy.get(".alert").should("contain.text", "Cartão removido");
    });
  });
});
