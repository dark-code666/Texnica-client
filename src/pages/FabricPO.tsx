import React, { useState, useEffect, FormEvent } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Paper, Chip, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, InputAdornment, MenuItem, Select,
  FormControl, InputLabel, TablePagination, Tooltip, Grid, Autocomplete
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fabricPOsApi, fgpoApi } from '../utils/api';

interface FabricPO {
  ID: number;
  FabricPONumber: string;
  Fgpos: FabricPOFgpo[];
  Supplier?: string;
  FabricMill?: string;
  FabricComponent?: string;
  OrderedQuantity: number;
  UOM?: string;
  UnitPrice: number;
  POAmount: number;
  OrderDate: string;
  RequiredCompletion: string;
  PlannedExport?: string;
  PlannedArrival?: string;
  POStatus?: string;
  PurchaseOwner?: string;
  ApprovedBy?: string;
  LastUpdated?: string;
  Remarks?: string;
  Active: boolean;
  CreatedAt: string;
  UpdatedAt?: string;
}

interface FabricPOFgpo {
  FGPOId: number;
  FGPONumber: string;
  CustomerName: string;
  Style?: string;
  Color?: string;
  AllocatedQuantity: number;
}

interface FgpoOption {
  ID: number;
  FGPONumber: string;
  CustomerName: string;
  Style?: string;
  Color?: string;
  OrderQuantity: number;
}

interface FgpoItem {
  FGPOId: number;
  Style: string;
  Color: string;
  AllocatedQuantity: number;
}

interface FabricPOForm {
  FabricPONumber: string;
  FgpoItems: FgpoItem[];
  Supplier: string;
  FabricMill: string;
  FabricComponent: string;
  OrderedQuantity: number;
  UOM: string;
  UnitPrice: number;
  OrderDate: string;
  RequiredCompletion: string;
  PlannedExport: string;
  PlannedArrival: string;
  POStatus: string;
  PurchaseOwner: string;
  ApprovedBy: string;
  Remarks: string;
}

const emptyForm: FabricPOForm = {
  FabricPONumber: '', FgpoItems: [], Supplier: '', FabricMill: '', FabricComponent: '',
  OrderedQuantity: 0, UOM: '', UnitPrice: 0, OrderDate: '',
  RequiredCompletion: '', PlannedExport: '', PlannedArrival: '', POStatus: '',
  PurchaseOwner: '', ApprovedBy: '', Remarks: '',
};

const uomOptions = ['Yards', 'Meters', 'Kilograms', 'Pounds', 'Rolls', 'Pieces'];
const fabricComponentOptions = ['Body Fabric', 'Rib', 'Shoulder Tape', 'Neck Tape', 'Pocketing', 'Other'];
const poStatusOptions = [
  'Not Started', 'Pending', 'In Progress', 'Partially Completed', 'Completed',
  'Approved', 'Conditionally Approved', 'Rejected', 'On Hold', 'Closed', 'Cancelled'
];

const mapFabricPO = (raw: any): FabricPO => ({
  ID: raw.id ?? raw.ID,
  FabricPONumber: raw.fabricPONumber ?? raw.FabricPONumber ?? '',
  Fgpos: (raw.fgpos ?? raw.Fgpos ?? []).map((f: any) => ({
    FGPOId: f.fgpoId ?? f.FGPOId ?? 0,
    FGPONumber: f.fgpoNumber ?? f.FGPONumber ?? '',
    CustomerName: f.customerName ?? f.CustomerName ?? '',
    Style: f.style ?? f.Style,
    Color: f.color ?? f.Color,
    AllocatedQuantity: f.allocatedQuantity ?? f.AllocatedQuantity ?? 0,
  })),
  Supplier: raw.supplier ?? raw.Supplier,
  FabricMill: raw.fabricMill ?? raw.FabricMill,
  FabricComponent: raw.fabricComponent ?? raw.FabricComponent,
  OrderedQuantity: raw.orderedQuantity ?? raw.OrderedQuantity ?? 0,
  UOM: raw.uom ?? raw.UOM,
  UnitPrice: raw.unitPrice ?? raw.UnitPrice ?? 0,
  POAmount: raw.poAmount ?? raw.POAmount ?? 0,
  OrderDate: raw.orderDate ?? raw.OrderDate ?? '',
  RequiredCompletion: raw.requiredCompletion ?? raw.RequiredCompletion ?? '',
  PlannedExport: raw.plannedExport ?? raw.PlannedExport,
  PlannedArrival: raw.plannedArrival ?? raw.PlannedArrival,
  POStatus: raw.poStatus ?? raw.POStatus,
  PurchaseOwner: raw.purchaseOwner ?? raw.PurchaseOwner,
  ApprovedBy: raw.approvedBy ?? raw.ApprovedBy,
  LastUpdated: raw.lastUpdated ?? raw.LastUpdated,
  Remarks: raw.remarks ?? raw.Remarks,
  Active: raw.active ?? raw.Active ?? true,
  CreatedAt: raw.createdAt ?? raw.CreatedAt ?? '',
  UpdatedAt: raw.updatedAt ?? raw.UpdatedAt,
});

const FabricPO: React.FC = () => {
  const [items, setItems] = useState<FabricPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [fgpoFilter, setFgpoFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [fabricMillFilter, setFabricMillFilter] = useState('');
  const [fabricComponentFilter, setFabricComponentFilter] = useState('');
  const [poStatusFilter, setPoStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdat');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FabricPOForm>(emptyForm);
  const [formError, setFormError] = useState('');
  const [detailItem, setDetailItem] = useState<FabricPO | null>(null);
  const [fgpos, setFgpos] = useState<FgpoOption[]>([]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search, fgpoFilter, supplierFilter, fabricMillFilter, fabricComponentFilter, poStatusFilter, sortBy, sortOrder]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const fgpoRes = await fgpoApi.getAll();
        setFgpos((fgpoRes.data ?? []).map((f: any) => ({
          ID: f.id ?? f.ID,
          FGPONumber: f.fgpoNumber ?? f.FGPONumber ?? '',
          CustomerName: f.customerName ?? f.CustomerName ?? '',
          Style: f.style ?? f.Style,
          Color: f.color ?? f.Color,
          OrderQuantity: f.orderQuantity ?? f.OrderQuantity ?? 0,
        })));
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load options.');
      }
    };
    loadOptions();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fabricPOsApi.getPaged({
        page: page + 1, pageSize,
        search: search || undefined, sortBy, sortOrder,
        fgpo: fgpoFilter || undefined, supplier: supplierFilter || undefined,
        fabricMill: fabricMillFilter || undefined,
        fabricComponent: fabricComponentFilter || undefined,
        poStatus: poStatusFilter || undefined,
      });
      setItems((res.data.items || []).map(mapFabricPO));
      setTotalCount(res.data.totalCount ?? 0);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load Fabric PO records');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => { setPage(0); setSearch(searchInput); };
  const handleClearSearch = () => { setSearchInput(''); setSearch(''); setPage(0); };

  const handleSort = (column: string) => {
    if (sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(column); setSortOrder('asc'); }
    setPage(0);
  };

  const openCreateDialog = () => { setEditingId(null); setForm(emptyForm); setFormError(''); setDialogOpen(true); };

  const openEditDialog = (item: FabricPO) => {
    setEditingId(item.ID);
    setForm({
      FabricPONumber: item.FabricPONumber,
      FgpoItems: item.Fgpos.map(f => ({
        FGPOId: f.FGPOId,
        Style: f.Style || '',
        Color: f.Color || '',
        AllocatedQuantity: f.AllocatedQuantity,
      })),
      Supplier: item.Supplier || '', FabricMill: item.FabricMill || '',
      FabricComponent: item.FabricComponent || '',
      OrderedQuantity: item.OrderedQuantity,
      UOM: item.UOM || '', UnitPrice: item.UnitPrice,
      OrderDate: item.OrderDate ? item.OrderDate.slice(0, 10) : '',
      RequiredCompletion: item.RequiredCompletion ? item.RequiredCompletion.slice(0, 10) : '',
      PlannedExport: item.PlannedExport ? item.PlannedExport.slice(0, 10) : '',
      PlannedArrival: item.PlannedArrival ? item.PlannedArrival.slice(0, 10) : '',
      POStatus: item.POStatus || '', PurchaseOwner: item.PurchaseOwner || '',
      ApprovedBy: item.ApprovedBy || '', Remarks: item.Remarks || '',
    });
    setFormError('');
    setDialogOpen(true);
  };

  const openDetailDialog = (item: FabricPO) => { setDetailItem(item); setDetailOpen(true); };

  const handleFgpoSelectionChange = (selected: FgpoOption[]) => {
    const existing = new Map(form.FgpoItems.map(i => [i.FGPOId, i]));
    const newItems: FgpoItem[] = selected.map(opt => {
      const prev = existing.get(opt.ID);
      return {
        FGPOId: opt.ID,
        Style: prev?.Style ?? opt.Style ?? '',
        Color: prev?.Color ?? opt.Color ?? '',
        AllocatedQuantity: prev?.AllocatedQuantity ?? 0,
      };
    });
    setForm({ ...form, FgpoItems: newItems });
  };

  const updateFgpoItem = (fgpoId: number, field: keyof FgpoItem, value: string | number) => {
    setForm({
      ...form,
      FgpoItems: form.FgpoItems.map(i => i.FGPOId === fgpoId ? { ...i, [field]: value } : i),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!form.FabricPONumber.trim()) { setFormError('Fabric PO Number is required.'); return; }
    if (form.FgpoItems.length === 0) { setFormError('At least one FGPO must be selected.'); return; }
    if (!form.FabricComponent.trim()) { setFormError('Fabric Component is required.'); return; }
    if (!form.UOM.trim()) { setFormError('UOM is required.'); return; }
    if (form.OrderedQuantity <= 0) { setFormError('Ordered Quantity must be greater than 0.'); return; }
    if (form.UnitPrice <= 0) { setFormError('Unit Price must be greater than 0.'); return; }
    if (!form.OrderDate) { setFormError('Order Date is required.'); return; }
    if (!form.RequiredCompletion) { setFormError('Required Completion is required.'); return; }

    for (const item of form.FgpoItems) {
      if (item.AllocatedQuantity <= 0) {
        setFormError(`Allocated Quantity for FGPO ${item.FGPOId} must be greater than 0.`);
        return;
      }
    }
    const totalAllocated = form.FgpoItems.reduce((sum, i) => sum + i.AllocatedQuantity, 0);
    if (totalAllocated > form.OrderedQuantity) {
      setFormError(`Allocated quantity (${totalAllocated}) exceeds Ordered Quantity (${form.OrderedQuantity}).`);
      return;
    }

    const payload = {
      FabricPONumber: form.FabricPONumber,
      FgpoItems: form.FgpoItems.map(i => ({
        FGPOId: i.FGPOId,
        Style: i.Style || null,
        Color: i.Color || null,
        AllocatedQuantity: Number(i.AllocatedQuantity),
      })),
      Supplier: form.Supplier || null,
      FabricMill: form.FabricMill || null,
      FabricComponent: form.FabricComponent,
      OrderedQuantity: Number(form.OrderedQuantity),
      UOM: form.UOM,
      UnitPrice: Number(form.UnitPrice),
      OrderDate: form.OrderDate,
      RequiredCompletion: form.RequiredCompletion,
      PlannedExport: form.PlannedExport || null,
      PlannedArrival: form.PlannedArrival || null,
      POStatus: form.POStatus || null,
      PurchaseOwner: form.PurchaseOwner || null,
      ApprovedBy: form.ApprovedBy || null,
      Remarks: form.Remarks || null,
    };

    try {
      if (editingId !== null) {
        await fabricPOsApi.update(editingId, payload);
        setSuccess('Fabric PO updated successfully.');
      } else {
        await fabricPOsApi.create(payload);
        setSuccess('Fabric PO created successfully.');
      }
      setDialogOpen(false);
      setPage(0);
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setFormError(err?.response?.data || 'Failed to save Fabric PO record.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this Fabric PO record?')) return;
    try {
      await fabricPOsApi.delete(id);
      setSuccess('Fabric PO deleted successfully.');
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete Fabric PO record.');
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatNumber = (value: number) => {
    if (value === undefined || value === null) return '-';
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed': case 'Approved': return 'success';
      case 'In Progress': case 'Partially Completed': return 'info';
      case 'Pending': case 'Not Started': case 'On Hold': case 'Conditionally Approved': return 'warning';
      case 'Rejected': case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const sortableHeader = (label: string, column: string) => (
    <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort(column)}>
      {label}
      {sortBy === column && <span style={{ marginLeft: 4 }}>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
    </TableCell>
  );

  if (loading && items.length === 0) return <CircularProgress />;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <ReceiptLongIcon color="primary" />
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Fabric PO</Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Paper elevation={2} sx={{ p: 2, borderTop: 4, borderColor: 'primary.main', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search" size="small" value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            sx={{ flexGrow: 1, minWidth: 250 }}
            slotProps={{
              input: {
                startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>),
                endAdornment: searchInput && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearch}><ClearIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>Search</Button>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>FGPO</InputLabel>
            <Select value={fgpoFilter} label="FGPO" onChange={e => { setFgpoFilter(e.target.value); setPage(0); }}>
              <MenuItem value="">All</MenuItem>
              {fgpos.map(f => <MenuItem key={f.ID} value={f.FGPONumber}>{f.FGPONumber}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField label="Supplier" size="small" value={supplierFilter} onChange={e => { setSupplierFilter(e.target.value); setPage(0); }} sx={{ minWidth: 140 }} />
          <TextField label="Fabric Mill" size="small" value={fabricMillFilter} onChange={e => { setFabricMillFilter(e.target.value); setPage(0); }} sx={{ minWidth: 140 }} />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Fabric Component</InputLabel>
            <Select value={fabricComponentFilter} label="Fabric Component" onChange={e => { setFabricComponentFilter(e.target.value); setPage(0); }}>
              <MenuItem value="">All</MenuItem>
              {fabricComponentOptions.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>PO Status</InputLabel>
            <Select value={poStatusFilter} label="PO Status" onChange={e => { setPoStatusFilter(e.target.value); setPage(0); }}>
              <MenuItem value="">All</MenuItem>
              {poStatusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openCreateDialog}>New Fabric PO</Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, borderTop: 4, borderColor: 'primary.main' }}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>PO ID</TableCell>
                {sortableHeader('Fabric PO #', 'fabricponumber')}
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>FGPO(s)</TableCell>
                {sortableHeader('Supplier', 'supplier')}
                {sortableHeader('Fabric Mill', 'fabricmill')}
                {sortableHeader('Component', 'fabriccomponent')}
                {sortableHeader('Ordered Qty', 'orderedquantity')}
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>UOM</TableCell>
                {sortableHeader('Unit Price', 'unitprice')}
                {sortableHeader('PO Amount', 'poamount')}
                {sortableHeader('Order Date', 'orderdate')}
                {sortableHeader('Req. Completion', 'requiredcompletion')}
                {sortableHeader('Status', 'postatus')}
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.ID} hover>
                  <TableCell>{item.ID}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{item.FabricPONumber}</TableCell>
                  <TableCell>{item.Fgpos.length > 0 ? item.Fgpos.map(f => f.FGPONumber).join(', ') : '-'}</TableCell>
                  <TableCell>{item.Supplier || '-'}</TableCell>
                  <TableCell>{item.FabricMill || '-'}</TableCell>
                  <TableCell>{item.FabricComponent || '-'}</TableCell>
                  <TableCell align="right">{formatNumber(item.OrderedQuantity)}</TableCell>
                  <TableCell>{item.UOM || '-'}</TableCell>
                  <TableCell align="right">{formatNumber(item.UnitPrice)}</TableCell>
                  <TableCell align="right">
                    <Chip label={formatNumber(item.POAmount)} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>{formatDate(item.OrderDate)}</TableCell>
                  <TableCell>{formatDate(item.RequiredCompletion)}</TableCell>
                  <TableCell>
                    <Chip label={item.POStatus || 'N/A'} size="small" color={getStatusColor(item.POStatus) as any} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View"><IconButton size="small" color="info" onClick={() => openDetailDialog(item)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Edit"><IconButton size="small" color="primary" onClick={() => openEditDialog(item)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDelete(item.ID)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && !loading && (
                <TableRow><TableCell colSpan={14} align="center">No Fabric PO records found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div" count={totalCount} page={page} onPageChange={handleChangePage}
          rowsPerPage={pageSize} onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]} labelRowsPerPage="Rows per page:"
        />
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {editingId !== null ? 'Edit Fabric PO' : 'New Fabric PO'}
        </DialogTitle>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField label="Fabric PO Number *" size="small" required value={form.FabricPONumber} onChange={e => setForm({ ...form, FabricPONumber: e.target.value })} />
              <FormControl size="small" required>
                <InputLabel>Fabric Component *</InputLabel>
                <Select value={form.FabricComponent} label="Fabric Component *" onChange={e => setForm({ ...form, FabricComponent: e.target.value })}>
                  <MenuItem value="">Select component...</MenuItem>
                  {fabricComponentOptions.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Supplier" size="small" value={form.Supplier} onChange={e => setForm({ ...form, Supplier: e.target.value })} />
              <TextField label="Fabric Mill" size="small" value={form.FabricMill} onChange={e => setForm({ ...form, FabricMill: e.target.value })} />
              <TextField label="Ordered Quantity *" size="small" type="number" required value={form.OrderedQuantity} onChange={e => setForm({ ...form, OrderedQuantity: Number(e.target.value) })} />
              <FormControl size="small" required>
                <InputLabel>UOM *</InputLabel>
                <Select value={form.UOM} label="UOM *" onChange={e => setForm({ ...form, UOM: e.target.value })}>
                  <MenuItem value="">Select UOM...</MenuItem>
                  {uomOptions.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Unit Price *" size="small" type="number" required value={form.UnitPrice} onChange={e => setForm({ ...form, UnitPrice: Number(e.target.value) })} />
              <TextField label="Order Date *" size="small" type="date" required value={form.OrderDate} onChange={e => setForm({ ...form, OrderDate: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />
              <TextField label="Required Completion *" size="small" type="date" required value={form.RequiredCompletion} onChange={e => setForm({ ...form, RequiredCompletion: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />
              <TextField label="Planned Export" size="small" type="date" value={form.PlannedExport} onChange={e => setForm({ ...form, PlannedExport: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />
              <TextField label="Planned Arrival" size="small" type="date" value={form.PlannedArrival} onChange={e => setForm({ ...form, PlannedArrival: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />
              <FormControl size="small">
                <InputLabel>PO Status</InputLabel>
                <Select value={form.POStatus} label="PO Status" onChange={e => setForm({ ...form, POStatus: e.target.value })}>
                  <MenuItem value="">None</MenuItem>
                  {poStatusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Purchase Owner" size="small" value={form.PurchaseOwner} onChange={e => setForm({ ...form, PurchaseOwner: e.target.value })} />
              <TextField label="Approved By" size="small" value={form.ApprovedBy} onChange={e => setForm({ ...form, ApprovedBy: e.target.value })} />
              <TextField label="Remarks" size="small" multiline rows={2} value={form.Remarks} onChange={e => setForm({ ...form, Remarks: e.target.value })} sx={{ gridColumn: { sm: 'span 2' } }} />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Autocomplete
                multiple size="small" options={fgpos}
                getOptionLabel={(option) => `${option.FGPONumber}${option.CustomerName ? ` - ${option.CustomerName}` : ''}`}
                isOptionEqualToValue={(option, value) => option.ID === value.ID}
                value={fgpos.filter(f => form.FgpoItems.some(i => i.FGPOId === f.ID))}
                onChange={(_, newValue) => handleFgpoSelectionChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="FGPO(s) *" required placeholder="Select one or more FGPO..." />
                )}
              />
            </Box>

            {form.FgpoItems.length > 0 && (
              <Paper elevation={1} sx={{ p: 2, mt: 2, backgroundColor: 'primary.light' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>FGPO Allocation Details</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>FGPO</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Style</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Color</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Allocated Qty</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {form.FgpoItems.map(item => {
                        const opt = fgpos.find(f => f.ID === item.FGPOId);
                        return (
                          <TableRow key={item.FGPOId}>
                            <TableCell>{opt?.FGPONumber ?? item.FGPOId}</TableCell>
                            <TableCell>
                              <TextField size="small" value={item.Style} placeholder={opt?.Style || 'Style'}
                                onChange={e => updateFgpoItem(item.FGPOId, 'Style', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <TextField size="small" value={item.Color} placeholder={opt?.Color || 'Color'}
                                onChange={e => updateFgpoItem(item.FGPOId, 'Color', e.target.value)} />
                            </TableCell>
                            <TableCell>
                              <TextField size="small" type="number" value={item.AllocatedQuantity}
                                onChange={e => updateFgpoItem(item.FGPOId, 'AllocatedQuantity', Number(e.target.value))} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            {editingId !== null ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>Fabric PO Detail</DialogTitle>
        <DialogContent>
          {detailItem && (
            <Box>
              <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: 'primary.light' }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Fabric PO Number</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{detailItem.FabricPONumber}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Supplier</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{detailItem.Supplier || '-'}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Fabric Mill</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{detailItem.FabricMill || '-'}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Fabric Component</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{detailItem.FabricComponent || '-'}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Ordered Quantity</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatNumber(detailItem.OrderedQuantity)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">UOM</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{detailItem.UOM || '-'}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Unit Price</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatNumber(detailItem.UnitPrice)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">PO Amount</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{formatNumber(detailItem.POAmount)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Order Date</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatDate(detailItem.OrderDate)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Required Completion</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatDate(detailItem.RequiredCompletion)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">PO Status</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      <Chip label={detailItem.POStatus || 'N/A'} size="small" color={getStatusColor(detailItem.POStatus) as any} variant="outlined" />
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant="caption" color="text.secondary">Created At</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formatDate(detailItem.CreatedAt)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">Remarks</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{detailItem.Remarks || '-'}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, backgroundColor: 'primary.light' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>FGPO Allocation Details</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>FGPO</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Style</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Color</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Allocated Qty</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailItem.Fgpos.map(f => (
                        <TableRow key={f.FGPOId}>
                          <TableCell>{f.FGPONumber}</TableCell>
                          <TableCell>{f.Style || '-'}</TableCell>
                          <TableCell>{f.Color || '-'}</TableCell>
                          <TableCell align="right">{formatNumber(f.AllocatedQuantity)}</TableCell>
                        </TableRow>
                      ))}
                      {detailItem.Fgpos.length === 0 && (
                        <TableRow><TableCell colSpan={4} align="center">No FGPO allocations.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FabricPO;
