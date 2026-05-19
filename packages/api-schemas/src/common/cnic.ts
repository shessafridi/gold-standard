import z from 'zod';

export const cnicValidator = z
  .string()
  .trim()
  .regex(/^\d+$/, 'CNIC must contain digits only')
  .length(13, 'CNIC must be exactly 13 digits');
