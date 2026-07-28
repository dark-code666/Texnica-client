import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const PurchaseOrder = () => {
  const { id } = useParams();
  const { purchaseOrders } = useContext(DataContext);
  
  // Find PO or use demo data
  const poData = purchaseOrders.find(po => po.id === id) || {
    id: 'Z1026811',
    date: '2026-05-08',
    required: '2026-06-15',
    client: 'Royal Apparel',
    status: 'En Proceso',
    items: [
      { id: 1, qty: 100, uom: 'ea', item: 'B1001BLK01', desc: 'B1001 BLACK XS', price: 2.34, amount: 234.00 },
      { id: 2, qty: 1100, uom: 'ea', item: 'B1001BLK02', desc: 'B1001 BLACK S', price: 2.34, amount: 2574.00 },
      { id: 3, qty: 2000, uom: 'ea', item: 'B1001BLK03', desc: 'B1001 BLACK M', price: 2.34, amount: 4680.00 },
      { id: 4, qty: 2600, uom: 'ea', item: 'B1001BLK04', desc: 'B1001 BLACK L', price: 2.34, amount: 6084.00 }
    ]
  };

  const totalAmount = poData.items.reduce((sum, item) => sum + item.amount, 0);

  const InfoBox = ({ title, content }) => (
    <Box sx={{ border: 1, borderColor: 'primary.main', p: 1.5, borderRadius: 1, height: '100%', bgcolor: 'white' }}>
      <Typography variant="caption" fontWeight="bold" color="primary.main" display="block" mb={0.5}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {content}
      </Typography>
    </Box>
  );

  const MetaItem = ({ label, value, span = 1 }) => (
    <Grid item xs={span}>
      <Box sx={{ border: 1, borderColor: 'grey.300', height: '100%' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 0.5, textAlign: 'center', borderBottom: 1, borderColor: 'grey.400' }}>
          <Typography variant="caption" fontWeight="bold">{label}</Typography>
        </Box>
        <Box sx={{ p: 0.5, textAlign: 'center', bgcolor: 'white' }}>
          <Typography variant="body2">{value || '\u00A0'}</Typography>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 1000, bgcolor: 'white' }}>
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: 2, borderColor: 'black', pb: 1 }}>
          <Typography variant="h4">
            <Box component="span" fontWeight="900">Royalapparel</Box> PURCHASE ORDER
          </Typography>
        </Box>
        
        <Typography variant="body2" fontWeight="bold" mb={2}>* ORIGINAL ORDER *</Typography>

        {/* Addresses */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={4}>
            <InfoBox 
              title="TO:" 
              content={`400427\nTextilera Nicaragüense Interna\nKm 5.5 Carretera Norte\nZip Argeñal, ni\n\nATTN: Roywei Chen\nPHONE: 505-224-9-36\nFAX:`} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoBox 
              title="BILL TO:" 
              content={`Royal Apparel\n91 Cabot Ct\nHauppauge NY 11788\n\n\n\nPHONE: 866-769-2517\nFAX:`} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoBox 
              title="SHIP TO:" 
              content={`Royal Apparel - Long Island\n91 Cabot Court\nHauppauge, NY 11788\n\n\n\nATTN:`} 
            />
          </Grid>
        </Grid>

        {/* Meta Grid 1 */}
        <Grid container spacing={1} mb={1}>
          <MetaItem label="PURCHASE ORDER" value={poData.id} span={2.4} />
          <MetaItem label="ORDER DATE" value={poData.date} span={2.4} />
          <MetaItem label="DATE REQUIRED" value={poData.required} span={2.4} />
          <MetaItem label="SHIP VIA" value="" span={2.4} />
          <MetaItem label="BUYER ID" value="tiab" span={2.4} />
        </Grid>

        {/* Meta Grid 2 */}
        <Grid container spacing={1} mb={3}>
          <MetaItem label="CUST ORDER NO." value="26811-00" span={2.4} />
          <MetaItem label="CUST PO NO." value="" span={2.4} />
          <MetaItem label="TERMS" value="Wire Transfer" span={4.8} />
          <MetaItem label="MILL CONTACT" value="" span={2.4} />
        </Grid>

        {/* Comments */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ bgcolor: 'black', color: 'white', px: 1, py: 0.5 }}>
            <Typography variant="caption" fontWeight="bold">ADDITIONAL COMMENTS:</Typography>
          </Box>
          <Typography variant="body2">• Color is *NAVY* will send revised PO when updated</Typography>
        </Box>

        {/* Line Items Table */}
        <TableContainer sx={{ mb: 2 }}>
          <Table size="small" sx={{ '& th, & td': { border: 1, borderColor: 'grey.300', p: 1 } }}>
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>LINE #</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>QTY</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>UOM</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', color: 'primary.main' }}>ITEM</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', color: 'primary.main' }}>DESCRIPTION</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>PRICE</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>AMOUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {poData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.qty}</TableCell>
                  <TableCell align="center">{item.uom}</TableCell>
                  <TableCell align="left">{item.item}</TableCell>
                  <TableCell align="left">{item.desc}</TableCell>
                  <TableCell align="right">{item.price.toFixed(4)}</TableCell>
                  <TableCell align="right">{item.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell colSpan={4} sx={{ border: 0 }} />
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>TOTALS:</TableCell>
                <TableCell sx={{ border: 0 }} />
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="body2" fontWeight="bold" mt={2} mb={2}>
          ***** Amounts Specified in USD *****
        </Typography>
        
        <Typography variant="body2" fontWeight="bold" color="error" mb={3}>
          OUR P/O NUMBER MUST APPEAR ON ALL PACKAGES, INVOICES AND CORRESPONDENCE.
        </Typography>

        {/* Terms */}
        <Box sx={{ border: 1, borderColor: 'grey.300', p: 2 }}>
          <Typography variant="caption" fontWeight="bold" display="block" mb={1}>
            TERMS AND CONDITIONS OF THIS ORDER:
          </Typography>
          <Box component="ol" sx={{ m: 0, pl: 2, '& li': { fontSize: '0.8rem', mb: 0.5 } }}>
            <li>DELIVER NO GOODS WITHOUT A PURCHASE ORDER.</li>
            <li>MAKE NO SUBSTITUTIONS OR CHANGES WITHOUT AUTHORITY FROM US.</li>
            <li>WE RESERVE THE RIGHT TO CANCEL THIS ORDER IF SHIPMENT IS NOT MADE AS PROMISED.</li>
            <li>THIS ORDER MUST NOT BE BILLED AT HIGHER PRICES THAN QUOTED.</li>
            <li>DO NOT SHIP LESS THAN FULL CASE QUANTITIES BY SKU WITHOUT AUTHORIZATION FROM US.</li>
          </Box>
        </Box>

        <Typography variant="caption" display="block" textAlign="right" mt={2}>
          Page 1 of 1
        </Typography>

      </Paper>
    </Box>
  );
};

export default PurchaseOrder;
