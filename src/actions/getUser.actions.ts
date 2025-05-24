'use server';

import { cookies } from 'next/headers';
import { UserResponse } from '@/types/responseUser.type';
import { api } from '@/service/api.service';
import { User } from '@/types/user.type';

export async function getUser(id: string): Promise<UserResponse> {
  try {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não encontrado',
        data: {} as User,
      };
    }

    const res = await api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    return {
      success: data.success,
      message: data.message || 'Usuário obtido com sucesso',
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: `Erro ao buscar o usuário. ${String(error)}`,
      data: {} as User,
    };
  }
}
