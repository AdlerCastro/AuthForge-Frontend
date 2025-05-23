import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/config/env.config';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('access_token')?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token de autenticação não encontrado',
        },
        { status: 401 },
      );
    }

    const res = await fetch(`${env.API_URL}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Erro ao buscar dados do usuário. ${error}`,
      },
      { status: 500 },
    );
  }
}
