'use server';

import { LoginSchemaType } from '@/schemas/login.schema';
import { api } from '@/service/api.service';
import { ResponseType } from '@/types/response.type';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function postLogin({
  data,
}: {
  data: LoginSchemaType;
}): Promise<ResponseType> {
  try {
    const response = await api.post('/login', data, {
      withCredentials: true,
    });

    const setCookieHeader = response.headers['set-cookie'];

    if (!setCookieHeader || !setCookieHeader.length) {
      return {
        success: false,
        message: 'Cookie não encontrado',
      };
    }

    const parsed = parse(setCookieHeader[0]);
    const token = parsed['access_token'];

    if (!token) {
      return {
        success: false,
        message: 'Token de autenticação não encontrado no cookie',
      };
    }

    (await cookies()).set('access_token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      success: true,
      message: response.data.message || 'Login realizado com sucesso',
    };
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      `Erro desconhecido. ${status}`;

    return {
      success: false,
      message,
    };
  }
}
