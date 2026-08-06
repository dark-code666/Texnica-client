import React from 'react';
import ModulePlaceholder from '../../components/ModulePlaceholder';
import TuneIcon from '@mui/icons-material/Tune';

const fields = [
  'Trim Record ID', 'FGPO', 'Style', 'Color', 'Trim Type', 'Description', 'Supplier',
  'UOM', 'Consumption / Garment', 'Required Qty', 'Ordered Qty', 'Received Qty',
  'Approved Qty', 'Rejected Qty', 'Reserved Qty', 'Issued Qty', 'Available Qty',
  'Shortage Qty', 'ETA', 'Development Status', 'Approval Status', 'Availability Status',
  'Data Owner', 'Last Updated', 'Comments',
];

const TrimsControlPage: React.FC = () => (
  <ModulePlaceholder
    title="Trims Control"
    subtitle="Control de avíos y etiquetas: requeridos, ordenados, recibidos, disponibles y faltantes"
    icon={<TuneIcon />}
    fields={fields}
    accent="success"
    note="Available Qty y Shortage Qty se calculan automáticamente desde los flujos de avíos."
  />
);

export default TrimsControlPage;
