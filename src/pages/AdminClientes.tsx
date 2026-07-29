import React, { useContext, useState, FormEvent } from 'react';
import { DataContext } from '../context/DataContext';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Paper
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const AdminClientes: React.FC = () => {
  const { clients, addClient } = useContext(DataContext);
  const [newClient, setNewClient] = useState({ name: '', contact: '', phone: '' });

  const handleAddClient = (e: FormEvent) => {
    e.preventDefault();
    if (!newClient.name) return;
    addClient(newClient);
    setNewClient({ name: '', contact: '', phone: '' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <BusinessIcon color="primary" />
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Clientes</Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Agregar nuevo cliente</Typography>
        <Box component="form" onSubmit={handleAddClient} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <TextField label="Nombre de la Empresa" size="small" required value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} sx={{ flexGrow: 2, minWidth: 200 }} />
          <TextField label="Contacto" size="small" value={newClient.contact} onChange={e => setNewClient({ ...newClient, contact: e.target.value })} sx={{ flexGrow: 1, minWidth: 180 }} />
          <TextField label="Teléfono" size="small" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} sx={{ flexGrow: 1, minWidth: 150 }} />
          <Button type="submit" variant="contained" color="primary">Nuevo Cliente</Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Empresa</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Contacto</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Teléfono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(client => (
                <TableRow key={client.id} hover>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminClientes;
