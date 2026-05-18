import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { ContractRouterClient } from '@orpc/contract';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { contract } from '@workspace/api-contract';

export function createClient(baseUrl: string) {
  const link = new RPCLink({ url: `${baseUrl}/rpc` });
  const client: ContractRouterClient<typeof contract> = createORPCClient(link);

  return client;
}

export function createQueryUtils(baseUrl: string) {
  return createTanstackQueryUtils(createClient(baseUrl));
}

// Re-export the contract types so consumers don't need to
// depend on @workspace/api-contract directly
export type {
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from '@orpc/contract';
export { contract } from '@workspace/api-contract';
