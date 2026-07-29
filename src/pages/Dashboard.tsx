import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Tabs, Tab, Chip, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';

const balanceCell = (value: number, positive = false) => ({
  fontWeight: 'bold',
  color: value === 0 ? 'text.secondary' : (positive ? (value > 0 ? 'success.main' : 'error.main') : (value < 0 ? 'error.main' : 'success.main')),
});

const hd = (label: string, bg: string, color = 'primary.main') => (
  <TableCell align="center"
    sx={{ bgcolor: bg, fontWeight: 'bold', color, border: '1px solid #e0e0e0', whiteSpace: 'nowrap' }}>
    {label}
  </TableCell>
);

const Dashboard: React.FC = () => {
  const { purchaseOrders, fabricData } = useContext(DataContext);
  const [tab, setTab] = useState<number>(0);
  const [selectedPO, setSelectedPO] = useState<string | 'ALL'>('ALL');

  const wipRows = purchaseOrders
    .filter(po => selectedPO === 'ALL' || po.id === selectedPO)
    .flatMap(po =>
      (po.production || []).map((row, idx) => ({
        ...row,
        style:  po.items[0]?.style || '',
        color:  po.items[0]?.color || '',
        po:     po.id,
        client: po.client,
        first:  idx === 0,
      }))
    );

  const wipTotals = wipRows.reduce(
    (acc, r) => ({
      orderQty:     acc.orderQty     + r.orderQty,
      cutTotal:     acc.cutTotal     + r.cutTotal,
      sewTotal:     acc.sewTotal     + r.sewTotal,
      shippedTotal: acc.shippedTotal + r.shippedTotal,
    }),
    { orderQty: 0, cutTotal: 0, sewTotal: 0, shippedTotal: 0 }
  );

  const fabricRows = fabricData.filter(r => selectedPO === 'ALL' || r.po === selectedPO);

  const fabricGrouped = fabricRows.reduce((acc: Record<string, any[]>, row) => {
    if (!acc[row.po]) acc[row.po] = [];
    acc[row.po].push(row);
    return acc;
  }, {});

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Dashboard General
      </Typography>

      <Paper elevation={3} sx={{ overflow: 'hidden', borderTop: 4, borderColor: 'primary.main' }}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50', px: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v as number)} indicatorColor="primary" textColor="primary">
            <Tab label="Seguimiento WIP (Órdenes)" sx={{ fontWeight: 'bold' }} />
            <Tab label="Control de Tela (Materia Prima)" sx={{ fontWeight: 'bold' }} />
          </Tabs>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por PO</InputLabel>
            <Select
              label="Filtrar por PO"
              value={selectedPO}
              onChange={e => setSelectedPO(e.target.value as string | 'ALL')}
            >
              <MenuItem value="ALL">Todos los POs</MenuItem>
              {purchaseOrders.map(po => (
                <MenuItem key={po.id} value={po.id}>
                  {po.id} — {po.client}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {tab === 0 && (
          <Box>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'grey.200', display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>Seguimiento de Órdenes (WIP)</Typography>
              <Chip label={`${purchaseOrders.filter(p => selectedPO === 'ALL' || p.id === selectedPO).length} PO(s)`} size="small" color="primary" />
            </Box>

            <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
              <Table stickyHeader size="small" sx={{ '& th, & td': { border: '1px solid #e0e0e0' } }}>
                <TableHead>
                  <TableRow>
                    {hd('ORDER DETAILS',       '#dbeafe')} {hd('', '#dbeafe')} {hd('', '#dbeafe')} {hd('', '#dbeafe')} {hd('', '#dbeafe')}
                    {hd('CUTTING DETAILS',     '#f3f4f6', 'text.primary')} {hd('', '#f3f4f6', 'text.primary')}
                    {hd('INGRESO A COSTURA',   '#fff3cd', '#856404')}      {hd('', '#fff3cd', '#856404')}
                    {hd('ENVIADO AL CLIENTE',  '#d4edda', '#155724')}      {hd('', '#d4edda', '#155724')}
                  </TableRow>
                  <TableRow>
                    {hd('Style No.',    '#dbeafe')}
                    {hd('Color',        '#dbeafe')}
                    {hd('PO Number',    '#dbeafe')}
                    {hd('Cliente',      '#dbeafe')}
                    {hd('Size / Order Qty', '#dbeafe')}
                    {hd('Total Cut',    '#f3f4f6', 'text.primary')}
                    {hd('Balance',      '#f3f4f6', 'text.primary')}
                    {hd('Total Sewn',   '#fff3cd', '#856404')}
                    {hd('Balance',      '#fff3cd', '#856404')}
                    {hd('Total Shipped','#d4edda', '#155724')}
                    {hd('Balance',      '#d4edda', '#155724')}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {wipRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        No hay datos de producción para el filtro seleccionado.
                      </TableCell>
                    </TableRow>
                  )}
                  {wipRows.map((row, idx) => {
                    const cutBal  = row.cutTotal   - row.orderQty;
                    const sewBal  = row.sewTotal   - row.cutTotal;
                    const shipBal = row.shippedTotal - row.orderQty;
                    return (
                      <TableRow key={idx} hover>
                        <TableCell align="center">{row.first ? row.style  : ''}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: row.first ? '#fffde7' : 'transparent', fontWeight: 'bold' }}>
                          {row.first ? row.color : ''}
                        </TableCell>
                        <TableCell align="center">{row.first ? row.po     : ''}</TableCell>
                        <TableCell align="center">{row.first ? row.client : ''}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                            <span>{row.size}</span>
                            <strong>{row.orderQty}</strong>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{row.cutTotal}</TableCell>
                        <TableCell align="center" sx={balanceCell(cutBal)}>{cutBal}</TableCell>
                        <TableCell align="center">{row.sewTotal}</TableCell>
                        <TableCell align="center" sx={balanceCell(sewBal)}>{sewBal}</TableCell>
                        <TableCell align="center">{row.shippedTotal}</TableCell>
                        <TableCell align="center" sx={balanceCell(shipBal)}>{shipBal}</TableCell>
                      </TableRow>
                    );
                  })}

                  {wipRows.length > 0 && (
                    <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                      <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold', pr: 2 }}>SUB-TOTAL</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{wipTotals.orderQty}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{wipTotals.cutTotal}</TableCell>
                      <TableCell align="center" sx={balanceCell(wipTotals.cutTotal - wipTotals.orderQty)}>{wipTotals.cutTotal - wipTotals.orderQty}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{wipTotals.sewTotal}</TableCell>
                      <TableCell align="center" sx={balanceCell(wipTotals.sewTotal - wipTotals.cutTotal)}>{wipTotals.sewTotal - wipTotals.cutTotal}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{wipTotals.shippedTotal}</TableCell>
                      <TableCell align="center" sx={balanceCell(wipTotals.shippedTotal - wipTotals.orderQty)}>{wipTotals.shippedTotal - wipTotals.orderQty}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'grey.200', display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: 'primary.main' }}>Control de Tela y Corte por PO</Typography>
              <Chip label={`${fabricRows.length} registro(s)`} size="small" color="primary" />
            </Box>

            <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
              <Table stickyHeader size="small" sx={{ '& th, & td': { border: '1px solid #e0e0e0' } }}>
                <TableHead>
                  <TableRow>
                    {hd('ORDER DETAILS',   '#dbeafe')} {hd('','#dbeafe')} {hd('','#dbeafe')} {hd('','#dbeafe')} {hd('','#dbeafe')}
                    {hd('TELA COMPRADA',   '#e0f2fe', 'text.primary')} {hd('','#e0f2fe','text.primary')}
                    {hd('CORTE',           '#d4edda', '#155724')}       {hd('','#d4edda','#155724')}
                  </TableRow>
                  <TableRow>
                    {hd('Style No.',  '#dbeafe')}
                    {hd('Color',      '#dbeafe')}
                    {hd('PO Number',  '#dbeafe')}
                    {hd('Tipo Tela',  '#dbeafe')}
                    {hd('Size',       '#dbeafe')}
                    {hd('Comprado (Yds)', '#e0f2fe', 'text.primary')}
                    {hd('Calidad',        '#e0f2fe', 'text.primary')}
                    {hd('Cortado',        '#d4edda', '#155724')}
                    {hd('Pendiente',      '#d4edda', '#155724')}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Object.keys(fabricGrouped).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        No hay registros de tela para el filtro seleccionado.
                      </TableCell>
                    </TableRow>
                  )}
                  {Object.entries(fabricGrouped).map(([poNum, rows]) => {
                    const totPurchased = rows.reduce((a, r) => a + r.purchased, 0);
                    const totCut       = rows.reduce((a, r) => a + r.cut, 0);
                    return (
                      <React.Fragment key={poNum}>
                        {rows.map((row, idx) => {
                          const balance = row.purchased - row.cut;
                          const first   = idx === 0;
                          return (
                            <TableRow key={row.id} hover>
                              <TableCell align="center">{first ? row.style : ''}</TableCell>
                              <TableCell align="center"
                                sx={{ bgcolor: first ? '#fffde7' : 'transparent', fontWeight: 'bold' }}>
                                {first ? row.color : ''}
                              </TableCell>
                              <TableCell align="center">{first ? poNum : ''}</TableCell>
                              <TableCell align="center">{first ? row.fabricType : ''}</TableCell>
                              <TableCell align="center">{row.size}</TableCell>
                              <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.purchased}</TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={row.quality}
                                  color={row.quality === 'Aprobado' ? 'success' : 'warning'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell align="center">{row.cut}</TableCell>
                              <TableCell align="center" sx={balanceCell(balance, true)}>
                                {balance}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                          <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold', pr: 2 }}>
                            SUB-TTL {poNum}
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>{totPurchased}</TableCell>
                          <TableCell />
                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>{totCut}</TableCell>
                          <TableCell align="center" sx={balanceCell(totPurchased - totCut, true)}>
                            {totPurchased - totCut}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
