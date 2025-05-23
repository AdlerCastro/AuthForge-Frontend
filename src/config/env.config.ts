import z from 'zod';

console.log('🔍 API_URL:', process.env.API_URL);
console.log('🔍 NEXT_PUBLIC_API_MID_URL:', process.env.NEXT_PUBLIC_API_MID_URL);
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);

const envSchema = z.object({
  API_URL: z.string().url({ message: 'API_URL inválida' }),
  NEXT_PUBLIC_API_MID_URL: z.string().url({ message: 'MID URL inválida' }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
