'use client';

import { apiMid } from '@/service/apiMid.service';
import { UserResponse } from '@/types/responseUser.type';

export async function getSessionUser(): Promise<UserResponse> {
  const res = await apiMid('/me', {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  });

  const result = await res.json();

  if (res.status === 401) {
    return {
      data: null,
      success: false,
      message: `User not found. Please log in again. Status code: ${res.status} - ${result.message} `,
    };
  }

  if (res.status === 200) {
    return {
      data: result.data,
      success: true,
      message: 'Session user fetched successfully',
    };
  }

  return {
    data: null,
    success: false,
    message: `Error fetching session user. Status code: ${res.status}`,
  };
}
