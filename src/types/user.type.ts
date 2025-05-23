import { Role } from '@/enum/role.enum';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  RG: string;
  phone: string;
  address: string;
  birth_date: string;
  created_at: string;
};
