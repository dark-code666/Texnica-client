import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { authApi, rolesApi, userRoleApi, usersApi } from '../../utils/api';

export interface Role {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface User {
  id: number;
  userName: string;
  userEmail: string;
  active: boolean;
  mustChangePassword: boolean;
  roleId?: number;
  roleName?: string;
}

export interface NewUserForm {
  name: string;
  email: string;
  roleId: number;
}

const DEFAULT_PASSWORD = 'inicio';

export const useAdminUsuarios = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newUser, setNewUser] = useState<NewUserForm>({ name: '', email: '', roleId: 1 });
  const [snackbar, setSnackbar] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [rolesRes, usersRes] = await Promise.all([
        rolesApi.getAll(),
        usersApi.getAll(),
      ]);

      setRoles(rolesRes.data);
      setUsers(usersRes.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateUser = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newUser.name || !newUser.email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await authApi.createUser(newUser.name, newUser.email);
      const createdUser = res.data.user;

      if (createdUser?.id && newUser.roleId) {
        await userRoleApi.assignRole(createdUser.id, newUser.roleId);
      }

      setSnackbar(`User "${newUser.name}" created successfully. Default password: "${DEFAULT_PASSWORD}"`);
      setNewUser({ name: '', email: '', roleId: roles[0]?.id || 1 });
      await loadData();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Error creating the user.';
      setError(msg);
    }
  }, [loadData, newUser, roles]);

  const handleAssignRole = useCallback(async (userId: number, roleId: number) => {
    try {
      await userRoleApi.assignRole(userId, roleId);
      setSnackbar('Role assigned successfully.');
      await loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to assign role');
    }
  }, [loadData]);

  const defaultPassword = useMemo(() => DEFAULT_PASSWORD, []);

  return {
    users,
    roles,
    loading,
    error,
    newUser,
    snackbar,
    defaultPassword,
    setNewUser,
    setError,
    setSnackbar,
    loadData,
    handleCreateUser,
    handleAssignRole,
  };
};
