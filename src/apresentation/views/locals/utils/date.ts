export function mask(date: Date): string {
  return date.toISOString().split("T")[0].split("-").reverse().join("/");
}
