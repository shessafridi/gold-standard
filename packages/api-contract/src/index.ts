import { authContract } from './auth.contract';
import { postContract } from './post.contract';
import { userContract } from './user.contract';

export const contract = {
  post: postContract,
  auth: authContract,
  user: userContract,
};

export type {
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from '@orpc/contract';
