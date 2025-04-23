import { z } from 'zod';

export const CreateBlacklistSchema = z.object({
  email: z.string().email().min(1).max(255),
  content: z.string().min(1),
});

export type CreateBlacklistData = z.infer<typeof CreateBlacklistSchema>;
