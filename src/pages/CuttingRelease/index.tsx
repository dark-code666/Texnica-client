import React, { useState, FormEvent } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Paper, Chip, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, InputAdornment, MenuItem,
  FormControl, InputLabel, TablePagination, Grid, Select, Divider
} from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCuttingReleases } from '../../hooks/cuttingReleases/useCuttingReleases';
import { useFgpoOptions } from '../../hooks/fgpos/useFgpoOptions';
import { useUserOptions } from '../../hooks/users/useUserOptions';
import { CuttingRelease } from '../../types';

// Listas del Excel
const PRR_OPTIONS = ['Ready', 'Ready with Conditions', 'Not Ready', 'Blocked'];
const STATUS_OPTIONS = ['Pending', 'Approved', 'Rejected', 'On Hold', 'Cancelled'];

const sc = (s: string) => {
  const m: Record<string, any> = {
    Approved: 'success', Ready: 'success', 'Ready with Conditions': 'info',
    Rejected: 'error', Blocked: 'error', 'Not Ready': 'warning', 'On Hold': 'warning', Pending: 'warning', Cancelled: 'default',
  };
  return m[s] ?? 'default';
};

const emptyForm = {
  ReleaseDate: new Date().toISOString().split('T')[0],
  FGPOId: 0, FabricLot: '',
  ApprovedCutQty: 0, ApprovedWidth: 0, MarkerNumber: '', ApprovedYield: 0,
  PrrResult: 'Ready', ReleasedByUserId: 0, ReviewedByUserId: 0,
  Exception: '', Conditions: '', ReleaseStatus: 'Pending', Comments: '',
};

const CuttingReleasePage: React.FC = () => {
  const {
    items, loading, saving, error, page, rowsPerPage, totalCount,
    setPage, setRowsPerPage, setSearchQuery, setError, refresh,
    create, update, remove,
  } = useCuttingReleases();

  const [searchInput, setSearchInput] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<CuttingRelease | null>(null);
  const [formError, setFormError] = useState('');

  const { options: fgpoList } = useFgpoOptions();
  const { options: userList } = useUserOptions();

  const [form, setForm] = useState(emptyForm);

  const handleSearch = (e: FormEvent) => { e.preventDefault(); setSearchQuery(searchInput); };
  const handleClearSearch = () => setSearchInput('');

  const resetForm = () => setForm(emptyForm);

  const openCreate = () => { setEditingId(null); resetForm(); setFormError(''); setDialogOpen(true); };
  const openEdit = (item: CuttingRelease) => {
    setEditingId(item.id);
    setForm({
      ReleaseDate: item.releaseDate?.split('T')[0] || '',
      FGPOId: item.fgpoId, FabricLot: item.fabricLot ?? '',
      ApprovedCutQty: item.approvedCutQty, ApprovedWidth: item.approvedWidth,
      MarkerNumber: item.markerNumber ?? '', ApprovedYield: item.approvedYield,
      PrrResult: item.prrResult || 'Ready', ReleasedByUserId: userList.find(o => o.label === item.releasedBy)?.id ?? 0,
      ReviewedByUserId: userList.find(o => o.label === item.reviewedBy)?.id ?? 0, Exception: item.exception ?? '',
      Conditions: item.conditions ?? '', ReleaseStatus: item.releaseStatus || 'Pending',
      Comments: item.comments ?? '',
    });
    setFormError(''); setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this release?')) return;
    try { await remove(id); }
    catch (err: any) { setError(err.response?.data || 'Error deleting.'); }
  };

  const handleSave = async () => {
    setFormError('');
    if (!form.FGPOId) { setFormError('FGPO is required.'); return; }
    try {
      const payload = {
        ...form,
        ReleasedByUserId: form.ReleasedByUserId || null,
        ReviewedByUserId: form.ReviewedByUserId || null,
        ReleaseDate: form.ReleaseDate ? new Date(form.ReleaseDate).toISOString() : new Date().toISOString(),
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
            <ContentCutIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
            Cutting Release
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Liberación del tendido y corte — aprueba marcador, rendimiento y cantidad
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={refresh}>Refresh</Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>New Release</Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}

      <Paper sx={{ mb: 2, p: 1.5, display: 'flex', gap: 1 }}>
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1, flex: 1 }}>
          <TextField size="small" placeholder="Search by Release #, FGPO, Fabric Lot, Marker, Status..."
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
                {['Release #', 'Date', 'FGPO', 'Style', 'Color', 'Fabric Lot', 'Cut Qty', 'Width', 'Marker', 'Yield', 'PRR Result', 'Status', 'Actions'].map(h =>
                  <TableCell key={h} sx={{ color: 'white', fontWeight: 600, py: 1.5 }}>{h}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={13} align="center" sx={{ py: 4 }}><CircularProgress size={28} /></TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={13} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  <Typography variant="body1">No releases found</Typography>
                  <Button variant="text" onClick={openCreate} sx={{ mt: 1 }}>Create your first release</Button>
                </TableCell></TableRow>
              ) : items.map((item: CuttingRelease) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{item.releaseNumber}</TableCell>
                  <TableCell>{fmt(item.releaseDate)}</TableCell>
                  <TableCell>{item.fgpoNumber}</TableCell>
                  <TableCell>{item.style || '-'}</TableCell>
                  <TableCell>{item.color || '-'}</TableCell>
                  <TableCell>{item.fabricLot || '-'}</TableCell>
                  <TableCell>{item.approvedCutQty}</TableCell>
                  <TableCell>{item.approvedWidth}</TableCell>
                  <TableCell>{item.markerNumber || '-'}</TableCell>
                  <TableCell>{item.approvedYield}</TableCell>
                  <TableCell><Chip label={item.prrResult || 'N/A'} size="small" color={sc(item.prrResult ?? '')} variant="outlined" /></TableCell>
                  <TableCell><Chip label={item.releaseStatus || 'N/A'} size="small" color={sc(item.releaseStatus ?? '')} /></TableCell>
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
          {editingId ? 'Edit Release' : 'New Release'}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}><Typography variant="subtitle2" color="primary" sx={{ mb: 0.5 }}>Referencias</Typography></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>FGPO *</InputLabel>
                <Select value={form.FGPOId || ''} label="FGPO *" onChange={e => setF('FGPOId', Number(e.target.value))}>
                  <MenuItem value=""><em>Select a FGPO...</em></MenuItem>
                  {fgpoList.map((f: any) => <MenuItem key={f.id ?? f.ID} value={f.id ?? f.ID}>{f.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Release Date *" type="date" value={form.ReleaseDate} onChange={e => setF('ReleaseDate', e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Fabric Lot" value={form.FabricLot} onChange={e => setF('FabricLot', e.target.value)} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Approved Cut Qty" type="number" value={form.ApprovedCutQty || ''} onChange={e => setF('ApprovedCutQty', Number(e.target.value))} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Approved Width" type="number" value={form.ApprovedWidth || ''} onChange={e => setF('ApprovedWidth', Number(e.target.value))} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Marker Number" value={form.MarkerNumber} onChange={e => setF('MarkerNumber', e.target.value)} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Approved Yield" type="number" value={form.ApprovedYield || ''} onChange={e => setF('ApprovedYield', Number(e.target.value))} /></Grid>

            <Grid size={{ xs: 12 }}><Divider><Typography variant="caption" color="text.secondary">Aprobación & Liberación</Typography></Divider></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>PRR Result</InputLabel>
                <Select value={form.PrrResult} label="PRR Result" onChange={e => setF('PrrResult', e.target.value)}>
                  {PRR_OPTIONS.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Release Status</InputLabel>
                <Select value={form.ReleaseStatus} label="Release Status" onChange={e => setF('ReleaseStatus', e.target.value)}>
                  {STATUS_OPTIONS.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Released By</InputLabel>
                <Select value={form.ReleasedByUserId || ''} label="Released By" onChange={e => setF('ReleasedByUserId', Number(e.target.value))}>
                  <MenuItem value=""><em>Select a User...</em></MenuItem>
                  {userList.map((o) => <MenuItem key={o.id} value={o.id}>{o.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Reviewed By</InputLabel>
                <Select value={form.ReviewedByUserId || ''} label="Reviewed By" onChange={e => setF('ReviewedByUserId', Number(e.target.value))}>
                  <MenuItem value=""><em>Select a User...</em></MenuItem>
                  {userList.map((o) => <MenuItem key={o.id} value={o.id}>{o.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Exception" value={form.Exception} onChange={e => setF('Exception', e.target.value)} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}><TextField fullWidth size="small" label="Conditions" value={form.Conditions} onChange={e => setF('Conditions', e.target.value)} /></Grid>
            <Grid size={{ xs: 12 }}><TextField fullWidth size="small" label="Comments" value={form.Comments} onChange={e => setF('Comments', e.target.value)} multiline rows={2} /></Grid>
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
        <DialogTitle sx={{ fontWeight: 700 }}>Release Detail</DialogTitle><Divider />
        <DialogContent sx={{ pt: 3 }}>
          {viewItem && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Release Number</Typography><Typography sx={{ fontWeight: 600 }}>{viewItem.releaseNumber}</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">FGPO</Typography><Typography sx={{ fontWeight: 600 }}>{viewItem.fgpoNumber} ({viewItem.customerName})</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Style / Color</Typography><Typography>{viewItem.style || '-'} / {viewItem.color || '-'}</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Release Date</Typography><Typography>{fmt(viewItem.releaseDate)}</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Fabric Lot</Typography><Typography>{viewItem.fabricLot || '-'}</Typography></Grid>
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Approved Cut Qty</Typography><Typography>{viewItem.approvedCutQty}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Approved Width</Typography><Typography>{viewItem.approvedWidth}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Marker</Typography><Typography>{viewItem.markerNumber || '-'}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Approved Yield</Typography><Typography>{viewItem.approvedYield}</Typography></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">PRR Result</Typography><Chip label={viewItem.prrResult || '-'} size="small" color={sc(viewItem.prrResult ?? '')} /></Grid>
              <Grid size={{ xs: 6, sm: 3 }}><Typography variant="caption" color="text.secondary">Release Status</Typography><Chip label={viewItem.releaseStatus || '-'} size="small" color={sc(viewItem.releaseStatus ?? '')} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Released By</Typography><Typography>{viewItem.releasedBy || '-'}</Typography></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><Typography variant="caption" color="text.secondary">Reviewed By</Typography><Typography>{viewItem.reviewedBy || '-'}</Typography></Grid>
              {viewItem.exception && <Grid size={{ xs: 12 }}><Divider sx={{ my: 0.5 }} /><Typography variant="caption" color="text.secondary">Exception</Typography><Typography>{viewItem.exception}</Typography></Grid>}
              {viewItem.conditions && <Grid size={{ xs: 12 }}><Typography variant="caption" color="text.secondary">Conditions</Typography><Typography>{viewItem.conditions}</Typography></Grid>}
              {viewItem.comments && <Grid size={{ xs: 12 }}><Typography variant="caption" color="text.secondary">Comments</Typography><Typography>{viewItem.comments}</Typography></Grid>}
            </Grid>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setViewOpen(false)}>Close</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

export default CuttingReleasePage;
