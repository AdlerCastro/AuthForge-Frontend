import { User } from './user.type';

export interface UserResponse {
  data: User;
  success: boolean;
  message: string;
}
export interface UserListResponse {
  data: User[];
  success: boolean;
  message: string;
}
