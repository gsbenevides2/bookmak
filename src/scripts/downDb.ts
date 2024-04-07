import { down } from "../cypress/plugins/db";

down().then(() => {
  console.log("Database dropped");
});
