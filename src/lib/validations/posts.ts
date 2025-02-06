// lib/validations/post.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  Subject: z.string().min(3, 'Subject must be at least 3 characters long'),
  Gender: z.string().min(3, 'Gender must be at least 3 characters long'),
  OnlineOnsite: z.string().min(3, 'Online/Onsite must be specified'),
  Place: z.string().min(3, 'Place must be specified'),
  HourlyRate: z.string().min(3, 'Hourly rate must be specified'),
  Description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
});

export type CreatePostData = z.infer<typeof createPostSchema>;
