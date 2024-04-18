import { defineConfig } from "cypress";
import * as dbTasks from "./cypress/plugins/db";
import * as mockTasks from "./cypress/plugins/mocks";

export default defineConfig({
  projectId: "rwjpu4",
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {
      on("task", {
        "db:createDemoCustomer": dbTasks.createDemoCustommer,
        "db:createDemoAdmin": dbTasks.createDemoAdmin,
        "db:createDemoAddress": dbTasks.createDemoAddress,
        "db:createDemoCard": dbTasks.createDemoCard,
        "db:down": dbTasks.down,
        "mock:clear": mockTasks.clear,
        "mock:set": mockTasks.set,
      });
    },
  },
});
