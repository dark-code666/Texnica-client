import React, { useContext, useState, FormEvent } from 'react';
import { DataContext } from '../context/DataContext';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Chip
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const AdminUsuarios: React.FC = () => {
  const { users, roles, addUser } = useContext(DataContext);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Administrator' });

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    addUser(newUser);
    setNewUser({ name: '', email: '', role: 'Administrator' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <PeopleIcon color="primary" />
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Users</Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Add new user</Typography>
        <Box component="form" onSubmit={handleAddUser} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <TextField label="Full Name" size="small" required value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} sx={{ flexGrow: 1, minWidth: 200 }} />
          <TextField label="Email" type="email" size="small" required value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} sx={{ flexGrow: 1, minWidth: 200 }} />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Role</InputLabel>
            <Select label="Role" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value as string })}>
              {roles.map(r => <MenuItem key={r.id} value={r.name}>{r.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">New User</Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip label={user.status} color="success" size="small" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminUsuarios;
