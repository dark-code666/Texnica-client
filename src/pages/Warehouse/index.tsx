import React from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Chip
} from '@mui/material';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';

const Warehouse: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Warehouse Module
      </Typography>
      
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main', flex: 1, minWidth: 280 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WarehouseIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Items</Typography>
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>1,234</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'success.main', flex: 1, minWidth: 280 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <InventoryIcon sx={{ fontSize: 40, color: 'success.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>In Stock</Typography>
              <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 'bold' }}>856</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'warning.main', flex: 1, minWidth: 280 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalShippingIcon sx={{ fontSize: 40, color: 'warning.main' }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Pending</Typography>
              <Typography variant="h4" sx={{ color: 'warning.main', fontWeight: 'bold' }}>378</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Inventory Table */}
      <Paper elevation={2} sx={{ p: 3, borderTop: 4, borderColor: 'primary.main' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Inventory List</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Item
          </Button>
        </Box>
        
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>SKU</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Item Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>SKU-001</TableCell>
                <TableCell>Cotton Fabric - White</TableCell>
                <TableCell>Fabric</TableCell>
                <TableCell>500</TableCell>
                <TableCell>A-12</TableCell>
                <TableCell>
                  <Chip label="In Stock" size="small" color="success" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>SKU-002</TableCell>
                <TableCell>Cotton Fabric - Navy</TableCell>
                <TableCell>Fabric</TableCell>
                <TableCell>350</TableCell>
                <TableCell>A-13</TableCell>
                <TableCell>
                  <Chip label="In Stock" size="small" color="success" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>SKU-003</TableCell>
                <TableCell>Buttons - Metal</TableCell>
                <TableCell>Accessories</TableCell>
                <TableCell>2000</TableCell>
                <TableCell>B-05</TableCell>
                <TableCell>
                  <Chip label="Low Stock" size="small" color="warning" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>SKU-004</TableCell>
                <TableCell>Thread - Black</TableCell>
                <TableCell>Accessories</TableCell>
                <TableCell>0</TableCell>
                <TableCell>B-06</TableCell>
                <TableCell>
                  <Chip label="Out of Stock" size="small" color="error" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Warehouse;
