'use server';

import { RegisterSchemaType, registerSchema } from '@/schemas/register.schema';
import { ResponseType } from '@/types/response.type';
import { api } from '@/service/api.service';

interface RegisterResponse extends ResponseType {
  error?: string;
}

export async function postRegister({
  data,
}: {
  data: RegisterSchemaType;
}): Promise<RegisterResponse> {
  try {
    // Validação local
    const validatedData = registerSchema.parse(data);

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = validatedData;

    // Formata nascimento como ISO
    const safePayload = {
      ...rest,
      birth_date: new Date(rest.birth_date).toISOString(),
    };

    const response = await api.post('/register', safePayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message || 'Erro ao registrar usuário',
        error: response.data.error,
      };
    }

    return {
      success: true,
      message: response.data.message || 'Registro realizado com sucesso',
    };
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: 'Erro desconhecido ao registrar o novo usuário',
      error: error?.message || String(error),
    };
  }
}
