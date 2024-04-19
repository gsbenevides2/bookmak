import * as utils from "../../utils";
import { type CreateUserResponse } from "../../plugins/database/createUser";
import {
  type UserFixureData,
  type AddressFixtureData,
} from "../../typings/fixures";

export default function clientAddressTests(): void {
  beforeEach(function () {
    cy.task("db:down");
    cy.fixture<UserFixureData>("users/01").then((user) => {
      cy.fixture<AddressFixtureData>("addresses/01").then((address) => {
        cy.task<CreateUserResponse>("db:createUser", {
          userData: user,
          addressData: address,
        }).then((data) => {
          cy.setCookie("accountId", data.userId);
          cy.wrap(data.userId).as("accountId");
          cy.wrap(user).as("user");
          cy.wrap(address).as("address");
        });
      });
    });
  });

  it("Cadastrar Endereço", function () {
    cy.fixture<AddressFixtureData>("addresses/02").then((address) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Endereços')").click();
      cy.get("a:contains('Novo Endereço')").click();
      cy.get("input[name='nickname']").type(address.nickname);
      cy.get("select[name='houseType']").select(address.houseType);
      cy.get("select[name='streetType']").select(address.streetType);
      cy.get("input[name='street']").type(address.street);
      cy.get("input[name='number']").type(address.number);
      cy.get("input[name='district']").type(address.district);
      cy.get("input[name='zipCode']").type(address.zipCode);
      cy.wait(1000);
      cy.get("input[name='city']").should("have.value", address.city);
      cy.get("input[name='state']").should("have.value", address.state);
      cy.get("input[name='country']").should("have.value", address.country);
      if (address.observations.length !== 0)
        cy.get("textarea[name='observations']").type(address.observations);
      cy.get("button:contains('Continuar')").click();
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(".mb-2")
        .should("contain.text", "Nome do Endereço: " + address.nickname);
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(2)")
        .should(
          "contain.text",
          "Tipo de Residência: " + utils.parseHouseType(address.houseType),
        );
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(3)")
        .should(
          "contain.text",
          "Tipo de Logradouro: " + utils.parseStreetType(address.streetType),
        );
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(".col-6")
        .should("contain.text", "Logradouro: " + address.street);
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(".col-2")
        .should("contain.text", "Número: " + address.number);
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(6)")
        .should("contain.text", "Bairro: " + address.district);
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(7)")
        .should("contain.text", "CEP: " + utils.maskZipCode(address.zipCode));
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(8)")
        .should("contain.text", "Cidade: " + address.city);
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(9)")
        .should("contain.text", "Estado: " + address.state);
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(10)")
        .should("contain.text", "País: " + address.country);
      if (address.observations.length !== 0)
        cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
          .find(":nth-child(11)")
          .should("contain.text", "Observações: " + address.observations);
      else
        cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
          .find(":nth-child(11)")
          .should("contain.text", "Observações:");
      cy.get(".alert").should("contain.text", "Novo endereço cadastrado");
    });
  });

  it("Ver Endereço", function () {
    cy.get<AddressFixtureData>("@address").then((address) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Endereços')").click();
      cy.get(":nth-child(4) > .mt-3").as("element");

      cy.get("@element")
        .find(".mb-2")
        .should("contain.text", "Nome do Endereço: " + address.nickname);
      cy.get("@element")
        .find(":nth-child(2)")
        .should(
          "contain.text",
          "Tipo de Residência: " + utils.parseHouseType(address.houseType),
        );
      cy.get("@element")
        .find(":nth-child(3)")
        .should(
          "contain.text",
          "Tipo de Logradouro: " + utils.parseStreetType(address.streetType),
        );
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
        .should("contain.text", "CEP: " + utils.maskZipCode(address.zipCode));
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
          address.observations.length !== 0
            ? "Observações: " + address.observations
            : "Observações:",
        );
    });
  });

  it("Editar Endereço", function () {
    cy.fixture<AddressFixtureData>("addresses/02").then((address) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Meus Endereços')").click();
      cy.get("a:contains('Editar')").click();
      cy.get("input[name='nickname']").clear().type(address.nickname);
      cy.get("select[name='houseType']").select(address.houseType);
      cy.get("select[name='streetType']").select(address.streetType);
      cy.get("input[name='street']").clear().type(address.street);
      cy.get("input[name='number']").clear().type(address.number);
      cy.get("input[name='district']").clear().type(address.district);
      cy.get("input[name='city']").clear();
      cy.get("input[name='state']").clear();
      cy.get("input[name='country']").clear();
      cy.get("input[name='zipCode']").clear().type(address.zipCode);
      cy.wait(1000);
      cy.get("input[name='city']").should("have.value", address.city);
      cy.get("input[name='state']").should("have.value", address.state);
      cy.get("input[name='country']").should("have.value", address.country);
      if (address.observations.length !== 0)
        cy.get("textarea[name='observations']")
          .clear()
          .type(address.observations);
      cy.get("button:contains('Continuar')").click();

      cy.get(":nth-child(4) > .mt-3").as("element");

      cy.get("@element")
        .find(".mb-2")
        .should("contain.text", "Nome do Endereço: " + address.nickname);
      cy.get("@element")
        .find(":nth-child(2)")
        .first()
        .should(
          "contain.text",
          "Tipo de Residência: " + utils.parseHouseType(address.houseType),
        );
      cy.get("@element")
        .find(":nth-child(3)")
        .should(
          "contain.text",
          "Tipo de Logradouro: " + utils.parseStreetType(address.streetType),
        );
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
        .should("contain.text", "CEP: " + utils.maskZipCode(address.zipCode));
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
          address.observations.length !== 0
            ? "Observações: " + address.observations
            : "Observações:",
        );
      cy.get(".alert").should("contain.text", "Endereço atualizado");
    });
  });

  it("Excluir Endereço", function () {
    cy.get<string>("@accountId").then((customerId) => {
      cy.fixture<AddressFixtureData>("addresses/02").then((address) => {
        cy.task("db:createAddress", { customerId, addressData: address });
      });
    });
    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("a:contains('Meus Endereços')").click();
    cy.get("button:contains('Excluir')").eq(1).click();
    cy.get(".alert").should("contain.text", "Endereço removido");
  });
  /*
  
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
    */
}
