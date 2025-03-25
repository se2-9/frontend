import { z } from 'zod';

export const omisePaymentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string().regex(/^\d{13,19}$/, 'Card number must be 13–19 digits'),
  expirationMonth: z.number().min(1, 'Invalid month').max(12, 'Invalid month'),
  expirationYear: z.number().min(2024, 'Must be 2024 or later'),
  securityCode: z.string().min(3).max(4),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  street2: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const payWithCardSchema = z.object({
  amount: z.number().int().positive(),
  card_token: z.string(),
  request_id: z.string(),
});

export type PayWithCardData = z.infer<typeof payWithCardSchema>;
export type OmisePaymentForm = z.infer<typeof omisePaymentSchema>;
