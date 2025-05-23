'server-only';

import { env } from '@/config/env.config';
import axios from 'axios';

export const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
