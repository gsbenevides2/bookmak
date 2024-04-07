import { set } from "../cypress/plugins/mocks";

const fileName = process.argv[2];
if (!fileName) {
  console.error("You must provide a file name");
  process.exit(1);
}
set(fileName).then(() => {
  console.log("Mock set:", fileName);
});
