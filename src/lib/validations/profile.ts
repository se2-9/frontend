import { z } from 'zod';

export const EditUserProfileSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().min(1),
  tutor_education_level: z.string(),
  tutor_portfolio: z.string(),
  phone_number: z.string().min(10).max(10),
  date_of_birth: z.string(),
  verify_status: z.boolean(),
  role: z.string(),
  citizen_id: z.string().min(13).max(13),
  gender: z.string(),
});
// TODO: registerTutorSchema
export const EditUserProfileFormSchema = z.object({
  password: z.string(),
  name: z.string().min(1),
  phone_number: z.string().max(10).min(10),
  tutor_education_level: z.string(),
  tutor_portfolio: z.string(),
  date_of_birth: z.string(),
  citizen_id: z.string().min(13).max(13),
});
export const AddCardFormSchema = z.object({
  name: z.string().min(1),
  number: z.string().min(15).max(19),
  expiration_year: z.string(),
  expiration_month: z.string().max(2),
  cvv: z.string().min(3).max(3),
});
export const DeleteCardSchema = z.object({
  number: z.string().min(15).max(19),
});
export type EditUserProfileRequest = z.infer<typeof EditUserProfileSchema>;
export type EditUserProfileFormRequest = z.infer<
  typeof EditUserProfileFormSchema
>;
export type AddCardFormRequest = z.infer<typeof AddCardFormSchema>;
export type DeleteCardFormRequest = z.infer<typeof DeleteCardSchema>;
// export type EditCardSchemaRequest = z.infer<typeof EditCardSchema>;
