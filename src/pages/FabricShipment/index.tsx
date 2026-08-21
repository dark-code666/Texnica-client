import React, { useState, FormEvent } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Paper, Chip, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, InputAdornment, MenuItem,
  FormControl, InputLabel, TablePagination, Grid, Select, Divider
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useFabricShipments } from '../../hooks/fabricShipments/useFabricShipments';
import { useFabricPOOptions } from '../../hooks/fabricPOs/useFabricPOOptions';
import { useFgpoOptions } from '../../hooks/fgpos/useFgpoOptions';
import { useCatalogs } from '../../hooks/catalogs/useCatalogs';
import { useUserOptions } from '../../hooks/users/useUserOptions';
import { FabricShipment } from '../../types';
import { getCurrentUserName } from '../../utils/session';

const DEFAULT_SHIPMENT_STATUSES = ['Planned', 'Booking Confirmed', 'Exported', 'In Transit', 'Delivered', 'Cancelled'];
const DEFAULT_UOMS = ['Yards', 'Meters', 'Kilograms', 'Pounds', 'Rolls', 'Pieces'];

const sc = (s: string) => {
  const m: Record<string, any> = {
    Delivered: 'success', 'In Transit': 'info', Exported: 'primary',
    Planned: 'default', 'Booking Confirmed': 'warning', Cancelled: 'error',
  };
  return m[s] ?? 'default';
};

const emptyForm = {
  ShipmentNumber: '', FabricPOId: 0, FGPOId: 0, Supplier: '', LotNumber: '',
  RollQty: 0, ShippedQuantity: 0, UOM: 'Yards', ShippedWeight: 0,
  PackingList: '', InvoiceNumber: '', ContainerAWB: '', ShippingMethod: '',
  ETD: new Date().toISOString().split('T')[0], ETA: new Date().toISOString().split('T')[0],
  ShipmentStatus: 'Planned', DeliveredToTexnicaDate: '', DataOwnerId: 0, Remarks: '',
};

const FabricShipmentPage: React.FC = () => {
  const {
    items, loading, saving, error, page, rowsPerPage, totalCount,
    setPage, setRowsPerPage, setSearchQuery, setError, refresh,
    create, update, remove,
  } = useFabricShipments();

  const [searchInput, setSearchInput] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<FabricShipment | null>(null);
  const [formError, setFormError] = useState('');

  const { options: poList } = useFabricPOOptions();
  const { options: fgpoList } = useFgpoOptions();
  const { options: userList } = useUserOptions();
  const { catalogs } = useCatalogs();
  const STATUS_OPTIONS = catalogs['ShipmentStatus']?.length ? catalogs['ShipmentStatus'] : DEFAULT_SHIPMENT_STATUSES;
  const UOM_OPTIONS = catalogs['UOM']?.length ? catalogs['UOM'] : DEFAULT_UOMS;

  const [form, setForm] = useState(emptyForm);

  const handleSearch = (e: FormEvent) => { e.preventDefault(); setSearchQuery(searchInput); };
  const handleClearSearch = () => setSearchInput('');

  const openCreate = () => { setEditingId(null); setForm(emptyForm); setFormError(''); setDialogOpen(true); };
  const openEdit = (item: FabricShipment) => {
    setEditingId(item.id);
    setForm({
      ShipmentNumber: item.shipmentNumber, FabricPOId: item.fabricPOId, FGPOId: item.fgpoId,
      Supplier: item.supplier ?? '', LotNumber: item.lotNumber ?? '',
      RollQty: item.rollQty, ShippedQuantity: item.shippedQuantity,
      UOM: item.uom || 'Yards', ShippedWeight: item.shippedWeight,
      PackingList: item.packingList ?? '', InvoiceNumber: item.invoiceNumber ?? '',
      ContainerAWB: item.containerAWB ?? '', ShippingMethod: item.shippingMethod ?? '',
      ETD: item.etd?.split('T')[0] || '', ETA: item.eta?.split('T')[0] || '',
      ShipmentStatus: item.shipmentStatus || 'Planned',
      DeliveredToTexnicaDate: item.deliveredToTexnicaDate?.split('T')[0] || '',
      DataOwnerId: userList.find(o => o.label === item.dataOwner)?.id ?? 0, Remarks: item.remarks ?? '',
    });
    setFormError(''); setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this shipment record?')) return;
    try { await remove(id); }
    catch (err: any) { setError(err.response?.data || 'Error deleting.'); }
  };

  const handleSave = async () => {
    setFormError('');
    if (!form.ShipmentNumber) { setFormError('Shipment Number is required.'); return; }
    if (!form.FabricPOId || !form.FGPOId) { setFormError('Fabric PO and FGPO are required.'); return; }
    if (!form.LotNumber) { setFormError('Lot Number is required.'); return; }
    try {
      const payload = {
        ...form,
        DataOwnerId: form.DataOwnerId || null,
        ETD: form.ETD ? new Date(form.ETD).toISOString() : new Date().toISOString(),
        ETA: form.ETA ? new Date(form.ETA).toISOString() : new Date().toISOString(),
        DeliveredToTexnicaDate: form.DeliveredToTexnicaDate ? new Date(form.DeliveredToTexnicaDate).toISOString() : null,
      };
      if (editingId) await update(editingId, payload);
      else await create(payload);
      setDialogOpen(false);
    } catch (err: any) { setFormError(err.response?.data || 'Error saving.'); }
  };

  const fmt = (v?: string) => v?.split('T')[0] || '-';
  const setF = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            <LocalShippingIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
            Fabric Shipment
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Record shipments and track in-transit quantities by lot
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={refresh}>Refresh</Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>New Shipment</Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

      <Paper sx={{ mb: 2, p: 1.5, display: 'flex', gap: 1 }}>
        <Box component='form' onSubmit={handleSearch} sx={{ display: 'flex', gap: 1, flex: 1 }}>
          <TextField size="small" placeholder="Search by Shipment, Lot, Invoice, Container..."
            value={searchInput} onChange={e => setSearchInput(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                endAdornment: searchInput ? <InputAdornment position="end"><IconButton size="small" onClick={handleClearSearch}><ClearIcon /></IconButton></InputAdornment> : null,
              },
            }}
            sx={{ flex: 1, maxWidth: 500 }}
          />
          <Button variant="outlined" type="submit">Search</Button>
        </Box>
      </Paper>

      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                {['Shipment #', 'Fabric PO', 'FGPO', 'Lot', 'Shipped Qty', 'In Transit', 'Remaining', 'ETD', 'Status', 'Actions'].map(h =>
                  <TableCell key={h} sx={{ color: 'white', fontWeight: 600, py: 1.5 }}>{h}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={10} align="center" sx={{ py: 4 }}><CircularProgress size={28} /></TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={10} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  <Typography variant="body1">No shipments found</Typography>
                  <Button variant="text" onClick={openCreate} sx={{ mt: 1 }}>Create your first shipment</Button>
                </TableCell></TableRow>
              ) : items.map((item: FabricShipment) => (
                <TableRow key={item.id} hover>
                  <TableCell><Typography variant="body2" sx={{ fontWeight: 600 }}>{item.shipmentNumber}</Typography></TableCell>
                  <TableCell>{item.fabricPONumber}</TableCell>
                  <TableCell>{item.fgpoNumber}</TableCell>
                  <TableCell><Chip label={item.lotNumber || '-'} size="small" variant="outlined" /></TableCell>
                  <TableCell>{Number(item.shippedQuantity).toLocaleString()} {item.uom}</TableCell>
                  <TableCell>
                    <Chip label={Number(item.inTransitQuantity).toLocaleString()} size="small"
                      color={item.inTransitQuantity > 0 ? 'warning' : 'success'}
                      variant={item.inTransitQuantity > 0 ? 'filled' : 'outlined'} />
                  </TableCell>
                  <TableCell>{Number(item.remainingToDeliver).toLocaleString()}</TableCell>
                  <TableCell>{fmt(item.etd)}</TableCell>
                  <TableCell><Chip label={item.shipmentStatus || 'N/A'} size="small" color={sc(item.shipmentStatus ?? '')} variant="outlined" /></TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" onClick={() => { setViewItem(item); setViewOpen(true); }}><VisibilityIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="info" onClick={() => openEdit(item)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><DeleteIcon fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={totalCount} page={page}
          onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25, 50]} labelRowsPerPage="Rows:" />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
          {editingId ? 'Edit Shipment' : 'New Shipment'}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <Grid container spacing={2.5}>
            {/* ── References ── */}
            <Grid size={{ xs: 12 }}><Typography variant="subtitle2" color="primary" sx={{ mb: 0.5 }}>References</Typography></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField fullWidth size="small" label="Shipment Number *" value={form.ShipmentNumber} onChange={e => setF('ShipmentNumber', e.target.value)} required placeholder="SHP-2026-001" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Fabric PO *</InputLabel>
                <Select value={form.FabricPOId || ''} label="Fabric PO *" onChange={e => {
                  const v = Number(e.target.value);
                  const po = poList.find((p: any) => (p.id ?? p.ID) === v);
                  setF('FabricPOId', v);
                  setF('Supplier', (po as any)?.sub || form.Supplier);
                }}>
                  <MenuItem value=""><em>Select a Fabric PO...</em></MenuItem>
                  {poList.map((p: any) => <MenuItem key={p.id ?? p.ID} value={p.id ?? p.ID}>{p.label || (p.fabricPONumber ?? p.FabricPONumber)}{(p as any)?.sub ? ` — ${(p as any).sub}` : ''}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>FGPO *</InputLabel>
                <Select value={form.FGPOId || ''} label="FGPO *" onChange={e => setF('FGPOId', Number(e.target.value))}>
                  <MenuItem value=""><em>Select a FGPO...</em></MenuItem>
                  {fgpoList.map((f: any) => <MenuItem key={f.id ?? f.ID} value={f.id ?? f.ID}>{f.label || (f.fgpoNumber ?? f.FGPONumber)}{(f as any)?.sub ? ` — ${(f as any).sub}` : ''}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="Supplier" value={form.Supplier} onChange={e => setF('Supplier', e.target.value)} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="Lot Number *" value={form.LotNumber} onChange={e => setF('LotNumber', e.target.value)} required /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small"><InputLabel>UOM</InputLabel>
                <Select value={form.UOM} label="UOM" onChange={e => setF('UOM', e.target.value)}>
                  {UOM_OPTIONS.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="Shipping Method" value={form.ShippingMethod} onChange={e => setF('ShippingMethod', e.target.value)} placeholder="Sea / Air / Truck" /></Grid>

            {/* ── Shipment Quantities ── */}
            <Grid size={{ xs: 12 }}><Divider><Typography variant="caption" color="text.secondary">Shipment Quantities</Typography></Divider></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="Roll Quantity" type="number" value={form.RollQty || ''} onChange={e => setF('RollQty', Number(e.target.value))} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="Shipped Quantity *" type="number" value={form.ShippedQuantity || ''} onChange={e => setF('ShippedQuantity', Number(e.target.value))} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="Shipped Weight" type="number" value={form.ShippedWeight || ''} onChange={e => setF('ShippedWeight', Number(e.target.value))} /></Grid>

            {/* ── Documents & Container ── */}
            <Grid size={{ xs: 12 }}><Divider><Typography variant="caption" color="text.secondary">Documents & Container</Typography></Divider></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Packing List" value={form.PackingList} onChange={e => setF('PackingList', e.target.value)} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Invoice Number" value={form.InvoiceNumber} onChange={e => setF('InvoiceNumber', e.target.value)} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Container / AWB" value={form.ContainerAWB} onChange={e => setF('ContainerAWB', e.target.value)} /></Grid>

            {/* ── Dates & Status ── */}
            <Grid size={{ xs: 12 }}><Divider><Typography variant="caption" color="text.secondary">Dates & Status</Typography></Divider></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="ETD *" type="date" value={form.ETD} onChange={e => setF('ETD', e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="ETA *" type="date" value={form.ETA} onChange={e => setF('ETA', e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size="small"><InputLabel>Shipment Status</InputLabel>
                <Select value={form.ShipmentStatus} label="Shipment Status" onChange={e => setF('ShipmentStatus', e.target.value)}>
                  {STATUS_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><TextField fullWidth size="small" label="Delivered to Texnica Date" type="date" value={form.DeliveredToTexnicaDate} onChange={e => setF('DeliveredToTexnicaDate', e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <TextField label="Data Owner" value={getCurrentUserName()} slotProps={{ input: { readOnly: true } }} />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}><TextField fullWidth size="small" label="Remarks / Notes" value={form.Remarks} onChange={e => setF('Remarks', e.target.value)} multiline rows={2} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving} startIcon={saving ? <CircularProgress size={18} /> : null}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Shipment Detail</DialogTitle><Divider />
        <DialogContent sx={{ pt: 3 }}>
          {viewItem && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Shipment Number</Typography><Typography sx={{ fontWeight: 600 }}>{viewItem.shipmentNumber}</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Fabric PO</Typography><Typography sx={{ fontWeight: 600 }}>{viewItem.fabricPONumber}</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">FGPO</Typography><Typography sx={{ fontWeight: 600 }}>{viewItem.fgpoNumber} ({viewItem.customerName})</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Supplier</Typography><Typography>{viewItem.supplier || '-'}</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Lot Number</Typography><Chip label={viewItem.lotNumber} size="small" variant="outlined" /></Grid>
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Roll Qty</Typography><Typography sx={{ fontWeight: 600 }}>{viewItem.rollQty}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Shipped Qty</Typography><Typography sx={{ fontWeight: 600 }}>{Number(viewItem.shippedQuantity).toLocaleString()} {viewItem.uom}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Weight</Typography><Typography sx={{ fontWeight: 600 }}>{viewItem.shippedWeight}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Shipping Method</Typography><Typography>{viewItem.shippingMethod || '-'}</Typography></Grid>
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Packing List</Typography><Typography>{viewItem.packingList || '-'}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Invoice</Typography><Typography>{viewItem.invoiceNumber || '-'}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Container / AWB</Typography><Typography>{viewItem.containerAWB || '-'}</Typography></Grid>
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">ETD</Typography><Typography>{fmt(viewItem.etd)}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">ETA</Typography><Typography>{fmt(viewItem.eta)}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Delivered Date</Typography><Typography>{fmt(viewItem.deliveredToTexnicaDate)}</Typography></Grid>
              <Grid size={{ xs: 6 }}><Typography variant="caption" color="text.secondary">Status</Typography><Chip label={viewItem.shipmentStatus} size="small" color={sc(viewItem.shipmentStatus ?? '')} /></Grid>
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">In Transit</Typography><Chip label={Number(viewItem.inTransitQuantity).toLocaleString()} size="small" color={viewItem.inTransitQuantity > 0 ? 'warning' : 'success'} /></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Remaining to Deliver</Typography><Typography>{Number(viewItem.remainingToDeliver).toLocaleString()}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Data Owner</Typography><Typography>{viewItem.dataOwner || '-'}</Typography></Grid>
              {viewItem.remarks && <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /><Typography variant="caption" color="text.secondary">Remarks</Typography><Typography>{viewItem.remarks}</Typography></Grid>}
            </Grid>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setViewOpen(false)}>Close</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

export default FabricShipmentPage;
