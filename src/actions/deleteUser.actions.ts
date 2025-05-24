'use server';

import { cookies } from 'next/headers';
import { api } from '@/service/api.service';
import { ResponseType } from '@/types/response.type';

export async function deleteUser(id: string): Promise<ResponseType> {
  try {
    const token = (await cookies()).get('access_token')?.value;
    console.log('token: ', token);

    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não encontrado',
      };
    }

    const res = await api.delete(`/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id,
      },
    });

    console.log('Response Status: ', res.status);
    console.log('Response Data: ', res.data);

    const data = res.data;

    if (res.status !== 200) {
      return {
        success: data.success,
        message: data.message || 'Erro deletar o usuário',
      };
    }

    return {
      success: data.success,
      message: data.message || 'Usuário deletado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: `Erro ao deletar o usuário. ${String(error)}`,
    };
  }
}
