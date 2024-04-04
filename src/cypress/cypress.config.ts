import { defineConfig } from "cypress";
import {
  createDemoCustommerDown,
  createDemoCustommerUp,
} from "./plugins/db/createDemoCustomer";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    supportFile: "src/cypress/support/e2e.ts",
    specPattern: "src/cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {
      on("task", {
        "db:createDemoCustomer:up": createDemoCustommerUp,
        "db:createDemoCustomer:down": createDemoCustommerDown,
      });
    },
  },
});
