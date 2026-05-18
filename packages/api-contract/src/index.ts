import { postContract } from './post.contract';

export const contract = {
  post: postContract,
};

export type {
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from '@orpc/contract';
