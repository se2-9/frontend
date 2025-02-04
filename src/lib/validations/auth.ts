import { z } from 'zod';

export const registerStudentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().min(1),
});

// TODO: registerTutorSchema

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export type RegisterStudentRequest = z.infer<typeof registerStudentSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type VerifyEmailRequest = z.infer<typeof verifyEmailSchema>;
