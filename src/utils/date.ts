export const validateBirthDate = (date: Date): boolean => {
  const currentYear = new Date().getFullYear();
  const birthYear = date.getFullYear();
  const age = currentYear - birthYear;
  return age >= 18;
};

export const isMonthBefore = (month: string, year: string): boolean => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  if (parseInt(year) < currentYear) {
    return true;
  }
  if (parseInt(year) === currentYear) {
    return parseInt(month) <= currentMonth;
  }
  return false;
};
