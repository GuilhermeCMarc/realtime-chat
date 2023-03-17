export function getFromLocalStorage<T = any>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "");
  } catch (e) {
    return null;
  }
}
