import z from 'zod';

export const messageOutputSchema = z.object({
  message: z.string(),
});

export type MessageOutput = z.infer<typeof messageOutputSchema>;
