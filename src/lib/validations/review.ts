import { z } from 'zod';

export const reviewSchema = z.object({
  post_id: z.string(),
  tutor_id: z.string(),
  rating: z.number().int().min(1).max(5),
  subject: z.string().min(1),
});

export type ReviewRequest = z.infer<typeof reviewSchema>;
