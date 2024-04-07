import { clear } from "../cypress/plugins/mocks";

clear().then(() => {
  console.log("Mocks cleared");
});
