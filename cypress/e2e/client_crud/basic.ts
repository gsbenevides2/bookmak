import * as utils from "../../utils";
import { type CreateUserResponse } from "../../plugins/database/createUser";
import {
  type UserFixureData,
  type AddressFixtureData,
} from "../../typings/fixures";

export default function clientBasicTests(): void {
  beforeEach(function () {
    cy.task("db:down");
  });

  it("Cadastrar Cliente", function () {
    cy.fixture<UserFixureData>("users/01").then((user) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("a:contains('Cadastre-se')").click();
      cy.get("input[name='name']").type(user.name);
      cy.get("input[name='email']").type(user.email);
      cy.get("input[name='cpf']").type(user.cpf);
      cy.get("input[name='dateOfBirth']").type(
        utils.formatDate(utils.parseDateStr(user.dateOfBirth)),
      );
      cy.get("select[name='phoneType']").select(user.phoneType);
      cy.get("input[name='phoneAreaCode']").type(user.phoneAreaCode);
      cy.get("input[name='phoneNumber']").type(user.phoneNumber);
      cy.get("select[name='gender']").select(user.gender);
      cy.get("input[name='password']").type(user.password);
      cy.get("input[name='passwordConfirm']").type(user.password);
      cy.wrap(user).as("user");
    });
    cy.fixture<AddressFixtureData>("addresses/01").then((address) => {
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
      cy.wrap(address).as("address");
    });
    cy.get<UserFixureData>("@user").then((user) => {
      cy.get("input[name='name']").should("have.value", user.name);
      cy.get("input[name='email']").should("have.value", user.email);
      cy.get("input[name='cpf']").should("have.value", utils.maskCPF(user.cpf));
      cy.get("input[name='dateOfBirth']").should(
        "have.value",
        utils.formatDate(utils.parseDateStr(user.dateOfBirth)),
      );
      cy.get("select[name='phoneType']").should("have.value", user.phoneType);
      cy.get("input[name='phoneAreaCode']").should(
        "have.value",
        user.phoneAreaCode,
      );
      cy.get("input[name='phoneNumber']").should(
        "have.value",
        utils.maskPhone(user.phoneNumber),
      );
    });
    cy.get<AddressFixtureData>("@address").then((address) => {
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
  });

  it("Ver dados cadastrais do cliente", function () {
    cy.fixture<UserFixureData>("users/01").then((user) => {
      cy.fixture<AddressFixtureData>("addresses/01").then((address) => {
        cy.task<CreateUserResponse>("db:createUser", {
          userData: user,
          addressData: address,
        }).then((data) => {
          cy.setCookie("accountId", data.userId);
          cy.wrap(user).as("user");
          cy.wrap(address).as("address");
        });
      });
    });
    cy.get<UserFixureData>("@user").then((user) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("input[name='name']").should("have.value", user.name);
      cy.get("input[name='email']").should("have.value", user.email);
      cy.get("input[name='cpf']").should("have.value", utils.maskCPF(user.cpf));
      cy.get("input[name='dateOfBirth']").should(
        "have.value",
        utils.formatDate(utils.parseDateStr(user.dateOfBirth)),
      );
      cy.get("select[name='phoneType']").should("have.value", user.phoneType);
      cy.get("input[name='phoneAreaCode']").should(
        "have.value",
        user.phoneAreaCode,
      );
      cy.get("input[name='phoneNumber']").should(
        "have.value",
        utils.maskPhone(user.phoneNumber),
      );
    });
    cy.get<AddressFixtureData>("@address").then((address) => {
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
  });

  it("Editar dados cadastrais do cliente", function () {
    cy.fixture<UserFixureData>("users/01").then((user) => {
      cy.fixture<AddressFixtureData>("addresses/01").then((address) => {
        cy.task<CreateUserResponse>("db:createUser", {
          userData: user,
          addressData: address,
        }).then((data) => {
          cy.setCookie("accountId", data.userId);
          cy.wrap(user).as("user");
          cy.wrap(address).as("address");
        });
      });
    });

    cy.fixture<UserFixureData>("users/02").then((user) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("input[name='name']").clear().type(user.name);
      cy.get("input[name='email']").clear().type(user.email);
      cy.get("input[name='cpf']").clear().type(user.cpf);
      cy.get("input[name='dateOfBirth']")
        .clear()
        .type(utils.formatDate(utils.parseDateStr(user.dateOfBirth)));
      cy.get("select[name='phoneType']").select(user.phoneType);
      cy.get("input[name='phoneAreaCode']").clear().type(user.phoneAreaCode);
      cy.get("input[name='phoneNumber']").clear().type(user.phoneNumber);
      cy.get("select[name='gender']").select(user.gender);
      cy.get("button:contains('Alterar Cadastro')").click();
      cy.get("input[name='name']").should("have.value", user.name);
      cy.get("input[name='email']").should("have.value", user.email);
      cy.get("input[name='cpf']").should("have.value", utils.maskCPF(user.cpf));
      cy.get("input[name='dateOfBirth']").should(
        "have.value",
        utils.formatDate(utils.parseDateStr(user.dateOfBirth)),
      );
      cy.get("select[name='phoneType']").should("have.value", user.phoneType);
      cy.get("input[name='phoneAreaCode']").should(
        "have.value",
        user.phoneAreaCode,
      );
      cy.get("input[name='phoneNumber']").should(
        "have.value",
        utils.maskPhone(user.phoneNumber),
      );
      cy.get("select[name='gender']").should("have.value", user.gender);
    });
  });

  it("Excluir usuário / Inativação", function () {
    cy.fixture<UserFixureData>("users/01").then((user) => {
      cy.fixture<AddressFixtureData>("addresses/01").then((address) => {
        cy.task<CreateUserResponse>("db:createUser", {
          userData: user,
          addressData: address,
        }).then((data) => {
          cy.setCookie("accountId", data.userId);
          cy.wrap(user).as("user");
          cy.wrap(address).as("address");
        });
      });
    });

    cy.get<UserFixureData>("@user").then((user) => {
      cy.visit("http://localhost:3000");
      cy.get("a:contains('Minha Conta')").click();
      cy.get("button:contains('Desativar Conta')").click();
      cy.get("a:contains('Desativar')").click();
      cy.get(".alert").should("contain.text", "Conta desativada");
      cy.get("input[type='email']").type(user.email);
      cy.get("input[type='password']").type(user.password);
      cy.get("button:contains('Entrar')").click();
      cy.get(".alert").should("contain.text", "conta inativa");
    });
  });
}
