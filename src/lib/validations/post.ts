import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title must be at least 3 characters'),
  subject: z.string().min(1, 'Subject must be at least 3 characters'),
  tutor_gender: z.string(),
  is_online: z.boolean(),
  place: z.string().optional(),
  hourly_rate: z.number().min(1),
  description: z.string(),
});

export type CreatePostData = z.infer<typeof createPostSchema>;
