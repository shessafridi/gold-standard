export const tryJsonParse = <T>(str: string | undefined | null): T | null => {
  try {
    if (!str) return null;
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
};
export const tryJsonParseArray = <T>(str: string | undefined | null): T[] => {
  try {
    if (!str) return [];
    const parsed = JSON.parse(str) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as T[];
  } catch {
    return [];
  }
};
