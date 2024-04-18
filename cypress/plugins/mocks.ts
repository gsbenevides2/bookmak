import fs from "fs";
import path from "path";

export async function clear() {
  await fetch("http://localhost:3000/test/clearMocks");
  return null;
}

export async function set(mockFile: string) {
  const filePath = path.resolve(__dirname, "../mocks", mockFile);
  await fetch("http://localhost:3000/test/setMocks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: fs.readFileSync(filePath, "utf-8"),
  });
  return null;
}
