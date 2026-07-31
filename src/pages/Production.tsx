import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, Chip
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';

const Production: React.FC = () => {
  const navigate = useNavigate();
  const { purchaseOrders } = React.useContext(DataContext);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>Production Module</Typography>
      <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InventoryIcon color="primary" />
            <Typography variant="h6">Purchase Orders (POs)</Typography>
          </Box>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate('/po/new')}>Create PO</Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>PO Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Order Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Required Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseOrders.map(po => (
                <TableRow key={po.id} hover>
                  <TableCell>{po.id}</TableCell>
                  <TableCell>{po.client}</TableCell>
                  <TableCell>{po.date}</TableCell>
                  <TableCell>{po.required}</TableCell>
                  <TableCell>
                    <Chip label={po.status} size="small" color={po.status === 'In Process' ? 'primary' : 'success'} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" onClick={() => navigate(`/po/${po.id}`)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
              {purchaseOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No purchase orders registered.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Production;
