import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  AUTH_SECRET: z.string().min(1),
  PORT: z.coerce.number().default(3000),
  CORS_ALLOW: z.string().optional(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  RESEND_API_KEY: z.string().min(1),
  FROM_EMAIL: z.email().default('noreply@vet-app.com'),
  CONTACT_EMAIL: z.email().default('contact@vet-app.com'),
  APP_NAME: z.string().default('Vet App'),
});

const env = envSchema.parse(process.env);

export default env;
