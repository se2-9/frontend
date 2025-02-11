import { z } from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(1, 'Title must be at least 3 characters'),
    subject: z.string().min(1, 'Subject must be at least 3 characters'),
    tutor_gender: z.string(),
    is_online: z.boolean(),
    place: z.string().optional(),
    hourly_rate: z.number().min(1),
    description: z.string(),
    tags: z.any().array()

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
        subject: input.subject,
        tutor_gender: input.gender,
        is_online: input.is_online ? true : false,
        place: input.place,
        hourly_rate: Math.max(input.hourly_rate, 1),
        description: input.description,
        tags: [input.subject, input.gender, input.is_online ? true : false]
    };
}

export type CreatePostData = z.infer<typeof createPostSchema>; 
export type PostBackendData = z.infer<typeof postBackendSchema>; 