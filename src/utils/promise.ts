export async function promiseOrNull<T>(promise: Promise<T>): Promise<T | null> {
  return await promise.catch(() => null);
}
