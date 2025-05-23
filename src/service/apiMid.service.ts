export function apiMid(path: string, init?: RequestInit) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_MID_URL || 'http://localhost:3000';
  const apiPrefix = '/api';
  const url = new URL(apiPrefix.concat(path), baseUrl);

  return fetch(url.toString(), {
    ...init,
    credentials: 'include',
  });
}
