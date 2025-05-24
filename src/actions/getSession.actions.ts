'use server';

import { cookies } from 'next/headers';
import { UserResponse } from '@/types/responseUser.type';
import { api } from '@/service/api.service';

export async function getSessionUser(): Promise<UserResponse> {
  try {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não encontrado',
        data: null,
      };
    }

    const res = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    return {
      success: res.status === 200,
      message: data.data.message || 'Sessão obtida com sucesso',
      data: res.status === 200 ? data.data : null,
    };
  } catch (error) {
    return {
      success: false,
      message: `Erro ao buscar dados da sessão. ${String(error)}`,
      data: null,
    };
  }
}
