import { z } from 'zod';

export const externalLinkValidator = z
  .url()
  .startsWith('https://')
  .transform(url => url.trim());
