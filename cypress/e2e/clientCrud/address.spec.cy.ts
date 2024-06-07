/// <reference types="cypress" />

import { addressesFixtures } from "../../fixtures/address";
import { customersFixtures } from "../../fixtures/customer";
import * as utils from "../../utils";

describe("CRUD de Cliente - Endereço", function () {
  const customer = customersFixtures[0];
  const [address, ...remaingAdddressFixtures] = addressesFixtures;
  beforeEach(function () {
    cy.downDatabase();
    cy.createCustomer([
      {
        address,
        customer,
      },
    ]);

    cy.setCookie("accountId", customer.id);
  });

  it("Cadastrar Endereço", function () {
    const newAddress = remaingAdddressFixtures[0];
    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("a:contains('Meus Endereços')").click();
    cy.get("a:contains('Novo Endereço')").click();
    cy.get("input[name='nickname']").type(newAddress.nickname);
    cy.get("select[name='houseType']").select(newAddress.houseType);
    cy.get("select[name='streetType']").select(newAddress.streetType);
    cy.get("input[name='street']").type(newAddress.street);
    cy.get("input[name='number']").type(newAddress.number);
    cy.get("input[name='district']").type(newAddress.district);
    cy.get("input[name='zipCode']").type(newAddress.zipCode);
    cy.wait(1000);
    cy.get("input[name='city']").should("have.value", newAddress.city);
    cy.get("input[name='state']").should("have.value", newAddress.state);
    cy.get("input[name='country']").should("have.value", newAddress.country);
    if (newAddress.observations.length !== 0)
      cy.get("textarea[name='observations']").type(newAddress.observations);
    cy.get("button:contains('Continuar')").click();
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(".mb-2")
      .should("contain.text", "Nome do Endereço: " + newAddress.nickname);
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(":nth-child(2)")
      .should(
        "contain.text",
        "Tipo de Residência: " + utils.parseHouseType(newAddress.houseType),
      );
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(":nth-child(3)")
      .should(
        "contain.text",
        "Tipo de Logradouro: " + utils.parseStreetType(newAddress.streetType),
      );
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(".col-6")
      .should("contain.text", "Logradouro: " + newAddress.street);
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(".col-2")
      .should("contain.text", "Número: " + newAddress.number);
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(":nth-child(6)")
      .should("contain.text", "Bairro: " + newAddress.district);
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(":nth-child(7)")
      .should("contain.text", "CEP: " + utils.maskZipCode(newAddress.zipCode));
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(":nth-child(8)")
      .should("contain.text", "Cidade: " + newAddress.city);
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(":nth-child(9)")
      .should("contain.text", "Estado: " + newAddress.state);
    cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
      .find(":nth-child(10)")
      .should("contain.text", "País: " + newAddress.country);
    if (newAddress.observations.length !== 0)
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(11)")
        .should("contain.text", "Observações: " + address.observations);
    else
      cy.get(":nth-child(1) > :nth-child(4) > :nth-child(2)")
        .find(":nth-child(11)")
        .should("contain.text", "Observações:");
    cy.get(".alert").should("contain.text", "Novo endereço cadastrado");
  });

  it("Ver Endereço", function () {
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

  it("Editar Endereço", function () {
    const newAddress = remaingAdddressFixtures[0];
    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("a:contains('Meus Endereços')").click();
    cy.get("a:contains('Editar')").click();
    cy.get("input[name='nickname']").clear().type(newAddress.nickname);
    cy.get("select[name='houseType']").select(newAddress.houseType);
    cy.get("select[name='streetType']").select(newAddress.streetType);
    cy.get("input[name='street']").clear().type(newAddress.street);
    cy.get("input[name='number']").clear().type(newAddress.number);
    cy.get("input[name='district']").clear().type(newAddress.district);
    cy.get("input[name='city']").clear();
    cy.get("input[name='state']").clear();
    cy.get("input[name='country']").clear();
    cy.get("input[name='zipCode']").clear().type(newAddress.zipCode);
    cy.wait(1000);
    cy.get("input[name='city']").should("have.value", newAddress.city);
    cy.get("input[name='state']").should("have.value", newAddress.state);
    cy.get("input[name='country']").should("have.value", newAddress.country);
    if (newAddress.observations.length !== 0)
      cy.get("textarea[name='observations']")
        .clear()
        .type(newAddress.observations);
    cy.get("button:contains('Continuar')").click();

    cy.get(":nth-child(4) > .mt-3").as("element");

    cy.get("@element")
      .find(".mb-2")
      .should("contain.text", "Nome do Endereço: " + newAddress.nickname);
    cy.get("@element")
      .find(":nth-child(2)")
      .first()
      .should(
        "contain.text",
        "Tipo de Residência: " + utils.parseHouseType(newAddress.houseType),
      );
    cy.get("@element")
      .find(":nth-child(3)")
      .should(
        "contain.text",
        "Tipo de Logradouro: " + utils.parseStreetType(newAddress.streetType),
      );
    cy.get("@element")
      .find(".col-6")
      .should("contain.text", "Logradouro: " + newAddress.street);
    cy.get("@element")
      .find(".col-2")
      .should("contain.text", "Número: " + newAddress.number);
    cy.get("@element")
      .find(":nth-child(6)")
      .should("contain.text", "Bairro: " + newAddress.district);
    cy.get("@element")
      .find(":nth-child(7)")
      .should("contain.text", "CEP: " + utils.maskZipCode(newAddress.zipCode));
    cy.get("@element")
      .find(":nth-child(8)")
      .should("contain.text", "Cidade: " + newAddress.city);
    cy.get("@element")
      .find(":nth-child(9)")
      .should("contain.text", "Estado: " + newAddress.state);
    cy.get("@element")
      .find(":nth-child(10)")
      .should("contain.text", "País: " + newAddress.country);
    cy.get("@element")
      .find(":nth-child(11)")
      .should(
        "contain.text",
        newAddress.observations.length !== 0
          ? "Observações: " + newAddress.observations
          : "Observações:",
      );
    cy.get(".alert").should("contain.text", "Endereço atualizado");
  });

  it("Excluir Endereço", function () {
    const newAddress = remaingAdddressFixtures[0];
    cy.createAddress([{ address: newAddress, customer_id: customer.id }]);
    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("a:contains('Meus Endereços')").click();
    cy.get("button:contains('Excluir')").eq(1).click();
    cy.get(".alert").should("contain.text", "Endereço removido");
  });
});
