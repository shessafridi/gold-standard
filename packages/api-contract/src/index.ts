import { authContract } from './auth.contract';
import { postContract } from './post.contract';

export const contract = {
  post: postContract,
  auth: authContract,
};

export type {
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from '@orpc/contract';
