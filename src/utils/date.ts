export const validateBirthDate = (date: Date): boolean => {
  const currentYear = new Date().getFullYear();
  const birthYear = date.getFullYear();
  const age = currentYear - birthYear;
  return age >= 18;
};
