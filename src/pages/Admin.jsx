import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Stack, Chip,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Admin = () => {
  const { users, roles, clients, addUser, addRole, addClient } = useContext(DataContext);
  
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Administrador' });
  const [newRole, setNewRole] = useState({ name: '', permissions: '' });
  const [newClient, setNewClient] = useState({ name: '', contact: '', phone: '' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    addUser(newUser);
    setNewUser({ name: '', email: '', role: 'Administrador' });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRole.name || !newRole.permissions) return;
    addRole(newRole);
    setNewRole({ name: '', permissions: '' });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.name) return;
    addClient(newClient);
    setNewClient({ name: '', contact: '', phone: '' });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary.main" fontWeight="bold">
        Módulo de Administración
      </Typography>
      
      <Stack spacing={3}>
        
        {/* USERS SECTION */}
        <Accordion defaultExpanded elevation={2} sx={{ borderTop: 4, borderColor: 'primary.main' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <PeopleIcon color="primary" />
              <Typography variant="h6">Usuarios</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
          
          <Box component="form" onSubmit={handleAddUser} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            <TextField 
              label="Nombre" size="small" variant="outlined"
              value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}
              sx={{ flexGrow: 1, minWidth: 200 }}
            />
            <TextField 
              label="Email" type="email" size="small" variant="outlined"
              value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}
              sx={{ flexGrow: 1, minWidth: 200 }}
            />
            <FormControl size="small" sx={{ flexGrow: 1, minWidth: 200 }}>
              <InputLabel>Rol</InputLabel>
              <Select
                value={newUser.role} label="Rol"
                onChange={e => setNewUser({...newUser, role: e.target.value})}
              >
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
                      <Chip 
                        label={user.status} 
                        size="small" 
                        color={user.status === 'Activo' ? 'success' : 'primary'} 
                        variant="outlined" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* ROLES SECTION */}
        <Accordion defaultExpanded elevation={2} sx={{ borderTop: 4, borderColor: 'primary.main' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <SecurityIcon color="primary" />
              <Typography variant="h6">Roles y Permisos</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
          
          <Box component="form" onSubmit={handleAddRole} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            <TextField 
              label="Nombre del Rol" size="small" variant="outlined"
              value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})}
              sx={{ flexGrow: 1, minWidth: 200 }}
            />
            <TextField 
              label="Permisos (ej. Ver, Crear)" size="small" variant="outlined"
              value={newRole.permissions} onChange={e => setNewRole({...newRole, permissions: e.target.value})}
              sx={{ flexGrow: 2, minWidth: 200 }}
            />
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
          </AccordionDetails>
        </Accordion>

        {/* CLIENTS SECTION */}
        <Accordion defaultExpanded elevation={2} sx={{ borderTop: 4, borderColor: 'primary.main' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <BusinessIcon color="primary" />
              <Typography variant="h6">Clientes</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
          
          <Box component="form" onSubmit={handleAddClient} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            <TextField 
              label="Nombre de la Empresa" size="small" variant="outlined" required
              value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})}
              sx={{ flexGrow: 1, minWidth: 200 }}
            />
            <TextField 
              label="Contacto" size="small" variant="outlined"
              value={newClient.contact} onChange={e => setNewClient({...newClient, contact: e.target.value})}
              sx={{ flexGrow: 1, minWidth: 200 }}
            />
            <TextField 
              label="Teléfono" size="small" variant="outlined"
              value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})}
              sx={{ flexGrow: 1, minWidth: 150 }}
            />
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
          </AccordionDetails>
        </Accordion>

      </Stack>
    </Box>
  );
};

export default Admin;
