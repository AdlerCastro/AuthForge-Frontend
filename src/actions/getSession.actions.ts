'use server';

import { cookies } from 'next/headers';
import { env } from '@/config/env.config';
import { UserResponse } from '@/types/responseUser.type';

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

    const res = await fetch(`${env.API_URL}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    return {
      success: res.status === 200,
      message: data.message || 'Sessão obtida com sucesso',
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
