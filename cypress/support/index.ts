/// <reference types="cypress" />
/// <reference path="../plugins/database/typings.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    downDatabase: () => Chainable<void>;
    createCustomer: (data: DatabaseCreateCustomerData[]) => Chainable<void>;
    createAddress: (data: DatabaseCreateAddressData[]) => Chainable<void>;
    createCard: (data: DatabaseCreateCardData[]) => Chainable<void>;
    createBook: (data: DatabaseCreateBookData) => Chainable<void>;
    createOrder: (data: DatabaseCreateOrderData) => Chainable<void>;
    createCoupon: (data: DatabaseCreateCouponData) => Chainable<void>;
  }
}
