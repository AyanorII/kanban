export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
