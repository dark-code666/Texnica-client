import React, { useState, useEffect, FormEvent, useContext } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Paper, Chip, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, InputAdornment, MenuItem, Select,
  FormControl, InputLabel, TablePagination, Tooltip
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { fgpoApi, customersApi } from '../../utils/api';
import { useUserOptions } from '../../hooks/users/useUserOptions';
import { AuthContext } from '../../context/AuthContext';
import { getCurrentUserName } from '../../utils/session';

interface Fgpo {
  ID: number;
  FGPONumber: string;
  TemporaryNumber?: string;
  Status?: string;
  CustomerId: number;
  CustomerName: string;
  Style?: string;
  Color?: string;
  OrderQuantity: number;
  DeliveryDate: string;
  InTransitQty: number;
  ReceivedQty: number;
  TotalShippedQty: number;
  ShipmentVariance: number;
  PendingToShip: number;
  OvershipmentQty: number;
  ProducedQty: number;
  ProductionVariance: number;
  PendingProduction: number;
  OverproductionQty: number;
  DataOwnerId?: number;
  DataOwnerName?: string;
  Remarks?: string;
  Active: boolean;
  CreatedAt: string;
  UpdatedAt?: string;
}

interface CustomerOption {
  ID: number;
  Name: string;
}

interface FgpoForm {
  FGPONumber: string;
  TemporaryNumber: string;
  Status: string;
  CustomerId: number;
  Style: string;
  Color: string;
  OrderQuantity: number;
  DeliveryDate: string;
  InTransitQty: number;
  ReceivedQty: number;
  TotalShippedQty: number;
  ProducedQty: number;
  DataOwnerId: number;
  Remarks: string;
}

const emptyForm: FgpoForm = {
  FGPONumber: '',
  TemporaryNumber: '',
  Status: '',
  CustomerId: 0,
  Style: '',
  Color: '',
  OrderQuantity: 0,
  DeliveryDate: '',
  InTransitQty: 0,
  ReceivedQty: 0,
  TotalShippedQty: 0,
  ProducedQty: 0,
  DataOwnerId: 0,
  Remarks: '',
};

const statusOptions = [
  'Not Started', 'Pending', 'In Progress', 'Partially Completed', 'Completed',
  'Approved', 'Conditionally Approved', 'Rejected', 'On Hold', 'Closed',
  'Cancelled', 'FGPO Pending'
];

// Map the API response (camelCase) to the PascalCase interface used by the UI
const mapFgpo = (raw: any): Fgpo => ({
  ID: raw.id ?? raw.ID,
  FGPONumber: raw.fgpoNumber ?? raw.FGPONumber ?? '',
  TemporaryNumber: raw.temporaryNumber ?? raw.TemporaryNumber,
  Status: raw.status ?? raw.Status,
  CustomerId: raw.customerId ?? raw.CustomerId ?? 0,
  CustomerName: raw.customerName ?? raw.CustomerName ?? '',
  Style: raw.style ?? raw.Style,
  Color: raw.color ?? raw.Color,
  OrderQuantity: raw.orderQuantity ?? raw.OrderQuantity ?? 0,
  DeliveryDate: raw.deliveryDate ?? raw.DeliveryDate ?? '',
  InTransitQty: raw.inTransitQty ?? raw.InTransitQty ?? 0,
  ReceivedQty: raw.receivedQty ?? raw.ReceivedQty ?? 0,
  TotalShippedQty: raw.totalShippedQty ?? raw.TotalShippedQty ?? 0,
  ShipmentVariance: raw.shipmentVariance ?? raw.ShipmentVariance ?? 0,
  PendingToShip: raw.pendingToShip ?? raw.PendingToShip ?? 0,
  OvershipmentQty: raw.overshipmentQty ?? raw.OvershipmentQty ?? 0,
  ProducedQty: raw.producedQty ?? raw.ProducedQty ?? 0,
  ProductionVariance: raw.productionVariance ?? raw.ProductionVariance ?? 0,
  PendingProduction: raw.pendingProduction ?? raw.PendingProduction ?? 0,
  OverproductionQty: raw.overproductionQty ?? raw.OverproductionQty ?? 0,
  DataOwnerId: raw.dataOwnerId ?? raw.DataOwnerId ?? undefined,
  DataOwnerName: raw.dataOwnerName ?? raw.DataOwnerName ?? raw.dataOwner ?? raw.DataOwner,
  Remarks: raw.remarks ?? raw.Remarks,
  Active: raw.active ?? raw.Active ?? true,
  CreatedAt: raw.createdAt ?? raw.CreatedAt ?? '',
  UpdatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

const Fgpo: React.FC = () => {
  const { selectedCustomer } = useContext(AuthContext);

  const [fgpos, setFgpos] = useState<Fgpo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Search & Filters
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState('createdat');
  const [sortOrder, setSortOrder] = useState('desc');

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FgpoForm>(emptyForm);
  const [formError, setFormError] = useState('');

  // Customer options for dropdowns
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const { options: userList } = useUserOptions();

  useEffect(() => {
    if (selectedCustomer) {
      setCustomerFilter(selectedCustomer.name);
    }
  }, [selectedCustomer]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search, statusFilter, customerFilter, sortBy, sortOrder]);

  // Load customer options once
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const custRes = await customersApi.getAll();
        setCustomers((custRes.data ?? []).map((c: any) => ({ ID: c.id ?? c.ID, Name: c.name ?? c.Name })));
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load customers.');
      }
    };
    loadOptions();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fgpoApi.getPaged({
        page: page + 1,
        pageSize,
        search: search || undefined,
        sortBy,
        sortOrder,
        status: statusFilter || undefined,
        customer: customerFilter || undefined,
      });
      setFgpos((res.data.items || []).map(mapFgpo));
      setTotalCount(res.data.totalCount ?? 0);

    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load FGPO records');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    setSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
    setPage(0);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
    setPage(0);
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setForm({ ...emptyForm, CustomerId: selectedCustomer?.id ?? 0 });
    setFormError('');
    setDialogOpen(true);
  };

  const openEditDialog = (fgpo: Fgpo) => {
    setEditingId(fgpo.ID);
    setForm({
      FGPONumber: fgpo.FGPONumber,
      TemporaryNumber: fgpo.TemporaryNumber || '',
      Status: fgpo.Status || '',
      CustomerId: fgpo.CustomerId,
      Style: fgpo.Style || '',
      Color: fgpo.Color || '',
      OrderQuantity: fgpo.OrderQuantity,
      DeliveryDate: fgpo.DeliveryDate ? fgpo.DeliveryDate.slice(0, 10) : '',
      InTransitQty: fgpo.InTransitQty,
      ReceivedQty: fgpo.ReceivedQty,
      TotalShippedQty: fgpo.TotalShippedQty,
      ProducedQty: fgpo.ProducedQty,
      DataOwnerId: fgpo.DataOwnerId || 0,
      Remarks: fgpo.Remarks || '',
    });
    setFormError('');
    setDialogOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Client-side validation
    if (!form.Status.trim()) {
      setFormError('FGPO Status is required.');
      return;
    }
    if (form.Status === 'FGPO Pending') {
      if (!form.TemporaryNumber.trim()) {
        setFormError('Temporary Order ID is required when status is FGPO Pending.');
        return;
      }
    } else if (!form.FGPONumber.trim()) {
      setFormError('FGPO Number is required.');
      return;
    }
    if (!form.CustomerId) {
      setFormError('Customer is required.');
      return;
    }
    if (!form.DeliveryDate) {
      setFormError('Delivery Date is required.');
      return;
    }
    if (form.OrderQuantity <= 0) {
      setFormError('Order Quantity must be greater than 0.');
      return;
    }

    const payload = {
      ...form,
      DataOwnerId: form.DataOwnerId || null,
      OrderQuantity: Number(form.OrderQuantity),
      InTransitQty: Number(form.InTransitQty),
      ReceivedQty: Number(form.ReceivedQty),
      TotalShippedQty: Number(form.TotalShippedQty),
      ProducedQty: Number(form.ProducedQty),
    };

    try {
      if (editingId !== null) {
        await fgpoApi.update(editingId, payload);
        setSuccess('FGPO updated successfully.');
      } else {
        await fgpoApi.create(payload);
        setSuccess('FGPO created successfully.');
      }
      setDialogOpen(false);
      setPage(0);
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setFormError(err?.response?.data || 'Failed to save FGPO record.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this FGPO record?')) return;
    try {
      await fgpoApi.delete(id);
      setSuccess('FGPO deleted successfully.');
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete FGPO record.');
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Approved': return 'success';
      case 'In Progress': return 'info';
      case 'Partially Completed': return 'info';
      case 'Pending': return 'warning';
      case 'FGPO Pending': return 'warning';
      case 'On Hold': return 'warning';
      case 'Rejected': return 'error';
      case 'Cancelled': return 'error';
      case 'Closed': return 'default';
      case 'Not Started': return 'default';
      default: return 'default';
    }
  };

  const formatDate = (date: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  const formatNumber = (n: number) => {
    if (n === undefined || n === null) return '-';
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const sortableHeader = (label: string, column: string) => (
    <TableCell
      sx={{ fontWeight: 'bold', color: 'primary.main', cursor: 'pointer', userSelect: 'none' }}
      onClick={() => handleSort(column)}
    >
      {label}
      {sortBy === column && (
        <span style={{ marginLeft: 4 }}>{sortOrder === 'asc' ? '▲' : '▼'}</span>
      )}
    </TableCell>
  );

  if (loading && fgpos.length === 0) return <CircularProgress />;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <AssignmentIcon color="primary" />
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>FGPO Master</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Toolbar: Search, Filters, Add */}
      <Paper elevation={2} sx={{ p: 2, borderTop: 4, borderColor: 'primary.main', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search"
            size="small"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            sx={{ flexGrow: 1, minWidth: 250 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
                ),
                endAdornment: searchInput && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearch}><ClearIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                ),
              },
            }}

          />
          <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>Search</Button>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={e => { setStatusFilter(e.target.value); setPage(0); }}
            >
              <MenuItem value="">All</MenuItem>
              {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Customer</InputLabel>
            <Select
              value={customerFilter}
              label="Customer"
              disabled={!!selectedCustomer}
              onChange={e => { setCustomerFilter(e.target.value); setPage(0); }}
            >
              <MenuItem value="">All</MenuItem>
              {customers.map(c => <MenuItem key={c.ID} value={c.Name}>{c.Name}</MenuItem>)}
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 1 }} />

          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openCreateDialog}>
            New FGPO
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      <Paper elevation={2} sx={{ p: 2, borderTop: 4, borderColor: 'primary.main' }}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Record ID</TableCell>
                {sortableHeader('FGPO', 'fgponumber')}
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Temp Order ID</TableCell>
                {sortableHeader('Status', 'status')}
                {sortableHeader('Customer', 'customer')}
                {sortableHeader('Style', 'style')}
                {sortableHeader('Color', 'color')}
                {sortableHeader('Order Qty', 'orderquantity')}
                {sortableHeader('Ship Date', 'deliverydate')}
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>In Transit</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Received</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Total Shipped</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Ship Variance</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Pending Ship</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Over-ship</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Produced</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Prod Variance</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Pending Prod</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Over-prod</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Data Owner</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Last Updated</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fgpos.map(fgpo => (
                <TableRow key={fgpo.ID} hover>
                  <TableCell>{fgpo.ID}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{fgpo.FGPONumber || '-'}</TableCell>
                  <TableCell>{fgpo.TemporaryNumber || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={fgpo.Status || 'N/A'}
                      size="small"
                      color={getStatusColor(fgpo.Status) as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{fgpo.CustomerName}</TableCell>
                  <TableCell>{fgpo.Style || '-'}</TableCell>
                  <TableCell>{fgpo.Color || '-'}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.OrderQuantity)}</TableCell>
                  <TableCell>{formatDate(fgpo.DeliveryDate)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.InTransitQty)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.ReceivedQty)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.TotalShippedQty)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.ShipmentVariance)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.PendingToShip)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.OvershipmentQty)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.ProducedQty)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.ProductionVariance)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.PendingProduction)}</TableCell>
                  <TableCell align="right">{formatNumber(fgpo.OverproductionQty)}</TableCell>
                  <TableCell>{fgpo.DataOwnerName || '-'}</TableCell>
                  <TableCell>{formatDate(fgpo.UpdatedAt || fgpo.CreatedAt)}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary" onClick={() => openEditDialog(fgpo)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(fgpo.ID)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {fgpos.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={22} align="center">No FGPO records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Rows per page:"
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {editingId !== null ? 'Edit FGPO' : 'New FGPO'}
        </DialogTitle>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <FormControl size="small" required>
                <InputLabel>FGPO Status *</InputLabel>
                <Select
                  value={form.Status}
                  label="FGPO Status *"
                  onChange={e => setForm({ ...form, Status: e.target.value })}
                >
                  <MenuItem value="">Select status...</MenuItem>
                  {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                label="FGPO Number"
                size="small"
                value={form.FGPONumber}
                onChange={e => setForm({ ...form, FGPONumber: e.target.value })}
                helperText={form.Status === 'FGPO Pending' ? 'Optional when status is FGPO Pending' : 'Required'}
              />
              <TextField
                label="Temporary Order ID"
                size="small"
                value={form.TemporaryNumber}
                onChange={e => setForm({ ...form, TemporaryNumber: e.target.value })}
                helperText={form.Status === 'FGPO Pending' ? 'Required and unique when status is FGPO Pending' : ''}
              />
              <FormControl size="small" required>
                <InputLabel>Customer *</InputLabel>
                <Select
                  value={form.CustomerId}
                  label="Customer *"
                  disabled={!!selectedCustomer}
                  onChange={e => setForm({ ...form, CustomerId: Number(e.target.value) })}
                >
                  <MenuItem value={0}>Select customer...</MenuItem>
                  {customers.map(c => <MenuItem key={c.ID} value={c.ID}>{c.Name}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                label="Style"
                size="small"
                value={form.Style}
                onChange={e => setForm({ ...form, Style: e.target.value })}
              />
              <TextField
                label="Color"
                size="small"
                value={form.Color}
                onChange={e => setForm({ ...form, Color: e.target.value })}
              />
              <TextField
                label="Order Quantity *"
                size="small"
                type="number"
                required
                value={form.OrderQuantity}
                onChange={e => setForm({ ...form, OrderQuantity: Number(e.target.value) })}
              />
              <TextField
                label="Ship Date *"
                size="small"
                type="date"
                required
                value={form.DeliveryDate}
                onChange={e => setForm({ ...form, DeliveryDate: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="In Transit Qty"
                size="small"
                type="number"
                value={form.InTransitQty}
                onChange={e => setForm({ ...form, InTransitQty: Number(e.target.value) })}
              />
              <TextField
                label="Received Qty"
                size="small"
                type="number"
                value={form.ReceivedQty}
                onChange={e => setForm({ ...form, ReceivedQty: Number(e.target.value) })}
              />
              <TextField
                label="Total Shipped Qty"
                size="small"
                type="number"
                value={form.TotalShippedQty}
                onChange={e => setForm({ ...form, TotalShippedQty: Number(e.target.value) })}
              />
              <TextField
                label="Produced Qty"
                size="small"
                type="number"
                value={form.ProducedQty}
                onChange={e => setForm({ ...form, ProducedQty: Number(e.target.value) })}
              />
              <FormControl size="small">
                <TextField label="Data Owner" value={getCurrentUserName()} slotProps={{ input: { readOnly: true } }} />
              </FormControl>
              <TextField
                label="Remarks"
                size="small"
                multiline
                rows={2}
                value={form.Remarks}
                onChange={e => setForm({ ...form, Remarks: e.target.value })}
                sx={{ gridColumn: { sm: 'span 2' } }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            {editingId !== null ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Fgpo;
