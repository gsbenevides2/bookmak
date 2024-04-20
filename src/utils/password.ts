function hasUpperCase(password: string): boolean {
  return /[A-Z]/.test(password);
}

function hasLowerCase(password: string): boolean {
  return /[a-z]/.test(password);
}

function hasNumber(password: string): boolean {
  return /[0-9]/.test(password);
}

function hasSpecialCharacter(password: string): boolean {
  return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password);
}

export function validatePasswordSecurity(password: string): boolean {
  return (
    password.length >= 8 &&
    hasUpperCase(password) &&
    hasLowerCase(password) &&
    hasNumber(password) &&
    hasSpecialCharacter(password)
  );
}
