'use server';

import { RegisterSchemaType, registerSchema } from '@/schemas/register.schema';
import { env } from '@/config/env.config';
import { ResponseType } from '@/types/response.type';

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
    const { confirmPassword, ...rest } = validatedData;

    // Formata nascimento como ISO
    const safePayload = {
      ...rest,
      birth_date: new Date(rest.birth_date).toISOString(),
    };

    const response = await fetch(`${env.API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(safePayload),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Erro ao registrar usuário',
        error: result.error,
      };
    }

    return {
      success: true,
      message: result.message || 'Registro realizado com sucesso',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Erro desconhecido ao registrar o novo usuário',
      error: error?.message || String(error),
    };
  }
}
