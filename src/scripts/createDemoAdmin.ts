import { createDemoAdmin } from "../cypress/plugins/db";

createDemoAdmin().then((admin) => {
  console.log("Admin created:", admin);
});
