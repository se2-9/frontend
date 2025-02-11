import { z } from 'zod';

export const createPostSchema = z.object({
  Title: z.string().min(1, 'Title must be at least 3 characters'),
  Subject: z.string().min(1, 'Subject must be at least 3 characters'),
  TutorGender: z.string(),
  IsOnline: z.boolean(),
  Place: z.string().optional(),
  HourlyRate: z.number().min(1),
  Description: z.string(),
});

export type CreatePostData = z.infer<typeof createPostSchema>;
