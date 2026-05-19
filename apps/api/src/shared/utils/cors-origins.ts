import env from '@/env';

const devOrigins = new Set([
  'http://localhost:4200',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'http://localhost:5006',
  'http://localhost:5007',
  'http://localhost:5008',
  'http://localhost:5009',
  'http://localhost:5200',
]);

const normalizeOrigin = (origin: string) => origin.trim().replace(/\/$/, '');

const getAllowedOriginsFromEnvironment = (): string[] => {
  const list = env.CORS_ALLOW;

  if (typeof list !== 'string' || !list.trim()) return [];

  return list.split(',').map(normalizeOrigin).filter(Boolean);
};

export const resolveCorsOrigins = (): string[] => {
  const envOrigins = getAllowedOriginsFromEnvironment();

  const isDev = env.NODE_ENV !== 'production';

  const combined = new Set<string>(envOrigins);

  if (isDev) {
    devOrigins.forEach(o => combined.add(o));
  }

  return [...combined];
};
