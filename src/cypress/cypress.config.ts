import { defineConfig } from "cypress";
import * as dbTasks from "./plugins/db";
import * as mockTasks from "./plugins/mocks";

export default defineConfig({
  projectId: "rwjpu4",
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    supportFile: "src/cypress/support/e2e.ts",
    specPattern: "src/cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {
      on("task", {
        "db:createDemoCustomer": dbTasks.createDemoCustommer,
        "db:createDemoAdmin": dbTasks.createDemoAdmin,
        "db:down": dbTasks.down,
        "mock:clear": mockTasks.clear,
        "mock:set": mockTasks.set,
      });
    },
  },
});
