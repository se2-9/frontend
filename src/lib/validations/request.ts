import { z } from 'zod';

export const AcceptRequestSchema = z.object({
  request_id: z.string(),
  tutor_id: z.string(),
});

export const CreateRequestSchema = z.object({
  post_id: z.string(),
});

export type AcceptRequest = z.infer<typeof AcceptRequestSchema>;
export type CreateRequest = z.infer<typeof CreateRequestSchema>;
