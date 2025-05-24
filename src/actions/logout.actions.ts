'use server';

import { api } from '@/service/api.service';
import { ResponseType } from '@/types/response.type';
import { cookies } from 'next/headers';

export async function logout(): Promise<ResponseType> {
  try {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não encontrado',
      };
    }

    const response = await api.delete('/logout', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      (await cookies()).delete('access_token');

      return {
        success: true,
        message: 'Logout successful',
      };
    }

    if (response.status === 401) {
      return {
        success: false,
        message: 'Unauthorized. Please log in again.',
      };
    } else {
      return {
        success: false,
        message: `Logout failed. ${response.status} - ${response.data.message}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `An error occurred during logout. ${error}`,
    };
  }
}
