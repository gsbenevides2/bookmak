export function maxWords(text: string, max: number): string {
  const words = text.split(" ");
  if (words.length <= max) return text;
  return words.slice(0, max).join(" ") + "...";
}
