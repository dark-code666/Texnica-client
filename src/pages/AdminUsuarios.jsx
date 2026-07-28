import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Chip
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const AdminUsuarios = () => {
  const { users, roles, addUser } = useContext(DataContext);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Administrador' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    addUser(newUser);
    setNewUser({ name: '', email: '', role: 'Administrador' });
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <PeopleIcon color="primary" />
        <Typography variant="h5" color="primary.main" fontWeight="bold">Usuarios</Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main' }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>Agregar nuevo usuario</Typography>
        <Box component="form" onSubmit={handleAddUser} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <TextField
            label="Nombre completo" size="small" required
            value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <TextField
            label="Email" type="email" size="small" required
            value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Rol</InputLabel>
            <Select label="Rol" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              {roles.map(r => <MenuItem key={r.id} value={r.name}>{r.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">Nuevo Usuario</Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Rol</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Estado</TableCell>
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
