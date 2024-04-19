/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    populateBooks: () => Chainable<void>;
  }
}
