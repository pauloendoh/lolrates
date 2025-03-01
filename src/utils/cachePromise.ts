import { myLocalStorage } from "./myLocalStorage";

export async function cachePromise<T>(
  key: string,
  ttlInMillis: number,
  promise: () => Promise<T>
) {
  const cached = myLocalStorage.get<T>(key);
  if (cached) {
    return cached;
  }

  const result = await promise();

  myLocalStorage.set(key, result, { ttl: ttlInMillis * 1000 });

  return result;
}
