function calculateVerifierDigit(digits: string): number {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += Number(digits.charAt(i)) * (digits.length + 1 - i);
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function validateCPF(cpf: string): boolean {
  if (cpf.length !== 11) {
    return false;
  }
  const firstNineDigits = cpf.substring(0, 9);
  const firstVerifierDigit = Number(cpf.charAt(9));
  const secondVerifierDigit = Number(cpf.charAt(10));
  const firstVerifierDigitResult = calculateVerifierDigit(firstNineDigits);
  if (firstVerifierDigit !== firstVerifierDigitResult) {
    return false;
  }
  const secondVerifierDigitResult = calculateVerifierDigit(
    firstNineDigits + firstVerifierDigitResult.toString(),
  );
  return secondVerifierDigit === secondVerifierDigitResult;
}
