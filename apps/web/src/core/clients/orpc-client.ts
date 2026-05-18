import { createClient, createQueryUtils } from '@workspace/api-client';

const baseUrl = `http://localhost:3000`;

export const orpcClient = createClient(baseUrl);
export const orpcQueryClient = createQueryUtils(baseUrl);
