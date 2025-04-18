import { z } from 'zod';

export const CreateReportSchema = z.object({
  content: z.string().min(1, 'Title must be at least 1 characters'),
});

export const UpdateReportSchema = z.object({
  report_id: z.string(),
  content: z.string(),
  status: z.string(),
});

export type CreateReportData = z.infer<typeof CreateReportSchema>;
export type UpdateReportData = z.infer<typeof UpdateReportSchema>;
