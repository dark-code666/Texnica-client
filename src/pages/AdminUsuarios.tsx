import React, { useState, useEffect, FormEvent } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Chip, CircularProgress, Alert, Snackbar
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { rolesApi, userRoleApi, authApi, usersApi } from '../utils/api';

interface Role {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

interface User {
  id: number;
  userName: string;
  userEmail: string;
  active: boolean;
  mustChangePassword: boolean;
  roleId?: number;
  roleName?: string;
}


const DEFAULT_PASSWORD = 'inicio';

const AdminUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', roleId: 1 });
  const [snackbar, setSnackbar] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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
  };

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newUser.name || !newUser.email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Create user with default password "inicio"
      const res = await authApi.register(newUser.name, newUser.email, DEFAULT_PASSWORD);
      const createdUser = res.data.user;

      // Assign role to the new user
      if (createdUser?.id && newUser.roleId) {
        await userRoleApi.assignRole(createdUser.id, newUser.roleId);
      }

      setSnackbar(`User "${newUser.name}" created successfully. Default password: "${DEFAULT_PASSWORD}"`);
      setNewUser({ name: '', email: '', roleId: roles[0]?.id || 1 });

      loadData();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Error creating the user.';
      setError(msg);
    }
  };

  const handleAssignRole = async (userId: number, roleId: number) => {
    try {
      await userRoleApi.assignRole(userId, roleId);
      setSnackbar('Role assigned successfully.');
      loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to assign role');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <PeopleIcon color="primary" />
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Users</Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Add new user</Typography>
        <Box component="form" onSubmit={handleCreateUser} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <TextField label="Full Name" size="small" required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} sx={{ flexGrow: 1, minWidth: 200 }} />
          <TextField label="Email" type="email" size="small" required value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} sx={{ flexGrow: 1, minWidth: 200 }} />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Role</InputLabel>
            <Select label="Role" value={newUser.roleId} onChange={e => setNewUser({ ...newUser, roleId: e.target.value as number })}>
              {roles.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
            </Select>

          </FormControl>
          <Button type="submit" variant="contained" color="primary">New User</Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          New users are created with the default password <strong>"{DEFAULT_PASSWORD}"</strong>. On first login, the system will prompt them to create their own password.
        </Alert>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.userEmail}</TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <Select
                        value={user.roleId || ''}
                        onChange={(e) => handleAssignRole(user.id, e.target.value as number)}
                        displayEmpty
                      >
                        <MenuItem value="">No Role</MenuItem>
                        {roles.map(r => (
                          <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Chip label={user.active ? 'Active' : 'Inactive'} color={user.active ? 'success' : 'default'} size="small" variant="outlined" />
                  </TableCell>

                  <TableCell>
                    <Button size="small" variant="outlined">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar('')}
        message={snackbar}
      />
    </Box>
  );
};

export default AdminUsuarios;
