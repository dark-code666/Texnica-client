import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import InventoryIcon from '@mui/icons-material/Inventory';

const fields = [
  'Packing Record ID', 'Date', 'FGPO', 'Style', 'Color', 'Size', 'QC Passed Qty',
  'Received by Packing', 'Folded Qty', 'Polybagged Qty', 'Packed Qty', 'Full Cartons',
  'Partial Cartons', 'Pcs per Carton', 'Ready to Ship Qty', 'Packing Variance',
  'Pending Packing', 'Overpacked Qty', 'Responsible Person', 'Last Updated', 'Remarks',
];

const PackingControlPage: React.FC = () => (
  <ModulePlaceholder
    title="Packing Control"
    subtitle="Control de empaque: doblado, polibolsado, cartones y listo para embarque"
    icon={<InventoryIcon />}
    fields={fields}
    accent="info"
    note="Packing Variance, Pending Packing y Overpacked Qty se calculan automáticamente."
  />
);

export default PackingControlPage;
