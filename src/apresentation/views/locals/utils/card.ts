import { CardFlag, cardFlagText } from "../../../../business/models/Card";

export function formatCardNumber(cardNumber: string): string {
  const lastFourDigits = cardNumber.slice(-4);
  return `****.****.****.${lastFourDigits}`;
}
export function formatCardFlag(cardFlag: CardFlag): string {
  return cardFlagText[cardFlag];
}

export function getAvailableCardFlags(): Array<{
  value: CardFlag;
  text: string;
}> {
  return Object.values(CardFlag).map((value) => ({
    value,
    text: cardFlagText[value],
  }));
}
