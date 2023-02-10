export const limitString = (string, limit) => (string.length > 16 ? string.slice(0, limit) + "..." : string);
