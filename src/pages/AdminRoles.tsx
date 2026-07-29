import React, { useContext, useState, FormEvent } from 'react';
import { DataContext } from '../context/DataContext';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Paper
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

const AdminRoles: React.FC = () => {
  const { roles, addRole } = useContext(DataContext);
  const [newRole, setNewRole] = useState({ name: '', permissions: '' });

  const handleAddRole = (e: FormEvent) => {
    e.preventDefault();
    if (!newRole.name || !newRole.permissions) return;
    addRole(newRole);
    setNewRole({ name: '', permissions: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <SecurityIcon color="primary" />
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Roles y Permisos</Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Agregar nuevo rol</Typography>
        <Box component="form" onSubmit={handleAddRole} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <TextField label="Nombre del Rol" size="small" required value={newRole.name} onChange={e => setNewRole({ ...newRole, name: e.target.value })} sx={{ flexGrow: 1, minWidth: 200 }} />
          <TextField label="Permisos (ej. Ver, Crear)" size="small" required value={newRole.permissions} onChange={e => setNewRole({ ...newRole, permissions: e.target.value })} sx={{ flexGrow: 2, minWidth: 300 }} />
          <Button type="submit" variant="contained" color="primary">Nuevo Rol</Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Rol</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Permisos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id} hover>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.permissions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminRoles;
