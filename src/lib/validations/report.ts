import { z } from 'zod';

export const CreateReportSchema = z.object({
  content: z.string().min(1, 'Title must be at least 1 characters'),
});

export type CreateReportData = z.infer<typeof CreateReportSchema>;
