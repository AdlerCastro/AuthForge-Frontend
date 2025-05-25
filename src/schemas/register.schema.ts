import z from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'Nome é obrigatório' })
      .min(3, 'The name is less than 3 letters')
      .describe('User name'),
    email: z
      .string({ required_error: 'Email é obrigatório' })
      .email({ message: 'Email inválido' })
      .describe('User email'),
    role: z.enum(['USER', 'ADMIN']).describe('User role'),
    RG: z
      .string()
      .min(6, 'The RG is less than 6 characters')
      .max(6, 'The RG is more than 6 characters')
      .describe('User RG'),
    phone: z
      .string({ required_error: 'Número é obrigatório' })
      .min(15, 'O número é inválido')
      .describe('User phone'),
    address: z
      .string({ required_error: 'Endereço é obrigatório' })
      .describe('User address'),
    birth_date: z.coerce
      .date({ required_error: 'Data de nascimento é obrigatório' })
      .describe('User birth date'),
    password: z
      .string({ required_error: 'Senha é obrigatório' })
      .min(6, 'The password is less than 6 characters')
      .max(20, 'The password is more than 20 characters'),
    confirmPassword: z
      .string({ required_error: 'Confirmação de senha é obrigatório' })
      .min(6, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
