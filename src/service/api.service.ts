import { env } from '@/config/env.config';
import axios from 'axios';

export const api = axios.create({
  baseURL: env.DATABASE_URL,
  withCredentials: true,
});
