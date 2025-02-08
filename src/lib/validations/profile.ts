import { z } from 'zod';

export const EditUserProfileSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().min(1),
  tutor_education_level: z.string(),
  tutor_portfolio: z.string(),
  date_of_birth: z.string(),
  verify_status: z.boolean(),
  role: z.string(),
  citizen_id: z.string().min(13).max(13),
  gender: z.string()
});
// TODO: registerTutorSchema
export const EditUserProfileFormSchema = z.object({
    password: z.string(),
    name: z.string().min(1),
    tutor_education_level: z.string(),
    tutor_portfolio: z.string(),
    date_of_birth: z.string(),
    citizen_id: z.string().min(13).max(13),
})
export type EditUserProfileRequest = z.infer<typeof EditUserProfileSchema>;
export type EditUserProfileFormRequest = z.infer<typeof EditUserProfileFormSchema>
