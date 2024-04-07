import fs from "fs";
import path from "path";
async function saveMockToFile(fileName: string) {
  const res = await fetch("http://localhost:3000/test/getMocks");
  const mocks = await res.json();
  const filePath = path.resolve(
    process.cwd(),
    "src",
    "cypress",
    "mocks",
    `${fileName}.json`,
  );
  fs.writeFileSync(filePath, JSON.stringify(mocks, null, 2));
}

const fileName = process.argv[2];
if (!fileName) {
  console.error("You must provide a file name");
  process.exit(1);
}
saveMockToFile(fileName).then(() => {
  console.log("Mock saved:", fileName);
});
