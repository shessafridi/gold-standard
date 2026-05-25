/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import z from 'zod';

const envSchema = z.object({
  API_URL: z.string().min(1, 'VITE_API_URL is required'),
});

export const env = envSchema.parse({
  API_URL: import.meta.env.VITE_API_URL,
});
