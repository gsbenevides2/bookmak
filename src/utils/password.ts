import bcrypt from "bcrypt";
import { secure } from "./errors";

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
export async function encryptPassword(password: string): Promise<string> {
  const saltRounds = secure(
    () => parseInt(process.env.BCRYPT_SALT_ROUNDS ?? "10", 10),
    "Configuração de BCRYPT_SALT_ROUNDS inválida",
  );
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
