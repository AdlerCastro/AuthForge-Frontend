import { LoginSchemaType } from '@/schemas/login.schema';
import { apiClient } from '@/service/apiClient.service';

interface LoginResponse {
  success: boolean;
  message: string;
}

export async function postLogin({
  data,
}: {
  data: LoginSchemaType;
}): Promise<LoginResponse> {
  try {
    const response = await apiClient.post('/login', data);

    return {
      success: true,
      message: response.data.message || 'Login realizado com sucesso',
    };
  } catch (error: any) {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Erro desconhecido';

    return {
      success: false,
      message,
    };
  }
}
