import { z } from 'zod';

export const editUserSchema = z
  .object({
    name: z.string().min(3, 'Nome muito curto'),
    email: z.string().email('Email inválido'),
    role: z.enum(['USER', 'ADMIN']),
    RG: z.string().length(6, 'O RG deve conter exatamente 6 caracteres'),
    phone: z.string(),
    address: z.string(),
    birth_date: z.union([z.string(), z.date()]),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      path: ['confirmPassword'],
      message: 'As senhas não coincidem',
    },
  );

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
