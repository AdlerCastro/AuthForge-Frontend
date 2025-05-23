import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'The password is less than 6 characters'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
