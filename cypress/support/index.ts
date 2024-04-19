/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    populateBooks: () => Chainable<void>;
    createDemoCustomer: (autenticated?: boolean) => Chainable<void>;
    addCardToDemoCustomer: () => Chainable<void>;
    createDemoAdmin: (autenticated?: boolean) => Chainable<void>;
    createDemoOrder: () => Chainable<void>;
    updateDemoOrdertWithUpdates: () => Chainable<void>;
  }
}
