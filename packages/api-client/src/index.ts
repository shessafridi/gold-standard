import { createORPCClient, type ClientContext } from '@orpc/client';
import type { ContractRouterClient } from '@orpc/contract';
import type { JsonifiedClient } from '@orpc/openapi-client';
import {
  OpenAPILink,
  type OpenAPILinkOptions,
} from '@orpc/openapi-client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { contract } from '@workspace/api-contract';

export type CreateClientOptions = OpenAPILinkOptions<ClientContext>;

export function createClient(options: CreateClientOptions) {
  const link = new OpenAPILink(contract, options);
  const client: JsonifiedClient<ContractRouterClient<typeof contract>> =
    createORPCClient(link);

  return client;
}

export function createQueryUtils(options: CreateClientOptions) {
  return createTanstackQueryUtils(createClient(options));
}

// Re-export the contract types so consumers don't need to
// depend on @workspace/api-contract directly
export type {
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from '@orpc/contract';
export { contract } from '@workspace/api-contract';
