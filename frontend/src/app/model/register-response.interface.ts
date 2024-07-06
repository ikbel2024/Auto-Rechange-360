// src/app/models/register-response.interface.ts
import { User } from '../model/user';

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}
