/// <reference types="cypress" />

import * as utils from "../../utils";

import { addressesFixtures } from "../../fixtures/address";
import { customersFixtures } from "../../fixtures/customer";

describe("CRUD de Cliente", function () {
  beforeEach(function () {
    cy.downDatabase();
  });

  it("Cadastrar Cliente", function () {
    const customer = customersFixtures[0];
    const address = addressesFixtures[0];

    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("a:contains('Cadastre-se')").click();
    cy.get("input[name='name']").type(customer.name);
    cy.get("input[name='email']").type(customer.email);
    cy.get("input[name='cpf']").type(customer.cpf);
    cy.get("input[name='dateOfBirth']").type(
      utils.formatDate(customer.dateOfBirth),
    );
    cy.get("select[name='phoneType']").select(customer.phoneType);
    cy.get("input[name='phoneAreaCode']").type(customer.phoneAreaCode);
    cy.get("input[name='phoneNumber']").type(customer.phoneNumber);
    cy.get("select[name='gender']").select(customer.gender);
    cy.get("input[name='password']").type(customer.password);
    cy.get("input[name='passwordConfirm']").type(customer.password);

    cy.get("input[name='nickname']").type(address.nickname);
    cy.get("select[name='houseType']").select(address.houseType);
    cy.get("select[name='streetType']").select(address.streetType);
    cy.get("input[name='street']").type(address.street);
    cy.get("input[name='number']").type(address.number);
    cy.get("input[name='district']").type(address.district);
    cy.get("input[name='zipCode']").type(address.zipCode);
    cy.get("input[name='city']").should("have.value", address.city);
    cy.get("input[name='state']").should("have.value", address.state);
    cy.get("input[name='country']").should("have.value", address.country);
    if (address.observations.length > 0)
      cy.get("textarea[name='observations']").type(address.observations);

    cy.get("button:contains('Salvar')").click();

    cy.get("input[name='name']").should("have.value", customer.name);
    cy.get("input[name='email']").should("have.value", customer.email);
    cy.get("input[name='cpf']").should(
      "have.value",
      utils.maskCPF(customer.cpf),
    );
    cy.get("input[name='dateOfBirth']").should(
      "have.value",
      utils.formatDate(customer.dateOfBirth),
    );
    cy.get("select[name='phoneType']").should("have.value", customer.phoneType);
    cy.get("input[name='phoneAreaCode']").should(
      "have.value",
      customer.phoneAreaCode,
    );
    cy.get("input[name='phoneNumber']").should(
      "have.value",
      utils.maskPhone(customer.phoneNumber),
    );

    cy.get("select[name='billingAddressId'] > option[selected]").should(
      "have.text",
      address.nickname,
    );
    cy.get("select[name='deliveryAddressId'] > option[selected]").should(
      "have.text",
      address.nickname,
    );
    cy.get("a:contains('Meus Endereços')").click();
    cy.get(".mb-2").should(
      "contain.text",
      "Nome do Endereço: " + address.nickname,
    );
    cy.get(".mt-3 > :nth-child(2)").should(
      "contain.text",
      "Tipo de Residência: " + utils.parseHouseType(address.houseType),
    );
    cy.get(".mt-3 > :nth-child(3)").should(
      "contain.text",
      "Tipo de Logradouro: " + utils.parseStreetType(address.streetType),
    );
    cy.get(".col-6").should("contain.text", "Logradouro: " + address.street);
    cy.get(".col-2").should("contain.text", "Número: " + address.number);
    cy.get(":nth-child(6)").should(
      "contain.text",
      "Bairro: " + address.district,
    );
    cy.get(":nth-child(7)").should(
      "contain.text",
      "CEP: " + utils.maskZipCode(address.zipCode),
    );
    cy.get(":nth-child(8)").should("contain.text", "Cidade: " + address.city);
    cy.get(".container").should("contain.text", "Estado: " + address.state);
    cy.get(".container").should("contain.text", "País: " + address.country);
    if (address.observations.length > 0)
      cy.get(":nth-child(11)").should(
        "contain.text",
        "Observações: " + address.observations,
      );
    else cy.get(":nth-child(11)").should("contain.text", "Observações:");
  });

  it("Ver dados cadastrais do cliente", function () {
    const customer = customersFixtures[0];
    const address = addressesFixtures[0];
    cy.createCustomer([
      {
        address,
        customer,
      },
    ]);

    cy.login(customer.email, customer.password);

    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("input[name='name']").should("have.value", customer.name);
    cy.get("input[name='email']").should("have.value", customer.email);
    cy.get("input[name='cpf']").should(
      "have.value",
      utils.maskCPF(customer.cpf),
    );
    cy.get("input[name='dateOfBirth']").should(
      "have.value",
      utils.formatDate(customer.dateOfBirth),
    );
    cy.get("select[name='phoneType']").should("have.value", customer.phoneType);
    cy.get("input[name='phoneAreaCode']").should(
      "have.value",
      customer.phoneAreaCode,
    );
    cy.get("input[name='phoneNumber']").should(
      "have.value",
      utils.maskPhone(customer.phoneNumber),
    );

    cy.get("select[name='billingAddressId'] > option[selected]").should(
      "have.text",
      address.nickname,
    );
    cy.get("select[name='deliveryAddressId'] > option[selected]").should(
      "have.text",
      address.nickname,
    );
    cy.get("a:contains('Meus Endereços')").click();
    cy.get(".mb-2").should(
      "contain.text",
      "Nome do Endereço: " + address.nickname,
    );
    cy.get(".mt-3 > :nth-child(2)").should(
      "contain.text",
      "Tipo de Residência: " + utils.parseHouseType(address.houseType),
    );
    cy.get(".mt-3 > :nth-child(3)").should(
      "contain.text",
      "Tipo de Logradouro: " + utils.parseStreetType(address.streetType),
    );
    cy.get(".col-6").should("contain.text", "Logradouro: " + address.street);
    cy.get(".col-2").should("contain.text", "Número: " + address.number);
    cy.get(":nth-child(6)").should(
      "contain.text",
      "Bairro: " + address.district,
    );
    cy.get(":nth-child(7)").should(
      "contain.text",
      "CEP: " + utils.maskZipCode(address.zipCode),
    );
    cy.get(":nth-child(8)").should("contain.text", "Cidade: " + address.city);
    cy.get(".container").should("contain.text", "Estado: " + address.state);
    cy.get(".container").should("contain.text", "País: " + address.country);
    if (address.observations.length > 0)
      cy.get(":nth-child(11)").should(
        "contain.text",
        "Observações: " + address.observations,
      );
    else cy.get(":nth-child(11)").should("contain.text", "Observações:");
  });

  it("Editar dados cadastrais do cliente", function () {
    const [customerOldData, newCustomerData] = customersFixtures;
    const address = addressesFixtures[0];
    cy.createCustomer([
      {
        address,
        customer: customerOldData,
      },
    ]);

    cy.login(customerOldData.email, customerOldData.password);

    cy.visit("http://localhost:3000");
    cy.get("a:contains('Minha Conta')").click();
    cy.get("input[name='name']").clear().type(newCustomerData.name);
    cy.get("input[name='email']").clear().type(newCustomerData.email);
    cy.get("input[name='cpf']").clear().type(newCustomerData.cpf);
    cy.get("input[name='dateOfBirth']")
      .clear()
      .type(utils.formatDate(newCustomerData.dateOfBirth));
    cy.get("select[name='phoneType']").select(newCustomerData.phoneType);
    cy.get("input[name='phoneAreaCode']")
      .clear()
      .type(newCustomerData.phoneAreaCode);
    cy.get("input[name='phoneNumber']")
      .clear()
      .type(newCustomerData.phoneNumber);
    cy.get("select[name='gender']").select(newCustomerData.gender);
    cy.get("button:contains('Alterar Cadastro')").click();
    cy.get("input[name='name']").should("have.value", newCustomerData.name);
    cy.get("input[name='email']").should("have.value", newCustomerData.email);
    cy.get("input[name='cpf']").should(
      "have.value",
      utils.maskCPF(newCustomerData.cpf),
    );
    cy.get("input[name='dateOfBirth']").should(
      "have.value",
      utils.formatDate(newCustomerData.dateOfBirth),
    );
    cy.get("select[name='phoneType']").should(
      "have.value",
      newCustomerData.phoneType,
    );
    cy.get("input[name='phoneAreaCode']").should(
      "have.value",
      newCustomerData.phoneAreaCode,
    );
    cy.get("input[name='phoneNumber']").should(
      "have.value",
      utils.maskPhone(newCustomerData.phoneNumber),
    );
    cy.get("select[name='gender']").should(
      "have.value",
      newCustomerData.gender,
    );
  });

  it("Excluir usuário / Inativação", function () {
    const customer = customersFixtures[0];
    const address = addressesFixtures[0];
    cy.createCustomer([
      {
        address,
        customer,
      },
    ]);

    cy.login(customer.email, customer.password);

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
