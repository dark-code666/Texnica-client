// Auth, Users, Roles, Permissions

export interface Role {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  module: string;
  active: boolean;
}

export interface User {
  id: number;
  userName: string;
  userEmail: string;
  roleId?: number | null;
  roleName?: string;
  mustChangePassword: boolean;
  customerId?: number;
  customerName?: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
  customerId: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  userName: string;
  userEmail: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
