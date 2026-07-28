import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import {
  Box, Typography, Paper, TextField, Button, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import Select from 'react-select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// react-select custom styles matching MUI theme
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 56,
    borderColor: state.isFocused ? '#0f4c81' : '#c4c4c4',
    borderWidth: state.isFocused ? 2 : 1,
    borderRadius: 4,
    boxShadow: 'none',
    '&:hover': { borderColor: '#0f4c81' },
    cursor: 'pointer',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9e9e9e',
    fontSize: '1rem',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '1rem',
  }),
  input: (base) => ({
    ...base,
    fontSize: '1rem',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    borderRadius: 6,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    border: '1px solid #e6f0fa',
    marginTop: 4,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    maxHeight: 280,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#e6f0fa'
      : state.isFocused
      ? '#f0f7ff'
      : 'white',
    color: '#333',
    cursor: 'pointer',
    padding: '12px 16px',
    borderBottom: '1px solid #f5f5f5',
    '&:last-child': { borderBottom: 'none' },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '2px 12px',
  }),
};

// Custom option rendering showing name + contact + phone
const ClientOption = ({ innerRef, innerProps, data, isSelected, isFocused }) => (
  <div
    ref={innerRef}
    {...innerProps}
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 16px',
      borderBottom: '1px solid #f0f0f0',
      backgroundColor: isSelected ? '#e6f0fa' : isFocused ? '#f0f7ff' : 'white',
      cursor: 'pointer',
    }}
  >
    <span style={{ fontWeight: 700, color: '#0f4c81', fontSize: '0.95rem' }}>
      {data.label}
    </span>
    <span style={{ color: '#757575', fontSize: '0.78rem', marginTop: 2 }}>
      👤 {data.contact || '—'} &nbsp;·&nbsp; 📞 {data.phone || '—'}
    </span>
  </div>
);

const CreatePO = () => {
  const navigate = useNavigate();
  const { addPO, clients } = useContext(DataContext);

  const [poData, setPoData] = useState({
    id: '',
    date: new Date().toISOString().split('T')[0],
    required: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    client: '',
  });

  const [items, setItems] = useState([
    { id: 1, qty: 0, uom: 'ea', item: '', desc: '', price: 0, amount: 0 }
  ]);

  // Build options for react-select
  const clientOptions = clients.map(c => ({
    value: c.name,
    label: c.name,
    contact: c.contact,
    phone: c.phone,
  }));

  const selectedOption = clientOptions.find(o => o.value === poData.client) || null;

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'qty' || field === 'price') {
          updated.amount = (parseFloat(updated.qty) || 0) * (parseFloat(updated.price) || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), qty: 0, uom: 'ea', item: '', desc: '', price: 0, amount: 0 }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!poData.client) { alert('Por favor selecciona un cliente'); return; }
    addPO({ ...poData, items });
    navigate('/production');
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 1000, borderTop: 4, borderColor: 'primary.main' }}>
        <Typography variant="h5" gutterBottom color="primary.main" fontWeight="bold">
          Crear Nueva Orden de Compra
        </Typography>

        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <Grid container spacing={3} alignItems="flex-start">

            {/* PO Number */}
            <Grid item xs={12} md={4}>
              <TextField
                label="PO Number"
                value={poData.id}
                onChange={e => setPoData({ ...poData, id: e.target.value })}
                fullWidth required
                placeholder="Ej. Z1026811"
              />
            </Grid>

            {/* Fecha Requerida */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Fecha Requerida"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={poData.required}
                onChange={e => setPoData({ ...poData, required: e.target.value })}
                required fullWidth
              />
            </Grid>

            {/* Cliente – react-select LookupEdit */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'relative' }}>
                {/* Floating label matching MUI outlined style */}
                <Typography
                  component="label"
                  sx={{
                    position: 'absolute',
                    top: -9,
                    left: 12,
                    bgcolor: 'white',
                    px: 0.5,
                    fontSize: '0.75rem',
                    color: selectedOption ? '#0f4c81' : '#666',
                    zIndex: 10,
                    pointerEvents: 'none',
                    lineHeight: 1,
                  }}
                >
                  Cliente *
                </Typography>
                <Select
                  options={clientOptions}
                  value={selectedOption}
                  onChange={(opt) => setPoData({ ...poData, client: opt ? opt.value : '' })}
                  components={{ Option: ClientOption }}
                  styles={selectStyles}
                  placeholder="Buscar cliente..."
                  isClearable
                  noOptionsMessage={() => 'No se encontraron clientes'}
                />
              </Box>
            </Grid>

            {/* Detalle de Items */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
                <Typography variant="h6" color="primary.main">Detalle de Productos</Typography>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddItem}>
                  Agregar Línea
                </Button>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead sx={{ backgroundColor: 'primary.light' }}>
                    <TableRow>
                      <TableCell>Line #</TableCell>
                      <TableCell>QTY</TableCell>
                      <TableCell>UOM</TableCell>
                      <TableCell>ITEM CODE</TableCell>
                      <TableCell>DESCRIPTION</TableCell>
                      <TableCell>PRICE</TableCell>
                      <TableCell>AMOUNT</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <TextField type="number" size="small" variant="standard"
                            value={item.qty} onChange={e => handleItemChange(item.id, 'qty', e.target.value)}
                            inputProps={{ min: 0 }} sx={{ width: 80 }} />
                        </TableCell>
                        <TableCell>
                          <TextField size="small" variant="standard"
                            value={item.uom} onChange={e => handleItemChange(item.id, 'uom', e.target.value)}
                            sx={{ width: 60 }} />
                        </TableCell>
                        <TableCell>
                          <TextField size="small" variant="standard"
                            value={item.item} onChange={e => handleItemChange(item.id, 'item', e.target.value)}
                            sx={{ width: 120 }} />
                        </TableCell>
                        <TableCell>
                          <TextField size="small" variant="standard" fullWidth
                            value={item.desc} onChange={e => handleItemChange(item.id, 'desc', e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <TextField type="number" size="small" variant="standard"
                            value={item.price} onChange={e => handleItemChange(item.id, 'price', e.target.value)}
                            inputProps={{ min: 0, step: '0.01' }} sx={{ width: 80 }} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>${item.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => handleRemoveItem(item.id)} disabled={items.length === 1}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ backgroundColor: 'grey.100' }}>
                      <TableCell colSpan={6} align="right" sx={{ fontWeight: 'bold' }}>TOTAL:</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>${totalAmount.toFixed(2)}</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Submit */}
            <Grid item xs={12} display="flex" justifyContent="flex-end" mt={2}>
              <Button type="submit" variant="contained" color="primary" size="large"
                disabled={!poData.id || !poData.client}>
                Guardar Orden de Compra
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreatePO;
