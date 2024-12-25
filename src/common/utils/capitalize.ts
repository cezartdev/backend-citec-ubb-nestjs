export const toCapitalizeCase = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
