import { defineConfig } from "cypress";
import dbTasks from "./cypress/plugins/database";

const tasks: Cypress.Tasks = Object.keys(dbTasks).reduce((acc, key) => {
  const dbKey = "db:" + key;
  const taskKey = key as keyof typeof dbTasks;

  return { ...acc, [dbKey]: dbTasks[taskKey] };
}, {});

export default defineConfig({
  projectId: "rwjpu4",
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on) {
      on("task", {
        ...tasks,
      });
    },
  },
});
