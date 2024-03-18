type Fun<T> = () => T;
export function secure<T>(fun: Fun<T>, errMessage: string): T {
  try {
    return fun();
  } catch (err) {
    throw new Error(errMessage);
  }
}

export function throwErrorIfFalse(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}
