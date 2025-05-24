import { User } from './user.type';

export interface UserResponse {
  data: User | null;
  success: boolean;
  message: string;
}
export interface UserListResponse {
  data: User[] | null;
  success: boolean;
  message: string;
}
