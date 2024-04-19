import { defineConfig } from "cypress";
import dbTasks from "./cypress/plugins/database";

export default defineConfig({
  projectId: "rwjpu4",
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on) {
      on("task", {
        "db:createAddress": dbTasks.createAddress,
        "db:createAuthor": dbTasks.createAuthor,
        "db:createBook": dbTasks.createBook,
        "db:createBookAuthor": dbTasks.createBookAuthor,
        "db:createBookCategory": dbTasks.createBookCategory,
        "db:createCard": dbTasks.createCard,
        "db:createCategory": dbTasks.createCategory,
        "db:createUser": dbTasks.createUser,
        "db:down": dbTasks.downDatabase,
      });
    },
  },
});
