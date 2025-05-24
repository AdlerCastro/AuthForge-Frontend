import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid().describe('User ID'),
  name: z.string().describe('User name'),
  email: z.string().email().describe('User email'),
  role: z.enum(['ADMIN', 'USER']).describe('User role'),
  RG: z.string().describe('User RG'),
  phone: z.string().describe('User phone'),
  address: z.string().describe('User address'),
  birth_date: z.date().describe('User birth date'),
  created_at: z.date().describe('User creation date'),
});

export type UserSchemaType = z.infer<typeof userSchema>;
