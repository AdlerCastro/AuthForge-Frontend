'use server';

import { cookies } from 'next/headers';
import { UserListResponse } from '@/types/responseUser.type';
import { api } from '@/service/api.service';

export async function getUsers(): Promise<UserListResponse> {
  try {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não encontrado',
        data: null,
      };
    }

    const res = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    return {
      success: data.success,
      message: data.message || 'Usuários obtidos com sucesso',
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: `Erro ao buscar os usuários. ${String(error)}`,
      data: null,
    };
  }
}
