import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../generated/prisma/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolves to packages/db/prisma/dev.db regardless of which app starts the process
const dbPath = path.resolve(__dirname, '../dev.db');

const adapter = new PrismaBetterSqlite3({
  url: dbPath,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env['NODE_ENV'] !== 'production') globalForPrisma.prisma = prisma;
