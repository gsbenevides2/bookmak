import { readFileSync, writeFileSync } from "fs";

export function readJsonFile<T>(path: string): T {
  return JSON.parse(readFileSync(path).toString()) as T;
}

export function writeJsonFile(path: string, data: any): void {
  writeFileSync(path, JSON.stringify(data, null, 2));
}
