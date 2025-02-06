import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  Subject: z.string().min(1, 'Subject is required'),
  Gender: z.string().min(1, 'Gender is required'),
  OnlineOnsite: z.string().min(1, 'Option is required'),
  Place: z.string().min(1, 'Place is required'),
  HourlyRate: z.number().min(1, 'Hourly rate must be at least 1'),
  Description: z.string().min(1, 'Description is required'),
});

export type CreatePostData = z.infer<typeof createPostSchema>;
