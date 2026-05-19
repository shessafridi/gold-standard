import z from 'zod';

// our supported currencies for now
export const iso4217CurrencyCodes = Object.freeze([
  'USD',
  'EUR',
  'GBP',
  'PKR',
  'INR',
] as const);

export type Iso4217CurrencyCode = (typeof iso4217CurrencyCodes)[number];

export const iso4217CurrencyCodeValidator = z.enum(iso4217CurrencyCodes);
