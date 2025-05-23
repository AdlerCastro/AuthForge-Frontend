import { LoginSchemaType } from '@/schemas/login.schema';
import { apiClient } from '@/service/apiClient.service';
import { ResponseType } from '@/types/response.type';

export async function postLogin({
  data,
}: {
  data: LoginSchemaType;
}): Promise<ResponseType> {
  try {
    const response = await apiClient.post('/login', data);

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
