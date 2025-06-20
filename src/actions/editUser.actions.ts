'use server';

import { editUserSchema, EditUserSchemaType } from '@/schemas/editUser.schema';
import { api } from '@/service/api.service';
import { ResponseType } from '@/types/response.type';
import { cookies } from 'next/headers';

export async function editUser(
  id: string,
  data: EditUserSchemaType,
): Promise<ResponseType> {
  try {
    const parsedData = editUserSchema.parse(data);

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = parsedData;

    const safePayload = {
      ...rest,
      birth_date: rest.birth_date
        ? new Date(rest.birth_date).toISOString()
        : null,
    };

    const token = (await cookies()).get('access_token')?.value;

    const response = await api.patch(`/admin/${id}`, safePayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: `Erro ao editar o usuário. ${response.data.message}`,
      };
    }

    return {
      success: true,
      message: response.data.message || 'Usuário editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: `Erro ao editar o usuário. ${String(error)}`,
    };
  }
}
