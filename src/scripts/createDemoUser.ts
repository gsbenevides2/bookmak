import { createDemoCustommer } from "../cypress/plugins/db";

createDemoCustommer().then((user) => {
  console.log("User created:", user);
});
