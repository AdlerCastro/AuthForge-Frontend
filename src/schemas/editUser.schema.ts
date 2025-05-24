import z from 'zod';

export const editUserSchema = z
  .object({
    name: z
      .string()
      .min(3, 'The name is less than 3 letters')
      .describe('User name'),
    email: z.string().email().describe('User email'),
    role: z.enum(['USER', 'ADMIN']).describe('User role'),
    RG: z
      .string()
      .min(6, 'The RG is less than 6 characters')
      .max(6, 'The RG is more than 6 characters')
      .describe('User RG'),
    phone: z.string().describe('User phone'),
    address: z.string().describe('User address'),
    birth_date: z.coerce.date().describe('User birth date'),
    password: z
      .string()
      .min(6, 'The password is less than 6 characters')
      .max(20, 'The password is more than 20 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
