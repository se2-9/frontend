import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  Subject: z.string().min(1, 'Subject is required'),
  Gender: z.string().min(1, 'Gender is required'),
  OnlineOnsite: z.string().min(1, 'Option is required'),
  Place: z.string().min(1, 'Place is required'),
  HourlyRate: z.number().min(1, 'Hourly rate must be at least 1'),
  Description: z.string().min(1, 'Description is required'),
  tags: z.string().array()
});

export const postBackendSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    subject: z.string().min(1, 'Subject is required'),
    gender: z.string().min(1, 'Gender is required'),
    is_online: z.string().min(1, 'Option is required'),
    place: z.string().min(1, 'Place is required'),
    hourly_rate: z.number().min(1, 'Hourly rate must be at least 1'),
    min_hourly_rate: z.number().min(1, 'Hourly rate must be at least 1').optional(),
    max_hourly_rate: z.number().min(1, 'Hourly rate must be at least 1').optional(),
    description: z.string().min(1, 'Description is required'),
});



export function transformData(input: PostBackendData): CreatePostData {
    return {
        title: input.title,
        Subject: input.subject,
        Gender: input.gender,
        OnlineOnsite: input.is_online ? "Online" : "Onsite",
        Place: input.place,
        HourlyRate: Math.max(input.hourly_rate, 1),
        Description: input.description,
        tags: [input.subject, input.gender, input.is_online ? "Online" : "Onsite"]
    };
}

export type CreatePostData = z.infer<typeof createPostSchema>; 
export type PostBackendData = z.infer<typeof postBackendSchema>; 