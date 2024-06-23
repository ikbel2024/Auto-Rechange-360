// src/app/models/register-response.interface.ts
import { User } from './user';

export interface RegisterResponse {
  message: string;
  user: User;
}
