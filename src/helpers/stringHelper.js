export const limitString = (string, limit) => (string.length > limit ? string.slice(0, limit) + "..." : string);
